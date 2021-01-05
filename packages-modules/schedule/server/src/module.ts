import { schema } from './schema';
// import schema from './schema/schema.graphql'
import { resolver } from './resolvers';
import { scheduleModule } from './containers';
import { Feature } from '@common-stack/server-core';
import { interfaces } from 'inversify';
import { TYPES } from './constants';


const dataSources: (container: interfaces.Container) => any = () => {
    return {
        // counterCache: new CounterDataSource(),
    };
};

const createServiceFunc = (container: interfaces.Container) => ({
    scheduleService: container.get(TYPES.IScheduleService)
})

export default new Feature({
    schema: schema,
    createContainerFunc: [scheduleModule],
    createResolversFunc: resolver,
    createServiceFunc: createServiceFunc,
    // createContextFunc: () => ({ counterMock: counterMock }), // note anything set here should be singleton.
    createDataSourceFunc: dataSources,
    addBrokerMainServiceClass: [],
});
