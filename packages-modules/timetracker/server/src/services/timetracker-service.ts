import * as ILogger from 'bunyan';

import { inject, injectable } from 'inversify';
import { ITimeTrackerService, ITimeTrackerRepository } from '../interfaces';
import {
  ITimeRecord,
  ITimeRecordRequest,
  ITimesheet,
  ITimesheetCreateRequest,
  ITimesheetState,
} from '@admin-layout/timetracker-core';
import { TYPES, DEFAULT_USER } from '../constants';
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
    userId: string,
    orgId: string,
    startTime: Date,
    endTime: Date,
  ): Promise<Array<ITimeRecord>> {
    return this.trackerRepository.getDurationTimeRecords(userId, orgId, startTime, endTime);
  }

  public async getTimesheets(userId: string, orgId: string): Promise<Array<ITimesheet>> {
    return this.trackerRepository.getTimesheets(userId, orgId);
  }

  public async getDurationTimesheet(
    userId: string,
    orgId: string,
    start: Date,
    end: Date,
  ): Promise<ITimesheet> {
    return this.trackerRepository.getDurationTimesheet(userId, orgId, start, end);
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
