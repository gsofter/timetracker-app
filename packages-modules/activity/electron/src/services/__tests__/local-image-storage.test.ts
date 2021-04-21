/* eslint-disable jest/no-hooks */
import { LocalFSImageStorageService } from '../local-image-storage';

// note test cases from https://github.com/EnricoPicci/observable-fs/blob/master/src/observable-fs.spec.ts
describe('fileObs', () => {
    let storageFile: LocalFSImageStorageService = null;

    beforeAll(() => {
        storageFile = new LocalFSImageStorageService('/tmp');
    });

    it('reads the files of a directory', (done) => {
        const files = new Array<string>();
        const dirPath = '_fixtures/';
        storageFile.readFile(dirPath).subscribe(
            (file) => files.push(file),
            (err) => {
                console.error('Error', err);
            },
            () => {
                console.log('files', files);
                if (files.length !== 3) {
                    return done(new Error('files count failed'));
                }
                return done();
            },
        );
    });
});
