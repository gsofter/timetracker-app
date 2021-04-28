import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';
import { FileOutlined } from '@ant-design/icons';
import { userIsAuthenticatedRedir } from '@adminide-stack/user-auth0-browser';
import { IConfigurationContributionNames } from '@admin-layout/timetracker-core';
import {
    WithPermission,
    WithPermissionBehaviour,
    WithPermissionEnhanced,
    ResourceSettings,
} from '@adminide-stack/react-shared-components';
import { IPreDefineAccountPermissions, ConfigurationTarget } from '@adminide-stack/core';
import { getFilteredRoutes } from '../utils';
import { ROUTES } from './constants';

const Home = React.lazy(() => import('./containers/Home'));
const TimeTracker = React.lazy(() => import('./containers/TimerPage'));
const Timesheet = React.lazy(() => import('./containers/TimesheetPage'));
const TimeApproval = React.lazy(() => import('./containers/TimeApprovalPage'));
const Reports = React.lazy(() => import('./containers/ReportsPage'));

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
                    showSidebar
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
        component: userIsAuthenticatedRedir(Home),
        position: IMenuPosition.MIDDLE,
        tab: 'Time Tracker',
        name: 'Time Tracker',
        path: ROUTES.TimeTracker,
        priority: 1,
    },
    {
        exact: true,
        key: 'timeTracker.timer',
        name: 'Timer',
        component: userIsAuthenticatedRedir(TimeTracker),
        position: IMenuPosition.MIDDLE,
        path: ROUTES.Timer,
        priority: 2,
    },
    {
        exact: true,
        key: 'timeTracker.timesheet',
        name: 'Timesheet',
        component: userIsAuthenticatedRedir(Timesheet),
        position: IMenuPosition.MIDDLE,
        path: ROUTES.Timesheet,
        priority: 3,
    },
    {
        exact: true,
        key: 'timeTracker.timeapproval',
        name: 'Approvals',
        component: userIsAuthenticatedRedir(TimeApproval),
        position: IMenuPosition.MIDDLE,
        path: ROUTES.TimeApproval,
        priority: 4,
    },
    {
        exact: true,
        key: 'timeTracker.report',
        name: 'Report',
        component: userIsAuthenticatedRedir(Reports),
        position: IMenuPosition.MIDDLE,
        path: ROUTES.TimeReport,
        priority: 5,
    },
    {
        name: 'Settings',
        exact: true,
        key: 'timeTracker.settings',
        position: IMenuPosition.MIDDLE,
        path: ROUTES.Settings,
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
    'timeTracker.timeapproval',
    'timeTracker.report',
    'timeTracker.settings',
];

// get routes
const filteredRoutes = getFilteredRoutes(timePageStore, selectedRoutesAndMenus);

export { filteredRoutes };
