import { Feature } from '@common-stack/server-core';
import { interfaces } from 'inversify';
import { schema } from './schema';
import { timeTrackerModule } from './containers';
import { resolvers } from './resolvers';
import { TYPES } from './constants';
import { mainLoadConfigurationPre } from './initialization';
import { TimeTrackerRolesContribution, TimeTrackerRolesPermissionOverwrite } from './preferences';

const createServiceFunc = (container: interfaces.Container) => ({
    timeRecordService: container.get(TYPES.ITimeRecordService),
    timesheetService: container.get(TYPES.ITimesheetService),
});

export default new Feature({
    schema,
    createResolversFunc: resolvers,
    createContainerFunc: [timeTrackerModule],
    createServiceFunc,
    preStartFunc: [mainLoadConfigurationPre],
    addPermissions: {
        createPermissions: [TimeTrackerRolesContribution],
    },
    rolesUpdate: {
        overwriteRolesPermissions: TimeTrackerRolesPermissionOverwrite,
    },
});
