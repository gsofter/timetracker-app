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
  ITimesheetState,
} from '@admin-layout/timetracker-core';
import * as _ from 'lodash';

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
    const trackDoc = (await this.timeTrackerModel.aggregate([
      {
        $project: {
          orgId,
          timeRecords: {
            $filter: {
              input: '$timeRecords',
              as: 'timeRecords',
              cond: {
                $and: [
                  { $eq: ['$$timeRecords.userId', userId] },
                  { $ne: ['$$timeRecords.endTime', null] },
                ],
              },
            },
          },
        },
      },
    ]));

    // console.log('getTimeRecords.trackDoc => ', trackDoc);
    // console.log('getTimeRecords.trackDoc[0].timeRecords => ', trackDoc[0].timeRecords);
    if (trackDoc && trackDoc.length > 0 && trackDoc[0].timeRecords.length > 0) {
      const res = trackDoc[0].timeRecords
        .map(tr => {
          return {
            id: tr._id,
            userId: tr.userId,
            orgId: trackDoc[0].orgId,
            projectId: tr.projectId,
            startTime: tr.startTime,
            endTime: tr.endTime,
            isBillable: tr.isBillable,
            tags: tr.tags,
            taskId: tr.taskId,
            taskName: tr.taskName
          };
        })
        .filter(tr => tr.endTime !== null && tr.endTime);
      return res;
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
        {
          'timeRecords.userId': userId,
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
      'timesheets.userId': userId,
    });

    if (trackDoc !== null && trackDoc !== undefined && trackDoc.length > 0) {
      let timesheets = [...trackDoc[0].timesheets];
      const res = timesheets.map(sheet => {
        return {
          id: sheet.id,
          startDate: sheet.startDate,
          endDate: sheet.endDate,
          state: sheet.state,
          submittedOn: sheet.submittedOn,
          approvedOn: sheet.approvedOn,
          updatedBy: sheet.updatedBy,
          updatedOn: sheet.updatedOn,
          userId: sheet.userId,
          orgId: trackDoc[0].orgId,
        };
      });
      return res;
    } else {
      return [];
    }
  }

  public async getDurationTimesheet(
    userId: string,
    orgId: string,
    start: Date,
    end: Date,
  ): Promise<ITimesheet> {
    const trackDoc = await this.timeTrackerModel.find({
      orgId,
      $and: [
        { $eq: ['timesheets.startDate', start] },
        { $eq: ['timesheets.endDate', end] },
        {
          'timesheets.userId': userId,
        },
      ],
    });

    console.log('trackDoc   =>', trackDoc);
    console.log('timesheets =>', trackDoc[0].timesheets);

    if (trackDoc && trackDoc.length > 0)
      if (!!trackDoc[0].timesheets && trackDoc[0].timesheets.length > 0)
        return trackDoc[0].timesheets[0];
      else return null;
    return null;
  }

  public async getPlayingTimeRecord(userId: string, orgId: string): Promise<ITimeRecord> {
    const trackDoc = await this.timeTrackerModel.find({
      orgId,
      $and: [
        {
          timeRecords: { $elemMatch: { endTime: null } },
        },
        {
          timeRecords: { $elemMatch: { userId: userId } },
        },
      ],
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
      if(recordId === null || recordId === undefined)
        throw new Error('TimeRecord id not specified!')

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
  ) {
    try {
      const response = await this.timeTrackerModel.update(
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
