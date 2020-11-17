import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';
import { getFilteredMenus, getFilteredRoutes } from '../utils';
import { ScheduleOutlined } from '@ant-design/icons';


const Timesheet = React.lazy(() => import('./components/Timesheet'));
const Home = React.lazy(() => import('./components/Home'));

const CalenderSchemder = React.lazy(() => import('./components/Scheduler'));
export const schedulerPage: any[] = [
    {
        exact: false,
        icon: <ScheduleOutlined />,
        key: 'reactBigScheduler',
        component: Home,
        position: IMenuPosition.MIDDLE,
        tab: 'React Big Scheduler',
        name: 'React Big Scheduler',
        path: '/react-big-scheduler',
        priority: 1
        
    },
    {
        exact: true,
        key: 'reactBigScheduler.scheduler',
        name: 'Scheduler',
        component: CalenderSchemder,
        position: IMenuPosition.MIDDLE,
        path: '/react-big-scheduler/scheduler',
        priority: 2
    },
    {
        exact: true,
        key: 'reactBigScheduler.timesheet',
        name: 'Timesheet',
        component: Timesheet,
        position: IMenuPosition.MIDDLE,
        path: '/react-big-scheduler/timesheet',
        priority: 3
    },
];

const selectedRoutesAndMenus = ['reactBigScheduler', 'reactBigScheduler.scheduler', 'reactBigScheduler.timesheet'];

// get menus
const filteredMenus = getFilteredMenus(schedulerPage, selectedRoutesAndMenus);

// get routes
const filteredRoutes = getFilteredRoutes(schedulerPage, selectedRoutesAndMenus);

export { filteredMenus, filteredRoutes };
