import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';
import { getFilteredMenus, getFilteredRoutes } from '../utils';
import { ScheduleOutlined } from '@ant-design/icons';

const Timeline = React.lazy(() => import('./components/Timeline'));
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
    path: '/:orgName/react-big-scheduler',
    priority: 1,
  },
  {
    exact: true,
    key: 'reactBigScheduler.scheduler',
    name: 'Scheduler',
    component: CalenderSchemder,
    position: IMenuPosition.MIDDLE,
    path: '/:orgName/react-big-scheduler/scheduler',
    priority: 2,
  },
  // {
  //   exact: true,
  //   key: 'reactBigScheduler.timesheet',
  //   name: 'Timesheet',
  //   component: Timesheet,
  //   position: IMenuPosition.MIDDLE,
  //   path: '/:orgName/react-big-scheduler/timesheet',
  //   priority: 3,
  // },
  {
    exact: true,
    key: 'reactBigScheduler.timeline',
    name: 'TImeline',
    component: Timeline,
    position: IMenuPosition.MIDDLE,
    path: '/:orgName/react-big-scheduler/timeline',
    priority: 4,
  },
];

const selectedRoutesAndMenus = [
  'reactBigScheduler',
  'reactBigScheduler.scheduler',
  'reactBigScheduler.timesheet',
  'reactBigScheduler.timeline',
];

// get menus
const filteredMenus = getFilteredMenus(schedulerPage, selectedRoutesAndMenus);

// get routes
const filteredRoutes = getFilteredRoutes(schedulerPage, selectedRoutesAndMenus);

export { filteredMenus, filteredRoutes };
