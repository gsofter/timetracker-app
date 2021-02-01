import * as Logger from 'bunyan';
import { injectable, inject, optional } from 'inversify';
import { ITimeTrackerRepository } from './../../interfaces';
import * as mongoose from 'mongoose';
import { TimeTrackerModelType, TimeTrackerModelFunc } from './../models/timetracker-model';
import { ITimeRecordRequest, ITimeRecord, ITimesheet, ITimesheetCreateRequest } from '@admin-layout/timetracker-module-core'
@injectable()
export class TimeTrackerRepository implements ITimeTrackerRepository {
  private timeTrackerModel: TimeTrackerModelType;
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
    this.timeTrackerModel = TimeTrackerModelFunc(db);
  }

  public async getTimeRecords(userId?: string): Promise<Array<ITimeRecord>> {
    const trackDoc = await this.timeTrackerModel.find({ userId, timeline: { end: { $ne: null } } } );
    if(trackDoc && trackDoc.length > 0) {
      return trackDoc[0].timeRecords;
    }
    else {
      return [];
    }
  }

  public async getTimesheets(userId?: string): Promise<Array<ITimesheet>> {
    const trackDoc = await this.timeTrackerModel.find({ userId, timeline: { end: { $ne: null } } } );
    if(trackDoc && trackDoc.length > 0) {
      return trackDoc[0].timesheets;
    }
    else {
      return [];
    }
  }

  public async getPlayingTimeRecord(userId?: string):Promise<ITimeRecord>  {
    const trackDoc = await this.timeTrackerModel.find({ userId, timeline: { end: null } } );
    if(trackDoc && trackDoc.length > 0) {
      return trackDoc[0].timeRecords[0];
    }
    return null;
  }

  public async createTimeRecord(userId: string, request: ITimeRecordRequest) {
    try {
        const response = await this.timeTrackerModel.update({ userId: userId }, { $push: { timeRecords: request }}, { upsert: true });
        return response.id;
    } catch(err) {
        throw new Error(err.message);
    }
  }

  public async createTimesheet(userId: string, request: ITimesheetCreateRequest) {
    try {
        const response = await this.timeTrackerModel.update({ userId: userId }, { $push: { timesheets: request }}, { upsert: true });
        return true;
    } catch(err) {
        throw new Error(err.message);
    }
  }

  public async updateTimeRecord(userId:string, recordId: string, request: ITimeRecordRequest) {
    try {
      const response = await this.timeTrackerModel.update({ userId: userId, timeRecords: { $elemMatch: {_id: recordId } } }, { $push: { timeRecords: request }})
        return true;
    } catch(err) {
        throw new Error(err.message);
    }
  }

  public async updateTimesheet(userId:string, sheetId: string, request: ITimesheetCreateRequest) {
    try {
      const response = await this.timeTrackerModel.update({ userId: userId, timesheets: { $elemMatch: {_id: sheetId } } }, { $push: { timesheets: request }})
        return true;
    } catch(err) {
        throw new Error(err.message);
    }
  }

  public async removeTimeRecord(userId: string, recordId: string) {
    try {
        await this.timeTrackerModel.remove({ userId: userId, timeRecords: { $elemMatch: {_id: recordId } } })
        return true;
    } catch(err) {
        throw new Error(err.message);
    }
  }

  public async removeTimesheet(userId: string, sheetId: string) {
    try {
        await this.timeTrackerModel.remove({ userId: userId, timesheets: { $elemMatch: {_id: sheetId } } })
        return true;
    } catch(err) {
        throw new Error(err.message);
    }
  }
}
