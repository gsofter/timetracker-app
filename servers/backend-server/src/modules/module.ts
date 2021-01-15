import { ContainerModule, interfaces } from 'inversify';
import { Feature } from '@common-stack/server-core';
import CounterModule from '@admin-layout/counter-module-server';
import ScheduleModule from '@admin-layout/schedule-module-server';
import TimeTrackerModule from '@admin-layout/timetracker-module-server';
import { config } from '../config';
import { TaggedType } from '@common-stack/core';

export const settings = {
    // mongoConnection: generateMongo(config.MONGO_URL),
    subTopic: config.CONNECTION_ID, // usually versioning
};


const defaultModule =
    () => new ContainerModule((bind: interfaces.Bind) => {
        bind('Settings').toConstantValue(settings).whenTargetTagged('default', true);
        bind('Settings').toConstantValue(settings).whenTargetTagged(TaggedType.MICROSERVICE, true);
        bind('MongoOptions').toConstantValue({});
    });


const DefaultFeature = new Feature({
    createContainerFunc: [defaultModule],
    createHemeraContainerFunc: [defaultModule],
});


export default new Feature(DefaultFeature, CounterModule, ScheduleModule, TimeTrackerModule);
