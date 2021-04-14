import * as Logger from 'bunyan';
import { injectable, inject } from 'inversify';
import { ITimeTrackerRepository } from './../../interfaces';
import * as mongoose from 'mongoose';
import { TimeTrackerModelType, TimeTrackerModelFunc } from './../models/timetracker-model';
import {
  ITimeRecordRequest,
  ITimeRecord,
  ITimesheet,
  ITimesheetCreateRequest,
  ITimesheetState,
} from '@admin-layout/timetracker-core';
import {
  IPreferencesService,
  ServerTypes as TYPES,
  ConfigurationTarget,
  generateOrgUri,
  IConfigFragmentName,
} from '@adminide-stack/core';
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
    @inject(TYPES.IPreferenceEditorService)
    private preferencesService: IPreferencesService,
  ) {
    this.logger = logger.child({ className: 'ScheduleRepository' });
    this.timeTrackerModel = TimeTrackerModelFunc(db);
  }

  public async getTimeRecords(orgId: string, userId?: string): Promise<Array<ITimeRecord>> {
    const trackDoc = await this.timeTrackerModel.findOne({ orgId });

    if (trackDoc && trackDoc.timeRecords) {
      return userId === undefined || userId === null
        ? trackDoc.timeRecords.filter(tr => tr.endTime !== null)
        : trackDoc.timeRecords.filter(tr => tr.userId === userId && tr.endTime !== null);
    } else return null;
  }

  public checkInPeriod(t: Date, A: Date, B: Date): boolean {
    if (moment(A) < moment(B)) return moment(t) >= moment(A) && moment(t) <= moment(B);
    else return moment(t) >= moment(B) && moment(t) <= moment(A);
  }

  public async getDurationTimeRecords(
    orgId: string,
    startTime: Date,
    endTime: Date,
    userId?: string,
  ): Promise<Array<ITimeRecord>> {
    const trackDoc = await this.timeTrackerModel.findOne({ orgId });

    if (trackDoc && trackDoc.timeRecords) {
      const filteredRecords = trackDoc.timeRecords.filter(
        r =>
          (!userId || r.userId === userId) &&
          moment(startTime) <= moment(r.startTime) &&
          moment(r.endTime) <= moment(endTime) &&
          r.endTime !== null,
      );

      const filteredSheets = trackDoc.timesheets.filter(
        sh =>
          ((!userId || sh.userId === userId) &&
            this.checkInPeriod(startTime, sh.startDate, sh.endDate)) ||
          this.checkInPeriod(endTime, sh.startDate, sh.endDate),
      );
      return filteredRecords.map(tr => {
        let trEditable = false;
        for (let sh of filteredSheets) {
          if (
            this.checkInPeriod(tr.startTime, sh.startDate, sh.endDate) &&
            this.checkInPeriod(tr.endTime, sh.startDate, sh.endDate)
          ) {
            trEditable = true;
            break;
          }
        }
        return {
          id: tr.id,
          startTime: tr.startTime,
          endTime: tr.endTime,
          taskName: tr.taskName,
          tags: tr.tags,
          projectId: tr.projectId,
          isBillable: tr.isBillable,
          userId: tr.userId,
          editable: trEditable,
        };
      });
    } else {
      return [];
    }
  }

  public async getTimesheets(userId: string, orgId: string): Promise<Array<ITimesheet>> {
    const trackDoc = await this.timeTrackerModel.findOne({ orgId });
    if (trackDoc && trackDoc.timesheets) {
      return trackDoc.timesheets.map(timesheet => {
        let sheetTotalDuration = 0;
        if (trackDoc.timeRecords)
          sheetTotalDuration = trackDoc.timeRecords
            .filter(tr => {
              return (
                tr.userId === timesheet.userId &&
                tr.startTime > timesheet.startDate &&
                tr.endTime < timesheet.endDate
              );
            })
            .reduce(
              (duration, tr) =>
                duration +
                Math.floor((moment(tr.endTime).valueOf() - moment(tr.startTime).valueOf()) / 1000),
              0,
            );
        return {
          id: timesheet.id,
          startDate: timesheet.startDate,
          endDate: timesheet.endDate,
          state: timesheet.state,
          userId: timesheet.userId,
          orgId,
          approvedBy: timesheet.approvedBy,
          approvedOn: timesheet.approvedOn,
          updatedBy: timesheet.updatedBy,
          updatedOn: timesheet.updatedOn,
          totalDuration: sheetTotalDuration,
        };
      });
      // return trackDoc.timesheets.filter(sh => sh.userId === userId);
    } else {
      return [];
    }
  }

  public async getDurationTimesheets(
    userId: string,
    orgId: string,
    start: Date,
    end: Date,
  ): Promise<Array<ITimesheet>> {
    const trackDoc = await this.timeTrackerModel.findOne({ orgId });
    if (trackDoc && trackDoc.timesheets) {
      return trackDoc.timesheets.filter(
        sh =>
          //sh.userId === userId &&
          moment(start).format('YYYY-MM-DD') === moment(sh.startDate).format('YYYY-MM-DD') &&
          moment(end).format('YYYY-MM-DD') === moment(sh.endDate).format('YYYY-MM-DD'),
      );
    } else {
      return [];
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

      const resourceUri = generateOrgUri(orgId, IConfigFragmentName.settings);
      const { settings } = (await this.preferencesService.viewerSettings({
        target: ConfigurationTarget.ORGANIZATION_RESOURCE,
        settingsResource: resourceUri,
      })) as any;
      if (
        request.state === ITimesheetState.APPROVED &&
        settings.timetracker.notifications.approvalNotifications &&
        settings.timetracker.notifications.enableTimetrackerNotifications
      ) {
        const mailTopic = 'Timsheet approved';
        const mailTo = userContext.emailId;
        const mailFrom = config.MAIL_SEND_DEFAULT_EMAIL;
        const templateId = EmailTemplateCodes.TIMESHEET_APPROVAL;
        const templateVars = {
          name: userContext.username,
          startDate: moment(request.startDate).format('YYYY-MM-DD'),
          endDate: moment(request.endDate).format('YYYY-MM-DD'),
          timesheet_url: `${config.CLIENT_URL}/${orgId}/time-tracker/timeapproval`,
          contact_url: `${config.CLIENT_URL}`,
        };
        this.sendMail(mailTopic, mailTo, mailFrom, templateId, templateVars);
      }
      if (
        request.state === ITimesheetState.SUBMITTED &&
        settings.timetracker.notifications.submitNotifications &&
        settings.timetracker.notifications.enableTimetrackerNotifications
      ) {
        const mailTopic = 'Timsheet submitted';
        const mailTo = userContext.emailId;
        const mailFrom = config.MAIL_SEND_DEFAULT_EMAIL;
        const templateId = EmailTemplateCodes.SUBMIT_TIME;
        const templateVars = {
          name: userContext.username,
          startDate: moment(request.startDate).format('YYYY-MM-DD'),
          endDate: moment(request.endDate).format('YYYY-MM-DD'),
          timesheet_url: `${config.CLIENT_URL}/${orgId}/time-tracker/timeapproval`,
          contact_url: `${config.CLIENT_URL}`,
        };
        this.sendMail(mailTopic, mailTo, mailFrom, templateId, templateVars);
      }
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

  private sendMail(topic, to, from, templateId, templateVars) {
    return this.callAction<void, IMailerServicesendArgs>(
      IMailServiceAction.send,
      {
        request: {
          topic,
          to,
          templateId,
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
