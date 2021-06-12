/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-underscore-dangle */
import * as Logger from 'bunyan';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import { ITimeRecordRequest, ITimeRecord, ITimeTracker } from '@admin-layout/timetracker-core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { TimeTrackerModelType, TimeTrackerModelFunc } from '../models/timetracker-model';

export interface ITimeRecordRepository {
  getTimeRecords(orgId: string, userId?: string, startTime?: Date, endTime?: Date): Promise<Array<ITimeRecord>>;
  getOrganizationTimeRecords(orgId: string): Promise<Array<ITimeRecord>>;
  getPlayingTimeRecord(userId: string, orgId: string): Promise<ITimeRecord>;
  createTimeRecord(userId: string, orgId: string, request: ITimeRecordRequest): Promise<Partial<ITimeTracker>>;
  updateTimeRecord(
    userId: string,
    orgId: string,
    recordId: string,
    request: ITimeRecordRequest,
  ): Promise<Partial<ITimeTracker>>;
  removeTimeRecord(userId: string, orgId: string, recordId: string): Promise<Partial<ITimeTracker>>;
  removeDurationTimeRecords(
    userId: string,
    orgId: string,
    startTime: Date,
    endTime: Date,
    projectId: string,
  ): Promise<boolean>;
  approveTimeRecords(orgId: string, sheetId: string, startDate: Date, endDate: Date);
  disapproveTimeRecords(orgId: string, sheetId: string);
}

// setback Days for default search
const SETBACK_DAYS = 7; // 7 days
@injectable()
export class TimeRecordRepository implements ITimeRecordRepository {
  private timeTrackerModel: TimeTrackerModelType;

  private logger: Logger;

  constructor(
    @inject('MongoDBConnection')
    db: mongoose.Connection,

    @inject('Logger')
    logger: Logger,
  ) {
    this.logger = logger.child({ className: 'ScheduleRepository' });
    this.timeTrackerModel = TimeTrackerModelFunc(db);
  }

  public async getTimeRecords(orgId: string, userId?: string | RegExp, from?: Date, until?: Date) {
    if (!userId) {
      userId = /.*/;
    }
    let startTime: Date;
    let endTime: Date;
    if (!from) {
      const dt = new Date();
      startTime = moment(dt).subtract(SETBACK_DAYS, 'day').toDate();
    } else {
      startTime = from;
    }
    if (!until) {
      const dt = new Date();
      endTime = moment(dt).toDate();
    } else {
      endTime = until;
    }

    const result = await this.timeTrackerModel.aggregate([
      {
        $match: {
          orgId,
        },
      },
      {
        $unwind: '$timeRecords',
      },
      {
        $match: {
          'timeRecords.userId': userId,
          'timeRecords.startTime': { $gte: startTime },
          'timeRecords.endTime': { $lte: endTime },
        },
      },
      {
        $group: {
          _id: '$orgId',
          timeRecords: {
            $push: '$timeRecords',
          },
        },
      },
      {
        $project: {
          orgId: 1,
          timeRecords: 1,
        },
      },
    ]);
    if (result.length === 0) {
      return [];
    }
    return result[0].timeRecords;
  }

  public async getOrganizationTimeRecords(orgId: string) {
    const trackDoc = await this.timeTrackerModel.findOne({ orgId });
    if (trackDoc && trackDoc.timeRecords) {
      return trackDoc.timeRecords;
    }
    return [];
  }

  public async getPlayingTimeRecord(userId: string, orgId: string): Promise<ITimeRecord> {
    const trackDoc = await this.timeTrackerModel.findOne({ orgId });
    if (trackDoc) {
      let res;
      if (trackDoc.timeRecords) res = trackDoc.timeRecords.find((tr) => tr.userId === userId && tr.endTime === null);
      return res;
    }
    return null;
  }

  public async createTimeRecord(userId: string, orgId: string, request: ITimeRecordRequest) {
    try {
      const response = await this.timeTrackerModel.findOneAndUpdate(
        { orgId },
        { orgId, $push: { timeRecords: request } },
        {
          upsert: true,
          new: true,
          projection: { userId, orgId, timeRecords: { $elemMatch: { startTime: request.startTime } } },
        },
      );
      return response.toObject();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async updateTimeRecord(userId: string, orgId: string, recordId: string, request: ITimeRecordRequest) {
    try {
      if (recordId === null || recordId === undefined) throw new Error('TimeRecord id not specified!');
      const response = await this.timeTrackerModel.findOneAndUpdate(
        { orgId, timeRecords: { $elemMatch: { _id: recordId } } },
        { $set: { 'timeRecords.$': request } },
        {
          new: true,
          projection: {
            userId,
            orgId,
            // used elemMatch `startTime` instead of `_id` as it keep changing after update.
            timeRecords: { $elemMatch: { startTime: request.startTime } },
          },
        },
      );
      return response.toObject();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async removeTimeRecord(userId: string, orgId: string, recordId: string) {
    try {
      const result = await this.timeTrackerModel.update(
        {
          orgId,
        },
        {
          $pull: { timeRecords: { _id: recordId } },
        },
      );
      if (result.nModified !== 1) {
        throw new Error('TimeRecord is not modified');
      }
      return { userId, orgId, timeRecords: [{ _id: recordId } as any] as ITimeRecord[] };
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
      const trackerDoc = await this.timeTrackerModel.find({ orgId });
      if (trackerDoc && trackerDoc.length > 0) {
        const timeRecords = trackerDoc[0].timeRecords.filter(
          (tr) => tr.startTime < startTime || tr.startTime > endTime || tr.projectId !== projectId,
        );
        await this.timeTrackerModel.update(
          {
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

  public async approveTimeRecords(orgId: string, sheetId: string, startDate: Date, endDate: Date) {
    try {
      await this.timeTrackerModel.updateMany(
        {
          orgId,
        },
        { $set: { 'timeRecords.$[el].timesheetId': sheetId } },
        {
          multi: true,
          arrayFilters: [
            {
              'el.startTime': { $gte: startDate },
              'el.endTime': { $lte: endDate },
              'el.timesheetId': null,
            },
          ],
        },
      );
    } catch (e) {
      this.logger.debug('approveTimeRecords =>', e.message);
      throw new Error(e.message);
    }
  }

  public async disapproveTimeRecords(orgId: string, sheetId: string) {
    try {
      await this.timeTrackerModel.updateMany(
        {
          orgId,
        },
        { $set: { 'timeRecords.$[el].timesheetId': null } },
        {
          multi: true,
          arrayFilters: [
            {
              'el.timesheetId': sheetId,
            },
          ],
        },
      );
    } catch (e) {
      this.logger.debug('disapproveTimeRecords =>', e.message);
      throw new Error(e.message);
    }
  }
}
