process.env.ENV_FILE !== null && (require('dotenv')).config({ path: process.env.ENV_FILE });

import { bootstrap } from './bootstrap';

bootstrap().catch(console.error);
