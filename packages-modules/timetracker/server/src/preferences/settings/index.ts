import { IConfigurationNode } from '@adminide-stack/core';
import { IConfigurationContributionNames } from '@admin-layout/timetracker-core';
import { TimeTrackerProperties } from './general-settings';
import { TrackerPaymentProperties } from './payment-settings';

export const TimeTrackerContribution: IConfigurationNode = {
    id: IConfigurationContributionNames.timeTracker,
    type: 'object',
    properties: { ...TimeTrackerProperties, ...TrackerPaymentProperties },
};
