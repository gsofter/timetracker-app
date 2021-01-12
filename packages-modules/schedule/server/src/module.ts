import { schema } from './schema';
import { resolvers } from './resolvers';
import { scheduleModule, timelineModule, timesheetModule } from './containers';
import { Feature } from '@common-stack/server-core';
import { interfaces } from 'inversify';
import { TYPES } from './constants';


const dataSources: (container: interfaces.Container) => any = () => {
    return {
        // counterCache: new CounterDataSource(),
    };
};

const createServiceFunc = (container: interfaces.Container) => ({
    scheduleService: container.get(TYPES.IScheduleService),
    timelineService: container.get(TYPES.ITimelineService),
    timesheetService: container.get(TYPES.ITimesheetService),
})

export default new Feature({
    schema: schema,
    createContainerFunc: [scheduleModule, timelineModule, timesheetModule],
    createResolversFunc: resolvers,
    createServiceFunc: createServiceFunc,
    // createContextFunc: () => ({ counterMock: counterMock }), // note anything set here should be singleton.
    createDataSourceFunc: dataSources,
    addBrokerMainServiceClass: [],
});
