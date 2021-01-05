import * as ILogger from 'bunyan'

import { inject, injectable } from 'inversify'
import { ISchedule, IScheduleCreateRequest } from '@admin-layout/schedule-module-core'
import { IScheduleService, IScheduleRepository } from '../interfaces'
import { TYPES } from '../constants'
@injectable()
export class ScheduleService implements IScheduleService {
    private logger: ILogger;
    constructor(
        @inject(TYPES.IScheduleRepository)
        protected scheduleRepository: IScheduleRepository,

        @inject('Logger')
        logger: ILogger
    ) {
        this.logger = logger
    }

    public async getScheduleEvents(userId: string): Promise<Array<ISchedule>> {
        return this.scheduleRepository.getScheduleEvents(userId);
    }

    public async createSchedule(newEvent: IScheduleCreateRequest): Promise<Boolean> {
        return this.scheduleRepository.createSchedule(newEvent);
    }
}