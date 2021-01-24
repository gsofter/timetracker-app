import * as ILogger from 'bunyan'

import { inject, injectable } from 'inversify'
import { ITimeTrackerService, ITimeTrackerRepository } from '../interfaces'
import { ITimeRecord, ITimeRecordRequest } from '@admin-layout/timetracker-module-core'
import { TYPES } from '../constants'
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

    public async getTimeRecords(): Promise<Array<any>> {
        return this.trackerRepository.getTimeRecords();
    }

    public async getPlayingTimeRecord(): Promise<ITimeRecord> {
        return this.trackerRepository.getPlayingTimeRecord();
    }

    public async createTimeRecord( request: ITimeRecordRequest) {
        return this.trackerRepository.createTimeRecord(request)
    }

    public async updateTimeRecord(recordId: string, request: ITimeRecordRequest) {
        return this.trackerRepository.updateTimeRecord(recordId, request)
    }

    public async removeTimeRecord(recordId: string) {
        return this.trackerRepository.removeTimeRecord(recordId)
    }
}