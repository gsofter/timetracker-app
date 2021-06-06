/* eslint-disable no-underscore-dangle */
import * as Logger from 'bunyan';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import { ITimeRecordRequest, ITimeRecord, ITimeTracker } from '@admin-layout/timetracker-core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { CommonType } from '@common-stack/core';
import { ServiceBroker } from 'moleculer';
import { TimeTrackerModelType, TimeTrackerModelFunc } from '../models/timetracker-model';

export interface ITimeRecordRepository {
  getTimeRecords(orgId: string, userId?: string): Promise<Array<ITimeRecord>>;
  getOrganizationTimeRecords(orgId: string): Promise<Array<ITimeRecord>>;
  getPlayingTimeRecord(userId: string, orgId: string): Promise<ITimeRecord>;
  createTimeRecord(userId: string, orgId: string, request: ITimeRecordRequest): Promise<Partial<ITimeTracker>>;
  updateTimeRecord(userId: string, orgId: string, recordId: string, request: ITimeRecordRequest): Promise<boolean>;
  removeTimeRecord(userId: string, orgId: string, recordId: string): Promise<boolean>;
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

@injectable()
export class TimeRecordRepository implements ITimeRecordRepository {
  private timeTrackerModel: TimeTrackerModelType;

  private logger: Logger;

  constructor(
    @inject('MongoDBConnection')
    db: mongoose.Connection,

    @inject('Logger')
    logger: Logger,

    @inject(CommonType.MOLECULER_BROKER)
    private broker: ServiceBroker,
  ) {
    this.logger = logger.child({ className: 'ScheduleRepository' });
    this.timeTrackerModel = TimeTrackerModelFunc(db);
  }

  public async getTimeRecords(orgId: string, userId?: string) {
    const orgRecords = await this.getOrganizationTimeRecords(orgId);
    return orgRecords.filter((tr) => (!userId || tr.userId === userId) && tr.endTime !== null);
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
      console.log('---RESPONSE FROM CREATE TIMER RECORD', response);
      return response;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async updateTimeRecord(userId: string, orgId: string, recordId: string, request: ITimeRecordRequest) {
    try {
      if (recordId === null || recordId === undefined) throw new Error('TimeRecord id not specified!');

      const response = await this.timeTrackerModel.update(
        { orgId, timeRecords: { $elemMatch: { _id: recordId } } },
        { $set: { 'timeRecords.$': request } },
      );
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async removeTimeRecord(userId: string, orgId: string, recordId: string) {
    try {
      const trackerDoc = await this.timeTrackerModel.find({ orgId });
      if (trackerDoc && trackerDoc.length > 0) {
        const timeRecords = trackerDoc[0].timeRecords.filter((tr) => tr.id !== recordId);
        await this.timeTrackerModel.update(
          {
            orgId,
          },
          {
            timeRecords,
          },
        );

        if (trackerDoc && trackerDoc.length > 0) {
          console.log('trackerDoc length', trackerDoc.length);
        }
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
