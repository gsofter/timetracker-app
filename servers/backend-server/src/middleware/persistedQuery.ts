import { invert, isArray } from 'lodash';
import { logger } from '@cdm-logger/server';
import { GRAPHIQL_ROUTE } from '../ENDPOINTS';

const reqlib: any = require('app-root-path');

const persistCache = true;
let queryMap;
try {
    queryMap = reqlib.require('@admin-layout/platform-browser/extracted_queries.json');
} catch (err) {
    logger.warn('extracted_queries.json file is unavailable, disabling persist queries');
}
export const persistedQueryMiddleware = (req, res, next) => {
    if (queryMap) {
        const invertedMap = invert(queryMap);

        if (isArray(req.body)) {
            req.body = req.body.map((body) => {
                const { id } = body;
                return {
                    query: invertedMap[id],
                    ...body,
                };
            });
            next();
        } else if (!__DEV__ || (req.get('Referer') || '').indexOf(GRAPHIQL_ROUTE) < 0) {
            res.status(500).send('Unknown GraphQL query has been received, rejecting...');
        } else {
            next();
        }
    } else {
        next();
    }
};
