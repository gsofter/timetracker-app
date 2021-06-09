import { ConfigurationScope, IPermissionType } from '@adminide-stack/core';
import * as nls from '@vscode-alt/monaco-editor/esm/vs/nls';
import { IRoles } from '@common-stack/server-core';
import { IPreDefineAccountPermissions } from '../../constants';

const extraParams = {
    type: 'string',
    enum: [IPermissionType.Allow, IPermissionType.Deny, IPermissionType.NotSet],
    default: IPermissionType.NotSet,
    scope: ConfigurationScope.WINDOW,
};
export const TimeTrackerRolesContribution: IRoles<ConfigurationScope> = {
    // others
    [IPreDefineAccountPermissions.viewOthersTimeTracker]: {
        enumDescriptions: [
            nls.localize(
                `${IPreDefineAccountPermissions.viewOthersTimeTracker}.${IPermissionType.Allow}`,
                'Has ability to view Time Tracker, Reports and Timesheet of other members.',
            ),
            nls.localize(
                `${IPreDefineAccountPermissions.viewOthersTimeTracker}.${IPermissionType.Deny}`,
                'No ability to view Time Tracker, Reports and Timesheet of other members.',
            ),
        ],
        description: nls.localize(
            IPreDefineAccountPermissions.viewOthersTimeTracker,
            'View an Time Tracker, Time Reports and Timesheet of others.',
        ),
        ...extraParams,
    },
    [IPreDefineAccountPermissions.createOthersTimeTracker]: {
        enumDescriptions: [
            nls.localize(
                `${IPreDefineAccountPermissions.createOthersTimeTracker}.${IPermissionType.Allow}`,
                'Has ability to create Time Tracker, Reports and Timesheet of other members.',
            ),
            nls.localize(
                `${IPreDefineAccountPermissions.createOthersTimeTracker}.${IPermissionType.Deny}`,
                'No ability to create Time Tracker, Reports and Timesheet of other members.',
            ),
        ],
        description: nls.localize(
            IPreDefineAccountPermissions.createOthersTimeTracker,
            'Create Time Tracker, Reports and Timesheet of other members.',
        ),
        ...extraParams,
    },
    [IPreDefineAccountPermissions.editOthersTimeTracker]: {
        enumDescriptions: [
            nls.localize(
                `${IPreDefineAccountPermissions.editOthersTimeTracker}.${IPermissionType.Allow}`,
                'Has ability to edit Time Tracker, Reports and Timesheet of other members.',
            ),
            nls.localize(
                `${IPreDefineAccountPermissions.editOthersTimeTracker}.${IPermissionType.Deny}`,
                'No ability to edit Time Tracker, Reports and Timesheet of other members.',
            ),
        ],
        description: nls.localize(
            IPreDefineAccountPermissions.editOthersTimeTracker,
            'Manage Time Tracker, Reports and Timesheet of other members',
        ),
        ...extraParams,
    },
    [IPreDefineAccountPermissions.manageOthersTimeTracker]: {
        enumDescriptions: [
            nls.localize(
                `${IPreDefineAccountPermissions.manageOthersTimeTracker}.${IPermissionType.Allow}`,
                'Has ability to manage Time Tracker, Reports and Timesheet of other members.',
            ),
            nls.localize(
                `${IPreDefineAccountPermissions.manageOthersTimeTracker}.${IPermissionType.Deny}`,
                'No ability to manage Time Tracker, Reports and Timesheet of other members.',
            ),
        ],
        description: nls.localize(
            IPreDefineAccountPermissions.manageOthersTimeTracker,
            'Manage Time Tracker, Reports and Timesheet of other members',
        ),
        ...extraParams,
    },
    [IPreDefineAccountPermissions.deleteOthersTimeTracker]: {
        enumDescriptions: [
            nls.localize(
                `${IPreDefineAccountPermissions.deleteOthersTimeTracker}.${IPermissionType.Allow}`,
                'Has ability to delete  Time Tracker and Timesheet of other members.',
            ),
            nls.localize(
                `${IPreDefineAccountPermissions.deleteOthersTimeTracker}.${IPermissionType.Deny}`,
                'No ability to delete  Time Tracker and Timesheet of other members.',
            ),
        ],
        description: nls.localize(
            IPreDefineAccountPermissions.deleteOthersTimeTracker,
            'Delete Time Tracker and Timesheet of other members.',
        ),
        ...extraParams,
    },
    // self
    [IPreDefineAccountPermissions.viewSelfTimeTracker]: {
        enumDescriptions: [
            nls.localize(
                `${IPreDefineAccountPermissions.viewSelfTimeTracker}.${IPermissionType.Allow}`,
                'Has ability to view Time Tracker, Reports and Timesheet of self.',
            ),
            nls.localize(
                `${IPreDefineAccountPermissions.viewSelfTimeTracker}.${IPermissionType.Deny}`,
                'No ability to view Time Tracker, Reports and Timesheet of self.',
            ),
        ],
        description: nls.localize(
            IPreDefineAccountPermissions.viewSelfTimeTracker,
            'View an Time Tracker, Time Reports and Timesheet of self',
        ),
        ...extraParams,
    },
    [IPreDefineAccountPermissions.createSelfTimeTracker]: {
        enumDescriptions: [
            nls.localize(
                `${IPreDefineAccountPermissions.createSelfTimeTracker}.${IPermissionType.Allow}`,
                'Has ability to create Time Tracker, Reports and Timesheet of self.',
            ),
            nls.localize(
                `${IPreDefineAccountPermissions.createSelfTimeTracker}.${IPermissionType.Deny}`,
                'No ability to create Time Tracker, Reports and Timesheet of self.',
            ),
        ],
        description: nls.localize(
            IPreDefineAccountPermissions.createSelfTimeTracker,
            'Create Time Tracker, Reports and Timesheet of self.',
        ),
        ...extraParams,
    },
    [IPreDefineAccountPermissions.editSelfTimeTracker]: {
        enumDescriptions: [
            nls.localize(
                `${IPreDefineAccountPermissions.editSelfTimeTracker}.${IPermissionType.Allow}`,
                'Has ability to edit Time Tracker, Reports and Timesheet of self.',
            ),
            nls.localize(
                `${IPreDefineAccountPermissions.editSelfTimeTracker}.${IPermissionType.Deny}`,
                'No ability to edit Time Tracker, Reports and Timesheet of self.',
            ),
        ],
        description: nls.localize(
            IPreDefineAccountPermissions.editSelfTimeTracker,
            'Manage Time Tracker, Reports and Timesheet of self.',
        ),
        ...extraParams,
    },
    [IPreDefineAccountPermissions.manageSelfTimeTracker]: {
        enumDescriptions: [
            nls.localize(
                `${IPreDefineAccountPermissions.manageSelfTimeTracker}.${IPermissionType.Allow}`,
                'Has ability to manage Time Tracker, Reports and Timesheet of self.',
            ),
            nls.localize(
                `${IPreDefineAccountPermissions.manageSelfTimeTracker}.${IPermissionType.Deny}`,
                'No ability to manage Time Tracker, Reports and Timesheet of self.',
            ),
        ],
        description: nls.localize(
            IPreDefineAccountPermissions.manageSelfTimeTracker,
            'Manage Time Tracker, Reports and Timesheet of self.',
        ),
        ...extraParams,
    },
    [IPreDefineAccountPermissions.deleteSelfTimeTracker]: {
        enumDescriptions: [
            nls.localize(
                `${IPreDefineAccountPermissions.deleteSelfTimeTracker}.${IPermissionType.Allow}`,
                'Has ability to delete  Time Tracker and Timesheet of self.',
            ),
            nls.localize(
                `${IPreDefineAccountPermissions.deleteSelfTimeTracker}.${IPermissionType.Deny}`,
                'No ability to delete  Time Tracker and Timesheet of self.',
            ),
        ],
        description: nls.localize(
            IPreDefineAccountPermissions.deleteSelfTimeTracker,
            'Delete Time Tracker and Timesheet of self.',
        ),
        ...extraParams,
    },
};
