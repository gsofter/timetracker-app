import { Observable } from 'rxjs/Observable';

export interface IImageStorage {
    saveImage(image: any): Promise<void> | Observable<void>;
}
