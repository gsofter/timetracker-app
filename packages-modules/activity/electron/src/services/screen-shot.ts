/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import { desktopCapturer, app } from 'electron';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import checkInternetConnected from 'check-internet-connected';
import { config } from '../config';

export class ScreenShot {
    public intervalId: number;

    private s3: AWS.S3;

    public outputPath: string;

    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: config.SCREENSHOT_S3_ACCESS_KEY_ID,
            secretAccessKey: config.SCREENSHOT_S3_SECRET_ACCESS_KEY,
            // Bucket: config.screenShotS3Bucket,
            s3BucketEndpoint: true,
            endpoint: config.SCREENSHOT_S3_BUCKET,
            signatureVersion: config.SCREENSHOT_S3_SIGNATURE_VERSION,
        });
        this.getFolderPath();
    }

    public initScreenShot() {
        if (!this.intervalId) {
            this.intervalId = setInterval(async () => {
                await this.tackScreenShot();
            }, 30000);
        }
        // window.webContents.executeJavaScript(`window.localStorage.setItem( '${key}', '${value}' )`)
    }

    private async tackScreenShot() {
        try {
            const sources = await desktopCapturer.getSources({
                types: ['screen'],
                thumbnailSize: {
                    width: 1000,
                    height: 1000,
                },
            });

            const entireScreenSource = sources.find(
                (source) => source.name === 'Entire Screen' || source.name === 'Screen 1',
            );

            const image = entireScreenSource.thumbnail.toPNG();

            checkInternetConnected()
                .then((result) => {
                    fs.readdir(this.outputPath, (err, files) => {
                        files.forEach((file) => {
                            let filePath;
                            switch (process.platform) {
                                case 'win32':
                                    filePath = `${this.outputPath}\\${file}`;
                                    break;
                                case 'darwin':
                                case 'linux':
                                    filePath = `${this.outputPath}/${file}`;
                                    break;
                                default:
                                    break;
                            }
                            fs.readFile(filePath, (err, data) => {
                                if (data) {
                                    this.uploadImageToS3(image);
                                    fs.unlink(filePath, (err) => {
                                        if (err) throw err;
                                    });
                                }
                            });
                        });
                    });
                    this.uploadImageToS3(image);
                })
                .catch((error) => {
                    this.storeFileInLocalMachine(image);
                });
        } catch (e) {
            console.log('error tack screen shot', e);
        }
    }

    private getFolderPath() {
        switch (process.platform) {
            case 'win32':
                this.outputPath = `${app.getPath('userData')}\\screen-shot`;
                break;
            case 'darwin':
            case 'linux':
                this.outputPath = `${app.getPath('userData')}/screen-shot`;
                break;
            default:
                break;
        }
    }

    public storeFileInLocalMachine(image: any) {
        if (this.outputPath) {
            let filePath;
            if (!fs.existsSync(this.outputPath)) {
                fs.mkdirSync(this.outputPath);
            }

            switch (process.platform) {
                case 'win32':
                    filePath = `${this.outputPath}\\${new Date().getTime()}.png`;
                    break;
                case 'darwin':
                case 'linux':
                    filePath = `${this.outputPath}/${new Date().getTime()}.png`;
                    break;
                default:
                    break;
            }

            fs.writeFile(filePath, image, (err) => {
                if (err) {
                    console.log('Error in file write', err);
                }
            });
        }
    }

    public uploadImageToS3(image: AWS.S3.Body) {
        this.s3.upload(
            {
                Bucket: 'cdmbase-screenshot-dev',
                Key: `${new Date().getTime()}.png`,
                // signatureVersion: 'v4',
                Body: image,
            },
            (err, data) => {
                if (err) {
                    this.storeFileInLocalMachine(image);
                }
            },
        );
    }

    public destoryScreenShot() {
        clearInterval(this.intervalId);
    }
}
