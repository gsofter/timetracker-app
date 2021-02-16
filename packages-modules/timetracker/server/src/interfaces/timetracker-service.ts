import { ITimeRecord, ITimeRecordRequest, ITimesheetCreateRequest, ITimesheet, ITimesheetState } from '@admin-layout/timetracker-module-core'
export interface ITimeTrackerService {
    
    /**
     * Get TimeRecords
     */
    getTimeRecords(userId: string, orgId: string): Promise<Array<ITimeRecord>>

    /**
     * Get Duration TimeRecords
     */
    getDurationTimeRecords(userId: string, orgId: string, startTime: Date, endTime: Date): Promise<Array<ITimeRecord>>

    /**
     * Get Timesheets
     */
    getTimesheets(userId: string, orgId: string): Promise<Array<ITimesheet>>

    /**
     * Get Playing TimeRecord
     */
    getPlayingTimeRecord(userId: string, orgId: string): Promise<ITimeRecord>
    
    /**
     * Create a new time record
     */
    createTimeRecord(userId: string, orgId: string, request: ITimeRecordRequest) : Promise<string>

    /**
     * Create a new time sheet
     */
    createTimesheet(userId: string, orgId: string, request: ITimesheetCreateRequest) : Promise<Boolean>

    /**
     * Update a new time record
     */
    updateTimeRecord(userId: string, orgId: string, recordId: string, request: ITimeRecordRequest) : Promise<Boolean>

    /**
     * Update a new time record
     */
    updateTimesheet(userId: string, orgId: string, sheetId: string, request: ITimesheetCreateRequest) : Promise<Boolean>

     /**
     * Update timesheet status
     */
    updateTimesheetStatus(userId: string, orgId: string, request: ITimesheetCreateRequest) : Promise<Boolean>

    /**
     * Remove a time record
     */
    removeTimeRecord(userId: string, orgId: string, recordId: string) : Promise<Boolean>

    /**
     * Remove duration time records
     */
    removeDurationTimeRecords(userId: string, orgId: string, startTime: Date, endTime: Date, projectId: string) : Promise<Boolean>

    /**
     * Remove a time sheet
     */
    removeTimesheet(userId: string, orgId: string, sheetId: string) : Promise<Boolean>
}