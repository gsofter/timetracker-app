

import { Feature } from '@common-stack/client-react';
import { settingsReducer } from './redux/settings';
import { ProLayout } from './components/layouts';

export default new Feature({
    routeConfig: [
        {
            ['/']: {
                // key: 'layout',
                // tab: 'User Menu',
                // path: '//:orgName',
                exact: false,
                component: ProLayout,
            } as any
        }
    ],
    reducer: { settings: settingsReducer },
});

