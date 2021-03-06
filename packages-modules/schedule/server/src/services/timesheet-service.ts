import * as ILogger from 'bunyan';

import { inject, injectable } from 'inversify';
import { ITimesheet, ITimesheetCreateRequest } from '@admin-layout/timetracker-core';
import { ITimesheetService, ITimesheetRepository } from '../interfaces';
import { TYPES } from '../constants';

@injectable()
export class TimesheetService implements ITimesheetService {
    private logger: ILogger;

    constructor(
        @inject(TYPES.ITimesheetRepository)
        protected timesheetRepository: ITimesheetRepository,

        @inject('Logger')
        logger: ILogger,
    ) {
        this.logger = logger;
    }

    public async getTimesheetEvents(userId: string): Promise<Array<ITimesheet>> {
        return this.timesheetRepository.getTimesheetEvents(userId);
    }

    public async createTimesheetEvent(newEvent: ITimesheetCreateRequest): Promise<boolean> {
        return this.timesheetRepository.createTimesheetEvent(newEvent);
    }

    public async updateTimesheetEvent(eventId: string, newEvent: ITimesheet): Promise<boolean> {
        return this.timesheetRepository.updateTimesheetEvent(eventId, newEvent);
    }

    public async removeTimesheetEvent(eventId: string): Promise<boolean> {
        return this.timesheetRepository.removeTimesheetEvent(eventId);
    }
}
