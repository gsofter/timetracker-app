import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';
import { getFilteredRoutes } from '../utils';
import { FileOutlined } from '@ant-design/icons';
import { userIsAuthenticatedRedir } from '@adminide-stack/user-auth0-browser';
import { IConfigurationContributionNames } from '@admin-layout/timetracker-core';
import {
  WithPermission,
  WithPermissionBehaviour,
  WithPermissionEnhanced,
  ResourceSettings,
} from '@adminide-stack/react-shared-components';
import {
  IPreDefineAccountPermissions,
  ConfigurationTarget,
} from '@adminide-stack/core';


const Home = React.lazy(() => import('./containers/Home'));
const TimeTracker = React.lazy(() => import('./containers/MainPage'));
const Timesheet = React.lazy(() => import('./containers/TimesheetPage'));

const OrganizationSettings = () => (
  <WithPermissionEnhanced
    behaviour={WithPermissionBehaviour.showUnAuthorized}
    permissionKeys={[IPreDefineAccountPermissions.viewSettings]}
  >
    <WithPermission
      permissionKeys={[IPreDefineAccountPermissions.editSettings]}
      render={({ hasPermission }) => (
        <ResourceSettings
          target={ConfigurationTarget.ORGANIZATION}
          showSidebar={true}
          hasPermission={hasPermission}
          options={{ defaultFragment: IConfigurationContributionNames.timeTracker }}
        />
      )}
    />
  </WithPermissionEnhanced>
);

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
    name: 'Settings',
    exact: true,
    key: 'timeTracker.settings',
    position: IMenuPosition.MIDDLE,
    path: '/:orgName/time-tracker/settings',
    hideInMenu: false,
    authority: [IPreDefineAccountPermissions.manageTeams],
    component: userIsAuthenticatedRedir(OrganizationSettings),
  },
];

const selectedRoutesAndMenus = [
  'timeTracker',
  'timeTracker.timer',
  'timeTracker.projects',
  'timeTracker.clients',
  'timeTracker.timesheet',
  'timeTracker.settings'
];

// get routes
const filteredRoutes = getFilteredRoutes(timePageStore, selectedRoutesAndMenus);

export { filteredRoutes };
