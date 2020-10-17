import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';
import { getFilteredMenus, getFilteredRoutes } from '../utils';
import { Home } from './components/Home';
import { ScheduleOutlined } from '@ant-design/icons';



export const schedulerPage: any[] = [
    {
        component: Home,
        tab: 'React Big Scheduler',
        key: 'scheduler',
        position: IMenuPosition.BOTTOM,
        name: 'React Big Scheduler',
        path: '/react-big-scheduler',
        // icon: <ScheduleOutlined />
    },
];

const selectedRoutesAndMenus = ['scheduler'];

// get menus
const filteredMenus = getFilteredMenus(schedulerPage, selectedRoutesAndMenus);

// get routes
const filteredRoutes = getFilteredRoutes(schedulerPage, selectedRoutesAndMenus);

export { filteredMenus, filteredRoutes };
