import * as React from 'react';
import { Feature } from '@common-stack/client-react';
import { filteredRoutes } from './compute';
import { resolvers, defaults } from '../apollo-client';
export default new Feature({
  routeConfig: filteredRoutes,
  clientStateParams: { resolvers, defaults },
});
