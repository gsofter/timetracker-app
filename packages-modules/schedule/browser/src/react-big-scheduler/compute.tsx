import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';
import { getFilteredMenus, getFilteredRoutes } from '../utils';
import { ScheduleOutlined } from '@ant-design/icons';


const SchedulerHome = React.lazy(() => import('./components/Home'));

const CalenderSchemder = React.lazy(() => import('./components/Scheduler'));
export const schedulerPage: any[] = [
    {
        exact: false,
        icon: <ScheduleOutlined />,
        key: 'scheduler',
        component: CalenderSchemder,
        position: IMenuPosition.MIDDLE,
        name: 'React Big Scheduler',
        path: '/react-big-scheduler',
    },
    // {
    //     key: 'demo',
    //     name: 'Demo 1',
    //     component: Demo1,
    //     position: IMenuPosition.MIDDLE,
    //     path: '/react-big-scheduler/demo',
    // },
    // {
    //     key: 'demo2',
    //     name: 'Demo 2',
    //     component: Demo2,
    //     position: IMenuPosition.MIDDLE,
    //     path: '/react-big-scheduler/demo2',
    // },
];

const selectedRoutesAndMenus = ['scheduler'];

// get menus
const filteredMenus = getFilteredMenus(schedulerPage, selectedRoutesAndMenus);

// get routes
const filteredRoutes = getFilteredRoutes(schedulerPage, selectedRoutesAndMenus);

export { filteredMenus, filteredRoutes };
