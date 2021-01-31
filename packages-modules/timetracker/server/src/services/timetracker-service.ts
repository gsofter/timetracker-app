import * as ILogger from 'bunyan'

import { inject, injectable } from 'inversify'
import { ITimeTrackerService, ITimeTrackerRepository } from '../interfaces'
import { ITimeRecord, ITimeRecordRequest, ITimesheet, ITimesheetCreateRequest } from '@admin-layout/timetracker-module-core'
import { TYPES, DEFAULT_USER } from '../constants'
@injectable()
export class TimeTrackerService implements ITimeTrackerService {
    private logger: ILogger;
    constructor(
        @inject(TYPES.ITimeTrackerRepository)
        protected trackerRepository: ITimeTrackerRepository,

        @inject('Logger')
        logger: ILogger
    ) {
        this.logger = logger
    }

    public async getTimeRecords(userId: string): Promise<Array<ITimeRecord>> {
        return this.trackerRepository.getTimeRecords(userId);
    }

    public async getTimesheets(userId: string): Promise<Array<ITimesheet>> {
        return this.trackerRepository.getTimesheets(userId);
    }

    public async getPlayingTimeRecord(userId: string): Promise<ITimeRecord> {
        return this.trackerRepository.getPlayingTimeRecord(userId);
    }

    public async createTimeRecord(userId: string, request: ITimeRecordRequest) {
        return this.trackerRepository.createTimeRecord(userId, request)
    }

    public async createTimesheet(userId: string, request: ITimesheetCreateRequest) {
        return this.trackerRepository.createTimesheet(userId, request)
    }

    public async updateTimeRecord(userId: string, recordId: string, request: ITimeRecordRequest) {
        return this.trackerRepository.updateTimeRecord(userId, recordId, request)
    }

    public async updateTimesheet(userId: string, sheetId: string, request: ITimesheetCreateRequest) {
        return this.trackerRepository.updateTimesheet(userId, sheetId, request)
    }

    public async removeTimeRecord(userId: string, recordId: string) {
        return this.trackerRepository.removeTimeRecord(userId, recordId)
    }

    public async removeTimesheet(userId: string, sheetId: string) {
        return this.trackerRepository.removeTimesheet(userId, sheetId)
    }
}