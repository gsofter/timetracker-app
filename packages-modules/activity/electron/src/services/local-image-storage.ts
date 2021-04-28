/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import * as fs from 'fs';
import { Observable } from 'rxjs/Observable';
import { bindNodeCallback } from 'rxjs';
import { Observer } from 'rxjs/Observer';
import { IImageStorage } from '../interfaces';

// ============  Deletes a file and emits when completed =========
// returns and Observable which emits the name of the file when the line has been deleted or an error otherwise
function deleteFileNode(filePath: string, cb: (err, data: string) => void) {
    return fs.unlink(filePath, (err) => {
        cb(err, filePath);
    });
}

const _deleteFile = bindNodeCallback(deleteFileNode);
const _readFile = bindNodeCallback(fs.readFile);

export class LocalFSImageStorageService implements IImageStorage {
    private outputPath;

    constructor(path: string) {
        this.outputPath = path;
    }

    public saveImage(image: any): Observable<any> {
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
            return Observable.create((observer: Observer<void>) => {
                fs.writeFile(filePath, image, (err) => {
                    if (err) {
                        console.log('Error in file write', err);
                        observer.error(err);
                    }
                });
                observer.next(filePath);
                observer.complete();
            });
        }
    }

    public readFile(filePath: string) {
        return _readFile(filePath);
    }

    public deleteFile(filePath: string) {
        return _deleteFile(filePath);
    }
}
