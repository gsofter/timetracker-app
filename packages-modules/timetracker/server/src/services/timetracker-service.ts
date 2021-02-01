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

    public async getTimeRecords(userId: string, orgId: string) : Promise<Array<ITimeRecord>> {
        return this.trackerRepository.getTimeRecords(userId, orgId);
    }

    public async getTimesheets(userId: string, orgId: string) : Promise<Array<ITimesheet>> {
        return this.trackerRepository.getTimesheets(userId , orgId);
    }

    public async getPlayingTimeRecord(userId: string, orgId: string) : Promise<ITimeRecord> {
        return this.trackerRepository.getPlayingTimeRecord(userId, orgId);
    }

    public async createTimeRecord(userId: string, orgId: string, request: ITimeRecordRequest) {
        return this.trackerRepository.createTimeRecord(userId, orgId, request)
    }

    public async createTimesheet(userId: string, orgId: string, request: ITimesheetCreateRequest) {
        return this.trackerRepository.createTimesheet(userId, orgId , request)
    }

    public async updateTimeRecord(userId: string, orgId: string, recordId: string, request: ITimeRecordRequest) {
        return this.trackerRepository.updateTimeRecord(userId, orgId, recordId, request)
    }

    public async updateTimesheet(userId: string, orgId: string, sheetId: string, request: ITimesheetCreateRequest) {
        return this.trackerRepository.updateTimesheet(userId, orgId, sheetId, request)
    }

    public async removeTimeRecord(userId: string, orgId: string, recordId: string) {
        return this.trackerRepository.removeTimeRecord(userId, orgId, recordId)
    }

    public async removeTimesheet(userId: string, orgId: string, sheetId: string) {
        return this.trackerRepository.removeTimesheet(userId, orgId, sheetId)
    }
}