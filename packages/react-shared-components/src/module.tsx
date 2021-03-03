

import { Feature } from '@common-stack/client-react';
import { settingsReducer } from './redux/settings';
import { ProLayout } from './components/layouts';

export default new Feature({
    routeConfig: [
        {
            ['/:orgName']: {
                exact: false,
                component: ProLayout,
            },
        }
    ],
    reducer: { settings: settingsReducer },
});

