/* eslint-disable class-methods-use-this */
import * as ILogger from 'bunyan';
import { inject, injectable, tagged } from 'inversify';
import { ITimesheet, ITimesheetState, ITimesheetCreateRequest } from '@admin-layout/timetracker-core';
import {
  ConfigurationTarget,
  generateOrgUri,
  IConfigFragmentName,
  ServerTypes,
  IPreferencesService,
} from '@adminide-stack/core';
import { IMailServiceAction, IMailerServicesendArgs, IMoleculerServiceName } from '@container-stack/mailing-api';
import * as moment from 'moment';
import { ServiceBroker, CallingOptions } from 'moleculer';
import { CommonType, TaggedType } from '@common-stack/core';
import { TYPES, EmailTemplateCodes } from '../constants';
import { ITimeRecordRepository, ITimesheetRepository } from '../store/repository';

import { config } from '../config';

export interface ITimesheetService {
  getTimesheets(orgId: string): Promise<Array<ITimesheet>>;
  getTimesheetsWithTotalHours(orgId: string, userId?: string): Promise<Array<ITimesheet>>;
  getDurationTimesheets(orgId: string, start: Date, end: Date): Promise<Array<ITimesheet>>;
  createTimesheet(userId: string, orgId: string, request: ITimesheetCreateRequest): Promise<boolean>;
  updateTimesheet(
    userId: string,
    orgId: string,
    sheetId: string,
    request: ITimesheetCreateRequest,
    userContext?: any,
  ): Promise<boolean>;
  updateTimesheetStatus(orgId: string, sheetId: string, state: ITimesheetState): Promise<boolean>;
  removeTimesheet(userId: string, orgId: string, sheetId: string): Promise<boolean>;
}

@injectable()
export class TimesheetService implements ITimesheetService {
  private logger: ILogger;

  constructor(
    @inject(TYPES.ITimesheetRepository)
    protected timesheetRepository: ITimesheetRepository,

    @inject(TYPES.ITimeRecordRepository)
    protected timeRecordRepository: ITimeRecordRepository,

    @inject(TYPES.ITimeRecordService)
    protected timeRecordService: ITimeRecordRepository,

    @inject(ServerTypes.IPreferenceEditorService)
    private preferencesService: IPreferencesService,

    @inject(CommonType.MOLECULER_BROKER)
    private broker: ServiceBroker,

    @inject('Settings')
    @tagged(TaggedType.MICROSERVICE, true)
    private settings: any,
    @inject('Logger')
    logger: ILogger,
  ) {
    this.logger = logger;
  }

  public async getTimesheets(orgId: string, userId?: string) {
    return this.timesheetRepository.getTimesheets(orgId, userId);
  }

  public async getTimesheetsWithTotalHours(orgId: string, userId?: string) {
    const timesheets = await this.timesheetRepository.getTimesheets(orgId, userId);
    const timeRecords = await this.timeRecordRepository.getTimeRecords(orgId, userId);
    return timesheets.map((timesheet) => {
      const sheetTotalDuration = timeRecords
        .filter(
          (tr) =>
            tr.userId === timesheet.userId && tr.startTime > timesheet.startDate && tr.endTime < timesheet.endDate,
        )
        .reduce(
          (duration, tr) =>
            duration + Math.floor((moment(tr.endTime).valueOf() - moment(tr.startTime).valueOf()) / 1000),
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
        submittedOn: timesheet.submittedOn,
        updatedBy: timesheet.updatedBy,
        updatedOn: timesheet.updatedOn,
        totalDuration: sheetTotalDuration,
      };
    });
  }

  public async getDurationTimesheets(orgId: string, start: Date, end: Date) {
    const timesheets = await this.timesheetRepository.getOrganizationTimesheets(orgId);
    return timesheets.filter(
      (sh) =>
        moment(start).format('YYYY-MM-DD') === moment(sh.startDate).format('YYYY-MM-DD') &&
        moment(end).format('YYYY-MM-DD') === moment(sh.endDate).format('YYYY-MM-DD'),
    );
  }

  public async createTimesheet(userId: string, orgId: string, request: ITimesheetCreateRequest) {
    return this.timesheetRepository.createTimesheet(userId, orgId, request);
  }

  public async updateTimesheet(
    userId: string,
    orgId: string,
    sheetId: string,
    request: ITimesheetCreateRequest,
    userContext?: any,
  ) {
    try {
      await this.timesheetRepository.updateTimesheet(orgId, sheetId, request);
      if (request.state === ITimesheetState.APPROVED) {
        // approve time records from startDate to endDate
        this.timeRecordService.approveTimeRecords(orgId, sheetId, request.startDate, request.endDate);
      } else if (request.state === ITimesheetState.DENYED) {
        // approve time records from startDate to endDate
        this.timeRecordService.disapproveTimeRecords(orgId, sheetId);
      }
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

        return true;
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public async updateTimesheetStatus(orgId: string, sheetId: string, state: ITimesheetState) {
    try {
      const timesheet = await this.timesheetRepository.updateTimesheetStatus(orgId, sheetId, state);
      console.log('updateTimesheetStatus.timesheet =>', timesheet);
      if (state === ITimesheetState.APPROVED) {
        // approve time records from startDate to endDate
        console.log('APPROVED');
      }

      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public async removeTimesheet(userId: string, orgId: string, sheetId: string) {
    return this.timesheetRepository.removeTimesheet(userId, orgId, sheetId);
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

  private async callAction<T, P = any>(command: string, params?: P, topic?: string, opts?: CallingOptions) {
    return this.broker.call<T, P>(`${topic}.${command}@${this.settings.adminApiNamespace}`, params, opts);
  }
}
