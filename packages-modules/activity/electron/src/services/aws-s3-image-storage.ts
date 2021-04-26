import * as S3 from 'aws-sdk/clients/s3';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { IImageStorage } from '../interfaces';
import { config } from '../config';

export class S3ImageStorageService implements IImageStorage {
    private s3: S3;

    constructor(private orgName: string, private userName: string, private projectName: string) {
        this.s3 = new S3({
            params: {
                Bucket: config.SCREENSHOT_S3_BUCKET,
            },
            s3ForcePathStyle: true,
            accessKeyId: config.SCREENSHOT_S3_ACCESS_KEY_ID,
            secretAccessKey: config.SCREENSHOT_S3_SECRET_ACCESS_KEY,
            // Bucket: config.screenShotS3Bucket,
            s3BucketEndpoint: true,
            signatureVersion: config.SCREENSHOT_S3_SIGNATURE_VERSION,
        });
    }

    private generateKey() {
        const imagePath = `${this.projectName}_${new Date().getTime()}.png`;
        return `${this.orgName}/${this.userName}/${imagePath}`;
    }

    public saveImage(image: S3.Body): Observable<any> {
        return Observable.create((observer: Observer<void>) => {
            this.s3.upload(
                {
                    Key: this.generateKey(),
                    Body: image,
                    Bucket: config.SCREENSHOT_S3_BUCKET,
                },
                (err, data) => {
                    if (err) {
                        // store locally
                        observer.error(err);
                        observer.complete();
                    }
                    observer.next();
                    observer.complete();
                },
            );
        });
    }
}
