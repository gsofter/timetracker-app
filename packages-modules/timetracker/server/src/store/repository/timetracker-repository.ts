import * as Logger from 'bunyan';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import { TimeTrackerModelType, TimeTrackerModelFunc } from './../models/timetracker-model';
import {
  ITimeRecordRequest,
  ITimeRecord,
  ITimesheet,
  ITimesheetCreateRequest,
} from '@admin-layout/timetracker-core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { CommonType } from '@common-stack/core';
import { ServiceBroker, CallingOptions } from 'moleculer';

export interface ITimeTrackerRepository {
  getTimeRecords(orgId: string, userId?: string): Promise<Array<ITimeRecord>>;
  getOrganizationTimeRecords(orgId: string): Promise<Array<ITimeRecord>>;
  getTimesheets(orgId: string, userId?: string): Promise<Array<ITimesheet>>;
  getOrganizationTimesheets(orgId: string): Promise<Array<ITimesheet>>;
  getPlayingTimeRecord(userId: string, orgId: string): Promise<ITimeRecord>;
  createTimeRecord(userId: string, orgId: string, request: ITimeRecordRequest): Promise<string>;
  createTimesheet(
    userId: string,
    orgId: string,
    request: ITimesheetCreateRequest,
  ): Promise<Boolean>;
  updateTimeRecord(
    userId: string,
    orgId: string,
    recordId: string,
    request: ITimeRecordRequest,
  ): Promise<Boolean>;
  updateTimesheet(
    userId: string,
    orgId: string,
    sheetId: string,
    request: ITimesheetCreateRequest,
    userContext?: any,
  ): Promise<Boolean>;
  updateTimesheetStatus(
    userId: string,
    orgId: string,
    request: ITimesheetCreateRequest,
  ): Promise<Boolean>;
  removeTimeRecord(userId: string, orgId: string, recordId: string): Promise<Boolean>;
  removeDurationTimeRecords(
    userId: string,
    orgId: string,
    startTime: Date,
    endTime: Date,
    projectId: string,
  ): Promise<Boolean>;
  removeTimesheet(userId: string, orgId: string, sheetId: string): Promise<Boolean>;
}

@injectable()
export class TimeTrackerRepository implements ITimeTrackerRepository {
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
    return orgRecords.filter(tr => (!userId || tr.userId === userId) && tr.endTime !== null);
  }

  public async getOrganizationTimeRecords(orgId: string) {
    const trackDoc = await this.timeTrackerModel.findOne({ orgId });
    if (trackDoc && trackDoc.timeRecords) {
      return trackDoc.timeRecords;
    } else return [];
  }

  public checkInPeriod(t: Date, A: Date, B: Date): boolean {
    if (moment(A) < moment(B)) return moment(t) >= moment(A) && moment(t) <= moment(B);
    else return moment(t) >= moment(B) && moment(t) <= moment(A);
  }

  public async getOrganizationTimesheets(orgId: string) {
    const trackDoc = await this.timeTrackerModel.findOne({ orgId });
    if (trackDoc && trackDoc.timesheets) {
      return trackDoc.timesheets;
    } else {
      return [];
    }
  }

  public async getTimesheets(orgId: string, userId?: string) {
    const timesheets = await this.getOrganizationTimesheets(orgId);
    return timesheets.filter(sheet => !userId || sheet.userId === userId);
  }

  public async getPlayingTimeRecord(userId: string, orgId: string): Promise<ITimeRecord> {
    const trackDoc = await this.timeTrackerModel.findOne({ orgId });

    if (trackDoc) {
      let res;
      if (trackDoc.timeRecords)
        res = trackDoc.timeRecords.find(tr => tr.userId === userId && tr.endTime === null);
      return res;
    } else return null;
  }

  public async createTimeRecord(userId: string, orgId: string, request: ITimeRecordRequest) {
    try {
      const response = await this.timeTrackerModel.update(
        { orgId: orgId },
        { orgId: orgId, $push: { timeRecords: request } },
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
        { orgId: orgId },
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
      if (recordId === null || recordId === undefined)
        throw new Error('TimeRecord id not specified!');

      const response = await this.timeTrackerModel.update(
        { orgId: orgId, timeRecords: { $elemMatch: { _id: recordId } } },
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
    userContext?: any,
  ) {
    try {
      await this.timeTrackerModel.update(
        { orgId: orgId, timesheets: { $elemMatch: { _id: sheetId } } },
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
      const response = await this.timeTrackerModel.update(
        {
          orgId,
          $and: [
            {
              $elemMatch: { 'timesheets.startDate': new Date(request.startDate.toISOString()) },
            },
            {
              $elemMatch: { 'timesheets.endDate': new Date(request.endDate.toISOString()) },
            },
            {
              $elemMatch: { 'timesheets.userId': userId },
            },
          ],
        },
        {
          $set: {
            'timesheets.$': request,
          },
        },
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
        const timeRecords = trackerDoc[0].timeRecords.filter(tr => tr.id !== recordId);
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
          tr => tr.startTime < startTime || tr.startTime > endTime || tr.projectId !== projectId,
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

  public async removeTimesheet(userId: string, orgId: string, sheetId: string) {
    try {
      await this.timeTrackerModel.update(
        {
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
