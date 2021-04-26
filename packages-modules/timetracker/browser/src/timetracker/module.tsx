import * as React from 'react';
import { Feature } from '@common-stack/client-react';
import { filteredRoutes } from './compute';
import { RegisterContribution } from './register-contribution';

export default new Feature({
  routeConfig: filteredRoutes,
  clientStateParams: {
    // resolvers,
    // defaults
  },
  componentFillPlugins: [
    {
      name: 'register-contribution',
      render: RegisterContribution,
    },
  ],
  
});
