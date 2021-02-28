import * as Logger from 'bunyan';
import { injectable, inject, optional } from 'inversify';
import { ITimeTrackerRepository } from './../../interfaces';
import * as mongoose from 'mongoose';
import { TimeTrackerModelType, TimeTrackerModelFunc } from './../models/timetracker-model';
import {
  ITimeRecordRequest,
  ITimeRecord,
  ITimesheet,
  ITimesheetCreateRequest,
  ITimeTracker,
  ITimesheetState
} from '@admin-layout/timetracker-module-core';

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

  public async getTimeRecords(userId: string, orgId: string): Promise<Array<ITimeRecord>> {
    const trackDoc = await this.timeTrackerModel.find({
      userId,
      orgId,
      timeRecords: { $elemMatch: { endTime: { $ne: null } } },
    });
    if (trackDoc && trackDoc.length > 0) {
      return trackDoc[0].timeRecords.filter(r => r.endTime !== null && r.endTime);
    } else {
      return [];
    }
  }

  public async getDurationTimeRecords(
    userId: string,
    orgId: string,
    startTime: Date,
    endTime: Date,
  ): Promise<Array<ITimeRecord>> {
    const trackDoc = await this.timeTrackerModel.find({
      userId,
      orgId,
      $and: [
        {
          'timeRecords.startTime': {
            $gte: new Date(startTime.toISOString()),
          },
        },
        {
          'timeRecords.startTime': {
            $lte: new Date(endTime.toISOString()),
          },
        },
      ],
    });
    if (trackDoc && trackDoc.length > 0) {
      return trackDoc[0].timeRecords.filter(r => r.endTime !== null && r.endTime);
    } else {
      return [];
    }
  }

  public async getTimesheets(userId: string, orgId: string): Promise<Array<ITimesheet>> {
    const trackDoc = await this.timeTrackerModel.find({
      userId,
      orgId,
    });
    if (trackDoc && trackDoc.length > 0) {
      return trackDoc[0].timesheets;
    } else {
      return [];
    }
  }

  public async getDurationTimesheet(userId: string, orgId: string, start: Date, end:Date): Promise<ITimesheet> {
    const trackDoc = await this.timeTrackerModel.aggregate([
      { 
        $project: {
          userId, orgId,
          timesheets : { 
            $filter: {
              input: '$timesheets',
              as: 'timesheets',
              cond:{ 
                $and: [
                  { $eq: ["$$timesheets.startDate", start ] },
                  { $eq: ["$$timesheets.endDate", end ]},
              ]} 
            }
          }
        }
      }
    ]) as [ITimeTracker];

    if(trackDoc && trackDoc[0].timesheets.length > 0)  
      return trackDoc[0].timesheets[0]
    return null;
  }


  public async getPlayingTimeRecord(userId: string, orgId: string): Promise<ITimeRecord> {
    console.log('getPlayingTimeRecord.userId', userId);
    const trackDoc = await this.timeTrackerModel.find({
      userId,
      orgId,
      timeRecords: { $elemMatch: { endTime: null } },
    });
    console.log('getPlayingTimeRecord.trackDoc', trackDoc);
    if (trackDoc && trackDoc.length > 0) {
      return trackDoc[0].timeRecords.find(r => r.endTime === null);
    }
    return null;
  }

  public async createTimeRecord(userId: string, orgId: string, request: ITimeRecordRequest) {
    try {
      const response = await this.timeTrackerModel.update(
        { userId: userId, orgId: orgId },
        { userId: userId, $push: { timeRecords: request } },
        { upsert: true },
      );
      return response.id;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async createTimesheet(userId: string, orgId: string, request: ITimesheetCreateRequest) {
    try {
      const response = await this.timeTrackerModel.update(
        { userId: userId },
        { $push: { timesheets: request } },
        { upsert: true },
      );
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async updateTimeRecord(
    userId: string,
    orgId: string,
    recordId: string,
    request: ITimeRecordRequest,
  ) {
    try {
      const response = await this.timeTrackerModel.update(
        { userId: userId, orgId: orgId, timeRecords: { $elemMatch: { _id: recordId } } },
        { $set: { 'timeRecords.$': request } },
      );
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async updateTimesheet(
    userId: string,
    orgId: string,
    sheetId: string,
    request: ITimesheetCreateRequest,
  ) {
    try {
      const response = await this.timeTrackerModel.update(
        { userId: userId, orgId: orgId, timesheets: { $elemMatch: { _id: sheetId } } },
        { $set: { 'timesheets.$': request } },
      );
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async updateTimesheetStatus(
    userId: string,
    orgId: string,
    request: ITimesheetCreateRequest,
  ) {
    try {
      const response = await this.timeTrackerModel.update({
        userId,
        orgId,
        $and: [
          {
            $elemMatch: { 'timesheets.startDate': new Date(request.startDate.toISOString()) }
          },
          {
            $elemMatch: { 'timesheets.endDate': new Date(request.endDate.toISOString()) }
          },
        ],
      }, {
        '$set': {
          'timesheets.$': request
        }
      });
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async removeTimeRecord(userId: string, orgId: string, recordId: string) {
    try {
      const trackerDoc = await this.timeTrackerModel.find({ userId, orgId });
      if (trackerDoc && trackerDoc.length > 0) {
        const timeRecords = trackerDoc[0].timeRecords.filter(tr => tr.id !== recordId);
        await this.timeTrackerModel.update(
          {
            userId,
            orgId,
          },
          {
            timeRecords,
          },
        );
        return true;
      }
      return false;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async removeDurationTimeRecords(
    userId: string,
    orgId: string,
    startTime: Date,
    endTime: Date,
    projectId: string,
  ) {
    try {
      const trackerDoc = await this.timeTrackerModel.find({ userId, orgId });
      if (trackerDoc && trackerDoc.length > 0) {
        const timeRecords = trackerDoc[0].timeRecords.filter(
          tr => tr.startTime < startTime || tr.startTime > endTime || tr.projectId !== projectId,
        );
        await this.timeTrackerModel.update(
          {
            userId,
            orgId,
          },
          {
            timeRecords,
          },
        );
        return true;
      }
      return false;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async removeTimesheet(userId: string, orgId: string, sheetId: string) {
    try {
      await this.timeTrackerModel.update(
        {
          userId,
          orgId,
        },
        {
          $pull: { 'timesheets._id': sheetId },
        },
      );
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
