import * as Logger from 'bunyan';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import { TimeTrackerModelType, TimeTrackerModelFunc } from './../models/timetracker-model';
import {
  ITimesheet,
  ITimesheetCreateRequest,
  ITimesheetState,
} from '@admin-layout/timetracker-core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { CommonType } from '@common-stack/core';
import { ServiceBroker, CallingOptions } from 'moleculer';

export interface ITimesheetRepository {
  getTimesheets(orgId: string, userId?: string): Promise<Array<ITimesheet>>;
  getOrganizationTimesheets(orgId: string): Promise<Array<ITimesheet>>;
  createTimesheet(
    userId: string,
    orgId: string,
    request: ITimesheetCreateRequest,
  ): Promise<Boolean>;
  updateTimesheet(orgId: string, sheetId: string, request: ITimesheetCreateRequest);
  updateTimesheetStatus(orgId: string, sheetId: string, state: ITimesheetState);
  removeTimesheet(userId: string, orgId: string, sheetId: string): Promise<Boolean>;
}

@injectable()
export class TimesheetRepository implements ITimesheetRepository {
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
    return timesheets.filter((sheet) => !userId || sheet.userId === userId);
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

  public async updateTimesheet(orgId: string, sheetId: string, request: ITimesheetCreateRequest) {
    try {
      const response = await this.timeTrackerModel.update(
        { orgId, timesheets: { $elemMatch: { _id: sheetId } } },
        { $set: { 'timesheets.$': request } },
      );
      return response;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async updateTimesheetStatus(orgId: string, sheetId: string, state: ITimesheetState) {
    try {
      const response = await this.timeTrackerModel.update(
        {
          orgId,
          $elemMatch: { 'timesheets.id': sheetId },
        },
        {
          $set: {
            'timesheets.$.status': state,
          },
        },
      );
      return response;
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
