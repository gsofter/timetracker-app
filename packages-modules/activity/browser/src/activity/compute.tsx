import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';
import { FileOutlined } from '@ant-design/icons';
import { userIsAuthenticatedRedir } from '@adminide-stack/user-auth0-browser';
import { IPreDefineAccountPermissions, ConfigurationTarget } from '@adminide-stack/core';
import { IConfigurationContributionNames } from '@admin-layout/activity-core';
import {
    WithPermission,
    WithPermissionBehaviour,
    WithPermissionEnhanced,
    ResourceSettings,
} from '@adminide-stack/platform-browser/lib/components';
import { getFilteredRoutes } from '../utils';

const Home = React.lazy(() => import('./containers/Home'));
const Timesheet = React.lazy(() => import('./containers/Timesheet'));

const ActivitySettings = () => (
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
                    options={{ defaultFragment: IConfigurationContributionNames.activityTracker }}
                />
            )}
        />
    </WithPermissionEnhanced>
);

export const activityPage: any[] = [
    {
        exact: false,
        icon: <FileOutlined />,
        key: 'activity',
        component: Home,
        position: IMenuPosition.MIDDLE,
        tab: 'Activity',
        name: 'Activity',
        path: '/:orgName/activity',
        priority: 1,
    },
    {
        exact: true,
        key: 'activity.activityTime',
        name: 'Activity',
        component: Timesheet,
        position: IMenuPosition.MIDDLE,
        path: '/:orgName/activity/activityTime',
        priority: 2,
    },
    {
        name: 'Settings',
        exact: true,
        key: 'activity.settings',
        position: IMenuPosition.MIDDLE,
        path: '/:orgName/activity/settings',
        hideInMenu: false,
        authority: [IPreDefineAccountPermissions.manageTeams],
        component: userIsAuthenticatedRedir(ActivitySettings),
    },
];

const selectedRoutesAndMenus = ['activity', 'activity.activityTime', 'activity.settings'];

// get routes
const filteredRoutes = getFilteredRoutes(activityPage, selectedRoutesAndMenus);

export { filteredRoutes };
