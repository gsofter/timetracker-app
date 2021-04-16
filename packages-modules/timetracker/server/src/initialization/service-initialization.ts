/* eslint-disable import/no-extraneous-dependencies */
import {
    IRegistryExtensions as RegistryExtensions,
    IConfigurationRegistry,
    IRegistry,
    ServerTypes as TYPES,
    IConfigurationContributionNames,
} from '@adminide-stack/core';
import * as ILogger from 'bunyan';
import { TYPES as serverTypes, Schemas } from '@workbench-stack/core';
import { CommonType } from '@common-stack/core';
import { interfaces } from 'inversify';
import { TimeTrackerContribution } from '../preferences';

export const mainLoadConfigurationPre = async (_, container: interfaces.Container) => {
    const logger = container.get<ILogger>(CommonType.LOGGER);
    logger.info('PRESTART START: --  load default configuration to registry');

    const registry = container.get<IRegistry>(serverTypes.IRegistry);
    const configurationRegistry = registry.as<IConfigurationRegistry>(RegistryExtensions.Configuration);
    configurationRegistry.registerConfiguration(TimeTrackerContribution);
    logger.info('PRESTART ENDS:  -- load default configuration to registry');
};
