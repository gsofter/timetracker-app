// tslint:disable-next-line:no-unused-expression
import { logger } from '@cdm-logger/server';
import './main';

process.env.ENV_FILE !== null && require('dotenv').config({ path: process.env.ENV_FILE });

process.on('uncaughtException', (ex) => {
    logger.error(ex);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    logger.error(reason);
});

if ((module as any).hot) {
    (module as any).hot.status((event) => {
        if (event === 'abort' || event === 'fail') {
            logger.error(`HMR error status: ${event}`);
            // Signal webpack.run.js to do full-reload of the back-end
            process.exit(250);
        }
    });

    (module as any).hot.accept();
}
