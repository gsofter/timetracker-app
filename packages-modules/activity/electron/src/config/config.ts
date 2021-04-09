import * as envalid from 'envalid';

const { str } = envalid;

export const config = envalid.cleanEnv(process.env, {
  secreenShotS3AccessKeyId: str({ desc: 'ScreenShot S3 Access Key Id' }),
  secreenShotS3SecretAccessKey: str({ desc: 'ScreenShot S3 access key' }),
  screenShotS3Bucket: str({ desc: 'S3 Bucket for storing screenshot' }),
  screenShotS3SignatureVersion: str({ default: 'v4', desc: 'Version of S3' }),
});
