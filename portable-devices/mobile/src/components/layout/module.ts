/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Feature } from '@common-stack/client-react';
import { ProLayout } from './Layout';

export default new Feature({
  routeConfig: [
    {
      '/:orgName': {
        exact: false,
        component: ProLayout,
        key: 'layout',
      } as any,
    },
  ],
});
