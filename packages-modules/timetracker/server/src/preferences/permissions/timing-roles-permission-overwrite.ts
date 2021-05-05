import { IPermissionType, IApplicationRoles } from '@adminide-stack/core';
import { IPreDefineAccountPermissions } from '../../constants';

export const TimeTrackerRolesPermissionOverwrite = {
    [IApplicationRoles.OWNER]: {
        // self
        [IPreDefineAccountPermissions.viewSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.createSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.editSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.deleteSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.manageSelfTimeTracker]: IPermissionType.Allow,

        // others
        [IPreDefineAccountPermissions.viewOthersTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.createOthersTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.editOthersTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.deleteOthersTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.manageOthersTimeTracker]: IPermissionType.Allow,
    },
    [IApplicationRoles.ADMIN]: {
        [IPreDefineAccountPermissions.viewSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.createSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.editSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.deleteSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.manageSelfTimeTracker]: IPermissionType.Deny,

        [IPreDefineAccountPermissions.viewOthersTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.createOthersTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.editOthersTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.deleteOthersTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.manageOthersTimeTracker]: IPermissionType.Allow,
    },
    [IApplicationRoles.ORGANIZATION_MANAGER]: {
        [IPreDefineAccountPermissions.viewSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.createSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.editSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.deleteSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.manageSelfTimeTracker]: IPermissionType.Allow,

        [IPreDefineAccountPermissions.viewOthersTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.createOthersTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.editOthersTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.deleteOthersTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.manageOthersTimeTracker]: IPermissionType.Allow,
    },
    [IApplicationRoles.PROJECT_ADMIN]: {
        [IPreDefineAccountPermissions.viewSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.createSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.editSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.deleteSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.manageSelfTimeTracker]: IPermissionType.Deny,

        [IPreDefineAccountPermissions.viewOthersTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.createOthersTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.editOthersTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.deleteOthersTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.manageOthersTimeTracker]: IPermissionType.Allow,
    },
    [IApplicationRoles.MEMBER]: {
        [IPreDefineAccountPermissions.viewSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.createSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.editSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.deleteSelfTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.manageSelfTimeTracker]: IPermissionType.Deny,

        [IPreDefineAccountPermissions.viewOthersTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.createOthersTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.editOthersTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.deleteOthersTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.manageOthersTimeTracker]: IPermissionType.Deny,
    },
    [IApplicationRoles.PROJECT_VIEWER]: {
        [IPreDefineAccountPermissions.viewSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.createSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.editSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.deleteSelfTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.manageSelfTimeTracker]: IPermissionType.Deny,

        [IPreDefineAccountPermissions.viewOthersTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.createOthersTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.editOthersTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.deleteOthersTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.manageOthersTimeTracker]: IPermissionType.Deny,
    },
    [IApplicationRoles.USER]: {
        [IPreDefineAccountPermissions.viewSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.createSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.editSelfTimeTracker]: IPermissionType.Allow,
        [IPreDefineAccountPermissions.deleteSelfTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.manageSelfTimeTracker]: IPermissionType.Deny,

        [IPreDefineAccountPermissions.viewOthersTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.createOthersTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.editOthersTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.deleteOthersTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.manageOthersTimeTracker]: IPermissionType.Deny,
    },
    [IApplicationRoles.GUEST]: {
        [IPreDefineAccountPermissions.viewSelfTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.createSelfTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.editSelfTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.deleteSelfTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.manageSelfTimeTracker]: IPermissionType.Deny,

        [IPreDefineAccountPermissions.viewOthersTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.createOthersTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.editOthersTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.deleteOthersTimeTracker]: IPermissionType.Deny,
        [IPreDefineAccountPermissions.manageOthersTimeTracker]: IPermissionType.Deny,
    },
};
