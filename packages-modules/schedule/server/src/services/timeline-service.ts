/* eslint-disable import/no-extraneous-dependencies */
import { CdmLogger } from '@cdm-logger/core';

import { inject, injectable } from 'inversify';
import { ITimeline, ITimelineCreateRequest } from '@admin-layout/schedule-module-core';
import { ITimelineService, ITimelineRepository } from '../interfaces';
import { TYPES } from '../constants';

@injectable()
export class TimelineService implements ITimelineService {
    private logger: CdmLogger.ILogger;

    constructor(
        @inject(TYPES.ITimelineRepository)
        protected timelineRepository: ITimelineRepository,

        @inject('Logger')
        logger: CdmLogger.ILogger,
    ) {
        this.logger = logger;
    }

    public async getTimelineEvents(userId: string): Promise<Array<ITimeline>> {
        return this.timelineRepository.getTimelineEvents(userId);
    }

    public async createTimelineEvent(newEvent: ITimelineCreateRequest): Promise<boolean> {
        return this.timelineRepository.createTimelineEvent(newEvent);
    }

    public async updateTimelineEvent(eventId: string, newEvent: ITimeline): Promise<boolean> {
        return this.timelineRepository.updateTimelineEvent(eventId, newEvent);
    }

    public async removeTimelineEvent(eventId: string): Promise<boolean> {
        return this.timelineRepository.removeTimelineEvent(eventId);
    }
}
