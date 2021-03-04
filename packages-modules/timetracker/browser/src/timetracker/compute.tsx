import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';
import { getFilteredMenus, getFilteredRoutes } from '../utils';
import { FileOutlined } from '@ant-design/icons';
const Home = React.lazy(() => import('./containers/Home'));
const TimeTracker = React.lazy(() => import('./containers/MainPage'));
const Timesheet = React.lazy(() => import('./containers/TimesheetPage'));
const TimeApproval = React.lazy(() => import('./containers/TimeApprovalPage'));

export const timePageStore: any[] = [
  {
    exact: false,
    icon: <FileOutlined />,
    key: 'timeTracker',
    component: Home,
    position: IMenuPosition.MIDDLE,
    tab: 'Time Tracker',
    name: 'Time Tracker',
    path: '/:orgName/time-tracker',
    priority: 1,
  },
  {
    exact: true,
    key: 'timeTracker.timer',
    name: 'Timer',
    component: TimeTracker,
    position: IMenuPosition.MIDDLE,
    path: '/:orgName/time-tracker/timer',
    priority: 2,
  },
  {
    exact: true,
    key: 'timeTracker.timesheet',
    name: 'Timesheet',
    component: Timesheet,
    position: IMenuPosition.MIDDLE,
    path: '/:orgName/time-tracker/timesheet',
    priority: 3,
  },
  {
    exact: true,
    key: 'timeTracker.timeapproval',
    name: 'TimeApproval',
    component: TimeApproval,
    position: IMenuPosition.MIDDLE,
    path: '/:orgName/time-tracker/timeapproval',
    priority: 4,
  },
];

const selectedRoutesAndMenus = [
  'timeTracker',
  'timeTracker.timer',
  'timeTracker.timesheet',
  'timeTracker.timeapproval',
];

// get routes
const filteredRoutes = getFilteredRoutes(timePageStore, selectedRoutesAndMenus);

export { filteredRoutes };
