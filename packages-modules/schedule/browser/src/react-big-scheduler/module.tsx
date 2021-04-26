import * as React from 'react';
import { Feature } from '@common-stack/client-react';
import { filteredMenus, filteredRoutes } from './compute';



export default new Feature({
    menuConfig: filteredMenus,
    routeConfig: filteredRoutes,
    stylesInsert: ['react-big-calendar/lib/css/react-big-calendar.css', 'react-big-calendar/lib/addons/dragAndDrop/styles.css', 'react-calendar-timeline/lib/Timeline.css']
});
