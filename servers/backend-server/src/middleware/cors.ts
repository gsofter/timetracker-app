import * as cors from 'cors';
import * as express from 'express';
import { logger } from '@cdm-logger/server';
import { config } from '../config';

const { CLIENT_URL } = config;
const { BACKEND_URL } = config;

const corsWhitelist = [BACKEND_URL, CLIENT_URL, config.GRAPHQL_URL, '*CDEBase.io'];
logger.info('Cors whitelist: %j', corsWhitelist);
const corsOptions = {
    origin: (origin, callback) => {
        if (corsWhitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            // TODO: only throw when in debug mode
            logger.error('url (%s) is not in the whitelist', origin);
            // callback(new Error('Not allowed by CORS'))
            logger.warn('allowing all origins temporarily, you need to disable it.');
            callback(null, true);
        }
    },
    credentails: false,
};

export const corsMiddleware = cors(corsOptions);
