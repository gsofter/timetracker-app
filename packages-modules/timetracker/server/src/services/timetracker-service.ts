import * as ILogger from 'bunyan';
import { inject, injectable } from 'inversify';
import {
  ITimeRecord,
  ITimeRecordRequest,
  ITimesheet,
  ITimesheetState,
  ITimesheetCreateRequest,
} from '@admin-layout/timetracker-core';
import {
  ConfigurationTarget,
  generateOrgUri,
  IConfigFragmentName,
  ServerTypes,
  IPreferencesService,
  IMailServiceAction,
  IMailerServicesendArgs,
  IMoleculerServiceName,
} from '@adminide-stack/core';
import { TYPES } from '../constants';
import * as moment from 'moment';
import { ITimeTrackerRepository } from '../store/repository/timetracker-repository';
import { EmailTemplateCodes } from '../constants';
import { config } from '../config';
import { ServiceBroker, CallingOptions } from 'moleculer';
import { CommonType } from '@common-stack/core';
export interface ITimeTrackerService {
  getTimeRecords(orgId: string, userId?: string): Promise<Array<ITimeRecord>>;
  getDurationTimeRecords(
    orgId: string,
    startTime: Date,
    endTime: Date,
    userId?: string,
  ): Promise<Array<ITimeRecord>>;
  getTimesheets(orgId: string): Promise<Array<ITimesheet>>;
  getTimesheetsWithTotalHours(orgId: string, userId?: string): Promise<Array<ITimesheet>>;
  getDurationTimesheets(orgId: string, start: Date, end: Date): Promise<Array<ITimesheet>>;
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
export class TimeTrackerService implements ITimeTrackerService {
  private logger: ILogger;
  constructor(
    @inject(TYPES.ITimeTrackerRepository)
    protected trackerRepository: ITimeTrackerRepository,

    @inject(ServerTypes.IPreferenceEditorService)
    private preferencesService: IPreferencesService,

    @inject(CommonType.MOLECULER_BROKER)
    private broker: ServiceBroker,

    @inject('Logger')
    logger: ILogger,
  ) {
    this.logger = logger;
  }

  public checkInPeriod(t: Date, A: Date, B: Date): boolean {
    if (moment(A) < moment(B)) return moment(t) >= moment(A) && moment(t) <= moment(B);
    else return moment(t) >= moment(B) && moment(t) <= moment(A);
  }

  public async getTimeRecords(orgId: string, userId: string) {
    return this.trackerRepository.getTimeRecords(orgId, userId);
  }

  public async getDurationTimeRecords(
    orgId: string,
    startTime: Date,
    endTime: Date,
    userId?: string,
  ): Promise<Array<ITimeRecord>> {
    const timeRecords = await this.trackerRepository.getTimeRecords(orgId, userId);
    const timesheets = await this.trackerRepository.getTimesheets(orgId);
    const durationRecords = timeRecords.filter(
      r =>
        (!userId || r.userId === userId) &&
        moment(startTime) <= moment(r.startTime) &&
        moment(r.endTime) <= moment(endTime) &&
        r.endTime !== null,
    );

    const filteredSheets = timesheets.filter(
      sh =>
        ((!userId || sh.userId === userId) &&
          this.checkInPeriod(startTime, sh.startDate, sh.endDate)) ||
        this.checkInPeriod(endTime, sh.startDate, sh.endDate),
    );

    return durationRecords.map(tr => {
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
  }

  public async getTimesheets(orgId: string, userId?: string) {
    return await this.trackerRepository.getTimesheets(orgId, userId);
  }

  public async getTimesheetsWithTotalHours(orgId: string, userId?: string) {
    const timesheets = await this.trackerRepository.getTimesheets(orgId, userId);
    const timeRecords = await this.trackerRepository.getTimeRecords(orgId, userId);
    return timesheets.map(timesheet => {
      let sheetTotalDuration = timeRecords
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
  }

  public async getDurationTimesheets(orgId: string, start: Date, end: Date) {
    const timesheets = await this.trackerRepository.getOrganizationTimesheets(orgId);
    return timesheets.filter(
      sh => moment(start) === moment(sh.startDate) && moment(end) === moment(sh.endDate),
    );
  }

  public async getPlayingTimeRecord(userId: string, orgId: string): Promise<ITimeRecord> {
    return this.trackerRepository.getPlayingTimeRecord(userId, orgId);
  }

  public async createTimeRecord(userId: string, orgId: string, request: ITimeRecordRequest) {
    return this.trackerRepository.createTimeRecord(userId, orgId, request);
  }

  public async createTimesheet(userId: string, orgId: string, request: ITimesheetCreateRequest) {
    return this.trackerRepository.createTimesheet(userId, orgId, request);
  }

  public async updateTimeRecord(
    userId: string,
    orgId: string,
    recordId: string,
    request: ITimeRecordRequest,
  ) {
    return this.trackerRepository.updateTimeRecord(userId, orgId, recordId, request);
  }

  public async updateTimesheet(
    userId: string,
    orgId: string,
    sheetId: string,
    request: ITimesheetCreateRequest,
    userContext?: any,
  ) {
    try {
      await this.trackerRepository.updateTimesheet(userId, orgId, sheetId, request, userContext);

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

  public async updateTimesheetStatus(
    userId: string,
    orgId: string,
    request: ITimesheetCreateRequest,
  ) {
    return this.trackerRepository.updateTimesheetStatus(userId, orgId, request);
  }

  public async removeTimeRecord(userId: string, orgId: string, recordId: string) {
    return this.trackerRepository.removeTimeRecord(userId, orgId, recordId);
  }

  public async removeDurationTimeRecords(
    userId: string,
    orgId: string,
    startTime: Date,
    endTime: Date,
    projectId: string,
  ) {
    return this.trackerRepository.removeDurationTimeRecords(
      userId,
      orgId,
      startTime,
      endTime,
      projectId,
    );
  }

  public async removeTimesheet(userId: string, orgId: string, sheetId: string) {
    return this.trackerRepository.removeTimesheet(userId, orgId, sheetId);
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
