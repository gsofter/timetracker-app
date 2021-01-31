
import { Feature } from '@common-stack/server-core';
import { interfaces } from 'inversify';
import { schema } from './schema'
import { timeTrackerModule } from './containers'
import { resolvers } from './resolvers'
import { TYPES } from './constants';

const createServiceFunc = (container: interfaces.Container) => ({
    timeTrackerService: container.get(TYPES.ITimeTrackerService),
    // timeRecordService: container.get(TYPES.ITimeRecordService),
})

export default new Feature({
    schema: schema,
    createResolversFunc: resolvers,
    createContainerFunc: [timeTrackerModule],
    createServiceFunc: createServiceFunc,
});
