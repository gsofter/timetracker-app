
import { IApplicationRoles, ConfigurationScope, IPermissionType } from '@adminide-stack/core';
import { IPreDefineAccountPermissions } from '../constants';
import * as nls from '@vscode/monaco-editor/esm/vs/nls';
import { IRoles } from '@common-stack/server-core';

const extraParams = {
    'type': 'string',
    'enum': [IPermissionType.Allow, IPermissionType.Deny, IPermissionType.NotSet],
    'default': IPermissionType.NotSet,
    'scope': ConfigurationScope.WINDOW,
};
export const TimeTrackerRolesContribution: IRoles<ConfigurationScope> = {
    [IPreDefineAccountPermissions.viewTimeTracker]: {
        'enumDescriptions': [
            nls.localize(`${IPreDefineAccountPermissions.viewTimeTracker}.${IPermissionType.Allow}`, 'Has ability to view Time Tracker, Reports and Timesheet of other members.'),
            nls.localize(`${IPreDefineAccountPermissions.viewTimeTracker}.${IPermissionType.Deny}`, 'No ability to view Time Tracker, Reports and Timesheet of other members.'),
        ],
        'description': nls.localize(IPreDefineAccountPermissions.viewTimeTracker, 'View an Time Tracker, Time Reports and Timesheet'),
        ...extraParams,
    },
    [IPreDefineAccountPermissions.createTimeTracker]: {
        'enumDescriptions': [
            nls.localize(`${IPreDefineAccountPermissions.createTimeTracker}.${IPermissionType.Allow}`, 'Has ability to view Time Tracker, Reports and Timesheet of other members.'),
            nls.localize(`${IPreDefineAccountPermissions.createTimeTracker}.${IPermissionType.Deny}`, 'No ability to view Time Tracker, Reports and Timesheet of other members.'),
        ],
        'description': nls.localize(IPreDefineAccountPermissions.createTimeTracker, 'Create Time Tracker, Reports and Timesheet of other members.'),
        ...extraParams,
    },
    [IPreDefineAccountPermissions.editTimeTracker]: {
        'enumDescriptions': [
            nls.localize(`${IPreDefineAccountPermissions.editTimeTracker}.${IPermissionType.Allow}`, 'Has ability to manage Time Tracker, Reports and Timesheet of other members.'),
            nls.localize(`${IPreDefineAccountPermissions.editTimeTracker}.${IPermissionType.Deny}`, 'No ability to create Time Tracker, Reports and Timesheet of other members.'),
        ],
        'description': nls.localize(IPreDefineAccountPermissions.editTimeTracker, 'Manage Time Tracker, Reports and Timesheet of other members'),
        ...extraParams,
    },
    [IPreDefineAccountPermissions.manageTimeTracker]: {
        'enumDescriptions': [
            nls.localize(`${IPreDefineAccountPermissions.manageTimeTracker}.${IPermissionType.Allow}`, 'Has ability to manage Time Tracker, Reports and Timesheet of other members.'),
            nls.localize(`${IPreDefineAccountPermissions.manageTimeTracker}.${IPermissionType.Deny}`, 'No ability to create Time Tracker, Reports and Timesheet of other members.'),
        ],
        'description': nls.localize(IPreDefineAccountPermissions.manageTimeTracker, 'Manage Time Tracker, Reports and Timesheet of other members'),
        ...extraParams,
    },
    [IPreDefineAccountPermissions.deleteTimeTracker]: {
        'enumDescriptions': [
            nls.localize(`${IPreDefineAccountPermissions.deleteTimeTracker}.${IPermissionType.Allow}`, 'Has ability to delete  Time Tracker and Timesheet of other members.'),
            nls.localize(`${IPreDefineAccountPermissions.deleteTimeTracker}.${IPermissionType.Deny}`, 'No ability to delete  Time Tracker and Timesheet of other members.'),
        ],
        'description': nls.localize(IPreDefineAccountPermissions.deleteTimeTracker, 'Delete Time Tracker and Timesheet of other members.'),
        ...extraParams,
    },

}