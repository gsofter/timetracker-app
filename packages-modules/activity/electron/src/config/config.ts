import * as envalid from 'envalid';

const { str } = envalid;

export const config = envalid.cleanEnv(process.env, {
    SCREENSHOT_S3_ACCESS_KEY_ID: str({ desc: 'ScreenShot S3 Access Key Id' }),
    SCREENSHOT_S3_SECRET_ACCESS_KEY: str({ desc: 'ScreenShot S3 access key' }),
    SCREENSHOT_S3_BUCKET: str({ desc: 'S3 Bucket for storing screenshot' }),
    SCREENSHOT_S3_SIGNATURE_VERSION: str({ default: 'v4', desc: 'Version of S3' }),
});
