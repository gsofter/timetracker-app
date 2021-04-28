import { IPermissionType, IApplicationRoles } from '@adminide-stack/core';
import { IPreDefineAccountPermissions } from '../../constants';

export const TimeTrackerRolesPermissionOverwrite = {
    [IApplicationRoles.OWNER]: {
        [IPreDefineAccountPermissions.viewTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.createTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.editTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.deleteTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.manageTimeTracker]: IPermissionType.Allow,
    },
    [IApplicationRoles.ADMIN]: {
        [IPreDefineAccountPermissions.viewTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.createTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.editTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.deleteTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.manageTimeTracker]: IPermissionType.Allow,
    },
    [IApplicationRoles.ORGANIZATION_MANAGER]: {
        [IPreDefineAccountPermissions.viewTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.createTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.editTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.deleteTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.manageTimeTracker]: IPermissionType.Allow,
    },
    [IApplicationRoles.PROJECT_ADMIN]: {
        [IPreDefineAccountPermissions.viewTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.createTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.editTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.deleteTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.manageTimeTracker]: IPermissionType.Allow,
    },
    [IApplicationRoles.MEMBER]: {
        [IPreDefineAccountPermissions.viewTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.createTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.editTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.deleteTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.manageTimeTracker]: IPermissionType.Deny,
    },
    [IApplicationRoles.PROJECT_VIEWER]: {
        [IPreDefineAccountPermissions.viewTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.createTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.editTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.deleteTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.manageTimeTracker]: IPermissionType.Deny,
    },
    [IApplicationRoles.USER]: {
        [IPreDefineAccountPermissions.viewTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.createTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.editTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.deleteTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.manageTimeTracker]: IPermissionType.Deny,
    },
    [IApplicationRoles.GUEST]: {
        [IPreDefineAccountPermissions.viewTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.createTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.editTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.deleteTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.manageTimeTracker]: IPermissionType.Deny,
    },
}