import * as React from 'react';
import { Feature } from '@common-stack/client-react';
import { filteredMenus, filteredRoutes } from './components/Layout/containers/compute';



export default new Feature({
    menuConfig: filteredMenus,
    routeConfig: filteredRoutes,
});
