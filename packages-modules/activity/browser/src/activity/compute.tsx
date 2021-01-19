import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';
import { getFilteredMenus, getFilteredRoutes } from '../utils';
import { FileOutlined } from '@ant-design/icons';
const Home = React.lazy(() => import('./containers/Home'));
const Timesheet = React.lazy(() => import('./containers/Timesheet'));

export const activityPage: any[] = [
  {
    exact: false,
    icon: <FileOutlined />,
    key: 'activity',
    component: Home,
    position: IMenuPosition.MIDDLE,
    tab: 'Activity',
    name: 'Activity',
    path: '//:orgName/activity',
    priority: 1,
  },
  {
    exact: true,
    key: 'activity.activityTime',
    name: 'Activity',
    component: Timesheet,
    position: IMenuPosition.MIDDLE,
    path: '//:orgName/activity/activityTime',
    priority: 2,
  },
];

const selectedRoutesAndMenus = ['activity', 'activity.activityTime'];

// get routes
const filteredRoutes = getFilteredRoutes(activityPage, selectedRoutesAndMenus);

export { filteredRoutes };
