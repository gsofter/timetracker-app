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
} from '@admin-layout/timetracker-core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { CommonType } from '@common-stack/core';
import { ServiceBroker, CallingOptions } from 'moleculer';
import {
  IMailerServicesendArgs,
  IMailServiceAction,
  IMoleculerServiceName,
} from '@adminide-stack/core';
import { EmailTemplateCodes } from '../../constants';
import { config } from '../../config';
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

  public async getTimeRecords(userId: string, orgId: string): Promise<Array<ITimeRecord>> {
    const trackDoc = await this.timeTrackerModel.findOne({ orgId });

    if (trackDoc) {
      let res;
      if (trackDoc.timeRecords)
        res = trackDoc.timeRecords.filter(tr => tr.userId === userId && tr.endTime !== null);
      return res;
    } else return null;
  }

  public async getDurationTimeRecords(
    userId: string,
    orgId: string,
    startTime: Date,
    endTime: Date,
  ): Promise<Array<ITimeRecord>> {
    const trackDoc = await this.timeTrackerModel.findOne({ orgId });

    if (trackDoc && trackDoc.timeRecords) {
      return trackDoc.timeRecords.filter(
        r =>
          r.userId === userId &&
          moment(startTime) <= moment(r.startTime) &&
          moment(r.endTime) <= moment(endTime) &&
          r.endTime !== null,
      );
    } else {
      return [];
    }
  }

  public async getTimesheets(userId: string, orgId: string): Promise<Array<ITimesheet>> {
    const trackDoc = await this.timeTrackerModel.findOne({ orgId });
    if (trackDoc && trackDoc.timesheets) {
      return trackDoc.timesheets;
      // return trackDoc.timesheets.filter(sh => sh.userId === userId);
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
    const trackDoc = await this.timeTrackerModel.findOne({ orgId });
    if (trackDoc && trackDoc.timesheets) {
      return trackDoc.timesheets.find(
        sh =>
          //sh.userId === userId &&
          moment(start).format('YYYY-MM-DD') === moment(sh.startDate).format('YYYY-MM-DD') &&
          moment(end).format('YYYY-MM-DD') === moment(sh.endDate).format('YYYY-MM-DD'),
      );
    } else {
      return null;
    }
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
      const response = await this.timeTrackerModel.update(
        { orgId: orgId, timesheets: { $elemMatch: { _id: sheetId } } },
        { $set: { 'timesheets.$': request } },
      );
      const mailTopic = 'Timsheet approved';
      const mailTo = userContext.emailId;
      const mailFrom = config.MAIL_SEND_DEFAULT_EMAIL;
      const templateVars = {
        name: userContext.username,
        startDate: moment(request.startDate).format('YYYY-MM-DD'),
        endDate: moment(request.endDate).format('YYYY-MM-DD'),
        timesheet_url: `${config.CLIENT_URL}/${orgId}/time-tracker/timeapproval`,
        contact_url: `${config.CLIENT_URL}`,
      };
      this.sendMail(mailTopic, mailTo, mailFrom, templateVars);
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

  private sendMail(topic, to, from, templateVars) {
    return this.callAction<void, IMailerServicesendArgs>(
      IMailServiceAction.send,
      {
        request: {
          topic,
          to,
          templateId: EmailTemplateCodes.TIMESHEET_APPROVAL,
          from,
          variables: templateVars,
        },
      },
      IMoleculerServiceName.MailService,
    );
  }

  private async callAction<T, P = any>(
    command: string,
    params?: P,
    topic?: string,
    opts?: CallingOptions,
  ) {
    return this.broker.call<T, P>(`${topic}.${command}`, params, opts);
  }
}
