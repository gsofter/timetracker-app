import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';
import { getFilteredMenus, getFilteredRoutes } from '../utils';
import { FileOutlined } from '@ant-design/icons';
const Home = React.lazy(() => import('./containers/Home'));
const TimeTracker = React.lazy(() => import('./containers/MainPage'));
const Timesheet = React.lazy(() => import('./containers/TimesheetPage'));
const ProjectsPage = React.lazy(() => import('./containers/ProjectsPage'));
const ClientsPage = React.lazy(() => import('./containers/ClientsPage'));
export const timePageStore: any[] = [
  {
    exact: false,
    icon: <FileOutlined />,
    key: 'timeTracker',
    component: Home,
    position: IMenuPosition.MIDDLE,
    tab: 'Time Tracker',
    name: 'Time Tracker',
    path: '//:orgName/time-tracker',
    priority: 1,
  },
  {
    exact: true,
    key: 'timeTracker.timer',
    name: 'Timer',
    component: TimeTracker,
    position: IMenuPosition.MIDDLE,
    path: '//:orgName/time-tracker/timer',
    priority: 2,
  },
  {
    exact: true,
    key: 'timeTracker.timesheet',
    name: 'Timesheet',
    component: Timesheet,
    position: IMenuPosition.MIDDLE,
    path: '//:orgName/time-tracker/timesheet',
    priority: 3,
  },
  {
    exact: true,
    key: 'timeTracker.projects',
    name: 'Projects',
    component: ProjectsPage,
    position: IMenuPosition.MIDDLE,
    path: '//:orgName/time-tracker/projects',
    priority: 4,
  },
  {
    exact: true,
    key: 'timeTracker.clients',
    name: 'Clients',
    component: ClientsPage,
    position: IMenuPosition.MIDDLE,
    path: '//:orgName/time-tracker/clients',
    priority: 5,
  },
];

const selectedRoutesAndMenus = [
  'timeTracker',
  'timeTracker.timer',
  'timeTracker.projects',
  'timeTracker.clients',
  'timeTracker.timesheet',
];

// get routes
const filteredRoutes = getFilteredRoutes(timePageStore, selectedRoutesAndMenus);

export { filteredRoutes };
