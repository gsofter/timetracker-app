/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Feature, IRouteData } from '@common-stack/client-react';
import { connectedReactRouter_counter } from './redux';
import { filteredRoutes } from './compute.native';


console.log('---FILTERED ROUTES', filteredRoutes)
export default new Feature({
    routeConfig: filteredRoutes,
    reducer: { connectedReactRouter_counter },
});
