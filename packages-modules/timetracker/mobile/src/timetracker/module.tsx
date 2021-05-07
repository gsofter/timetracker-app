import { Feature } from '@common-stack/client-react';
import { filteredRoutes } from './compute';

export default new Feature({
    routeConfig: filteredRoutes,
});
