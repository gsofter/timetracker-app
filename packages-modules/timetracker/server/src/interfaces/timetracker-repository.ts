// import { ITimeRecordCreateRequest, ITimeRecord } from '@admin-layout/timetracker-core'
import {
  ITimeRecord,
  ITimeRecordRequest,
  ITimesheetCreateRequest,
  ITimesheet,
  ITimesheetState,
} from '@admin-layout/timetracker-core';
export interface ITimeTrackerRepository {
  /**
   * Get TimeRecords
   */
  getTimeRecords(orgId: string, userId?: string): Promise<Array<ITimeRecord>>;

  /**
   * Get Duration TimeRecords
   */
  getDurationTimeRecords(
    orgId: string,
    startTime: Date,
    endTime: Date,
    userId?: string,
  ): Promise<Array<ITimeRecord>>;

  /**
   * Get Timesheets
   */
  getTimesheets(userId: string, orgId: string): Promise<Array<ITimesheet>>;

  /**
   * Get Timesheet for duration
   */
  getDurationTimesheets(
    userId: string,
    orgId: string,
    start: Date,
    end: Date,
  ): Promise<Array<ITimesheet>>;

  /**
   * Get Playing TimeRecord
   */
  getPlayingTimeRecord(userId: string, orgId: string): Promise<ITimeRecord>;

  /**
   * Create a new time record
   */
  createTimeRecord(userId: string, orgId: string, request: ITimeRecordRequest): Promise<string>;

  /**
   * Create a new time sheet
   */
  createTimesheet(
    userId: string,
    orgId: string,
    request: ITimesheetCreateRequest,
  ): Promise<Boolean>;

  /**
   * Update a new time record
   */
  updateTimeRecord(
    userId: string,
    orgId: string,
    recordId: string,
    request: ITimeRecordRequest,
  ): Promise<Boolean>;

  /**
   * Update a existing timesheet
   */
  updateTimesheet(
    userId: string,
    orgId: string,
    sheetId: string,
    request: ITimesheetCreateRequest,
    userContext?: any,
  ): Promise<Boolean>;

  /**
   * Update timesheet status
   */
  updateTimesheetStatus(
    userId: string,
    orgId: string,
    request: ITimesheetCreateRequest,
  ): Promise<Boolean>;

  /**
   * Remove a time record
   */
  removeTimeRecord(userId: string, orgId: string, recordId: string): Promise<Boolean>;

  /**
   * Remove duration time records
   */
  removeDurationTimeRecords(
    userId: string,
    orgId: string,
    startTime: Date,
    endTime: Date,
    projectId: string,
  ): Promise<Boolean>;

  /**
   * Remove a time sheet
   */
  removeTimesheet(userId: string, orgId: string, sheetId: string): Promise<Boolean>;
}
