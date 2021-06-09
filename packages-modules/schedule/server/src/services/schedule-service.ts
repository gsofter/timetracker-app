/* eslint-disable import/no-extraneous-dependencies */
import { CdmLogger } from '@cdm-logger/core';

import { inject, injectable } from 'inversify';
import { ISchedule, IScheduleCreateRequest } from '@admin-layout/schedule-module-core';
import { IScheduleService, IScheduleRepository } from '../interfaces';
import { TYPES } from '../constants';

type ILogger = CdmLogger.ILogger;
@injectable()
export class ScheduleService implements IScheduleService {
    private logger: ILogger;

    constructor(
        @inject(TYPES.IScheduleRepository)
        protected scheduleRepository: IScheduleRepository,

        @inject('Logger')
        logger: ILogger,
    ) {
        this.logger = logger;
    }

    public async getScheduleEvents(userId: string): Promise<Array<ISchedule>> {
        return this.scheduleRepository.getScheduleEvents(userId);
    }

    public async createScheduleEvent(newEvent: IScheduleCreateRequest): Promise<boolean> {
        return this.scheduleRepository.createScheduleEvent(newEvent);
    }

    public async updateScheduleEvent(eventId: string, newEvent: ISchedule): Promise<boolean> {
        return this.scheduleRepository.updateScheduleEvent(eventId, newEvent);
    }

    public async removeScheduleEvent(eventId: string): Promise<boolean> {
        return this.scheduleRepository.removeScheduleEvent(eventId);
    }
}
