/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Feature } from '@common-stack/client-react';
import Layout from './Layout';
import { Dashboard } from '../../pages';

export default new Feature({
    routeConfig: [
        {
            '/': {
                exact: true,
                component: Dashboard,
            } as any,
        },
        {
            '/org': {
                exact: false,
                component: Layout,
                key: 'layout',
            } as any,
        },
    ],
});
