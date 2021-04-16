import * as ILogger from 'bunyan';
import { inject, injectable } from 'inversify';
import {
  ITimeRecord,
  ITimeRecordRequest,
  ITimesheet,
  ITimesheetCreateRequest,
} from '@admin-layout/timetracker-core';
import { TYPES } from '../constants';
import * as moment from 'moment';
import { ITimeTrackerRepository } from '../store/repository/timetracker-repository';

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

    @inject('Logger')
    logger: ILogger,
  ) {
    this.logger = logger;
  }

  public async getTimeRecords(userId: string, orgId: string): Promise<Array<ITimeRecord>> {
    return this.trackerRepository.getTimeRecords(userId, orgId);
  }

  public async getDurationTimeRecords(
    orgId: string,
    startTime: Date,
    endTime: Date,
    userId?: string,
  ): Promise<Array<ITimeRecord>> {
    return this.trackerRepository.getDurationTimeRecords(orgId, startTime, endTime, userId);
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
    return this.trackerRepository.updateTimesheet(userId, orgId, sheetId, request, userContext);
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
}
