import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';
import { getFilteredMenus, getFilteredRoutes } from '../utils';
import { FileOutlined } from '@ant-design/icons';

const Home = React.lazy(() => import('./containers/Home'));
const TimeTracker = React.lazy(() => import('./containers/MainPage'));
const ProjectsPage = React.lazy(() => import('./containers/ProjectsPage'));
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
    key: 'timeTracker.projects',
    name: 'Projects',
    component: ProjectsPage,
    position: IMenuPosition.MIDDLE,
    path: '/:orgName/time-tracker/projects',
    priority: 3,
  },
];

const selectedRoutesAndMenus = ['timeTracker', 'timeTracker.timer', 'timeTracker.projects'];

// get menus
const filteredMenus = getFilteredMenus(timePageStore, selectedRoutesAndMenus);

// get routes
const filteredRoutes = getFilteredRoutes(timePageStore, selectedRoutesAndMenus);

export { filteredMenus, filteredRoutes };
