import * as envalid from 'envalid';

const { str, num } = envalid;

export const config = envalid.cleanEnv(process.env, {
  FILES_TTL: num({ default: 3600, desc: 'TTL for files cache in Seconds' }),
  MAIL_SEND_DEFAULT_EMAIL: str(),
  CLIENT_URL: str(),
});
