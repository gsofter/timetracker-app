
import { Feature } from '@common-stack/server-core';
import { interfaces } from 'inversify';
import { schema } from './schema'
import { timeTrackerModule } from './containers'
import { resolver } from './resolvers'
import { TYPES } from './constants';

const createServiceFunc = (container: interfaces.Container) => ({
    timeTrackerService: container.get(TYPES.ITimeTrackerService),
})

export default new Feature({
    schema: schema,
    createResolversFunc: [resolver],
    createContainerFunc: [timeTrackerModule],
    createServiceFunc: createServiceFunc,
});
