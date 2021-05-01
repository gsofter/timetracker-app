import { ContainerModule, interfaces } from 'inversify';
import CounterModule, { NATS_MOLECULER_COUNTER_SERIVCE } from '@admin-layout/counter-module-server';
import { TaggedType } from '@common-stack/core';
import { Feature } from '@common-stack/server-core';
import { config } from '../config';

const subTopic = config.CONNECTION_ID; // version.topic.action

export const settings: any & { name: string } = {
    name: NATS_MOLECULER_COUNTER_SERIVCE,
    connectionId: config.CONNECTION_ID,
    namespace: config.NAMESPACE,
    subTopic,
    logger: config.LOG_LEVEL,
    workspaceId: config.CONNECTION_ID || 'DEFAULT',
    configPath: process.env.CONFIG_PATH,
};

const defaultModule = () =>
    new ContainerModule((bind: interfaces.Bind) => {
        bind('Settings').toConstantValue(settings).whenTargetTagged('default', true);
        bind('Settings').toConstantValue(settings).whenTargetTagged(TaggedType.MICROSERVICE, true);
        bind('MongoOptions').toConstantValue({});
    });

const DefaultFeature = new Feature({
    createContainerFunc: [defaultModule],
    createHemeraContainerFunc: [defaultModule],
});

export default new Feature(DefaultFeature, CounterModule);
