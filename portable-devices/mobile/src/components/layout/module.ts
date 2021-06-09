import { Feature } from '@common-stack/client-react';
import { MobileRoutes } from '../../constants/routes';
import Layout from './Layout';
import { Home } from '../../pages/Home';

export default new Feature({
    routeConfig: [
        {
            [MobileRoutes.Home]: {
              exact: true,
              component: Home,
            } as any,
          },
        // {
        //     '/sign-up': {
        //         exact: false,
        //         component: SignUp,
        //     } as any,
        // },
        {
            '/:orgName': {
                exact: false,
                component: Layout,
                key: 'layout',
            } as any,
        },
    ],
});
