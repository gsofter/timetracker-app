import { Feature } from '@common-stack/client-react';
import { filteredRoutes  } from './compute-electron-tray';

export default new Feature({
    routeConfig: filteredRoutes,
})