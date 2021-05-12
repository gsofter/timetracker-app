/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Feature } from '@common-stack/client-react';
import Layout from './Layout';
import { SignIn, SignUp } from '../../pages';

export default new Feature({
  routeConfig: [
    {
      '/': {
        exact: true,
        component: SignIn,
      } as any,
    },
    {
      '/sign-up': {
        exact: false,
        component: SignUp,
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
