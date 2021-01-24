import * as Logger from 'bunyan';
import { injectable, inject, optional } from 'inversify';
import { ITimeTrackerRepository } from './../../interfaces';
import * as mongoose from 'mongoose';
import { TimeRecordModelType, TimeRecordModelFunc } from './../models/timetracker-model';
import { ITimeRecordRequest } from '@admin-layout/timetracker-module-core'
@injectable()
export class TimeTrackerRepository implements ITimeTrackerRepository {
  private timeRecordModel: TimeRecordModelType;
  private logger: Logger;
  constructor(
    @inject('MongoDBConnection')
    db: mongoose.Connection,

    @inject('Logger')
    logger: Logger,

    @inject('MongoOptions')
    @optional()
    options?: any,
  ) {
    this.logger = logger.child({ className: 'ScheduleRepository' });
    this.timeRecordModel = TimeRecordModelFunc(db);
  }

  public async getTimeRecords() {
    return this.timeRecordModel.find({ end: {$ne:null} });
  }

  public async getPlayingTimeRecord() {
    const res = await this.timeRecordModel.find({ end: null });
    if(res.length > 0) {
      return res[0]
    }
    return null;
  }

  public async createTimeRecord(request: ITimeRecordRequest) {
    try {
        const response = await this.timeRecordModel.create({ ...request })
        return response.id;
    } catch(err) {
        throw new Error(err.message);
    }
  }

  public async updateTimeRecord(recordId: string, request: ITimeRecordRequest) {
    try {
        await this.timeRecordModel.update({ _id: recordId }, { ...request })
        return true;
    } catch(err) {
        throw new Error(err.message);
    }
  }

  public async removeTimeRecord(recordId: string) {
    try {
        await this.timeRecordModel.remove({ _id: recordId})
        return true;
    } catch(err) {
        throw new Error(err.message);
    }
  }
}
