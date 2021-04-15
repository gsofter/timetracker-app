import { IConfigurationNode } from '@adminide-stack/core';
import { IConfigurationContributionNames } from '@admin-layout/activity-core';
import { ActivityProperties } from './activity-settings';

export const ActivityTrackerContribution: IConfigurationNode = {
    id: IConfigurationContributionNames.activityTracker,
    type: 'object',
    properties: { ...ActivityProperties },
};
