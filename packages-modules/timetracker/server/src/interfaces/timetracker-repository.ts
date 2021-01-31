// import { ITimeRecordCreateRequest, ITimeRecord } from '@admin-layout/timetracker-module-core'
import { ITimeRecord, ITimeRecordRequest, ITimesheetCreateRequest, ITimesheet} from '@admin-layout/timetracker-module-core'
export interface ITimeTrackerRepository {
    
    /**
     * Get TimeRecords
     */
    getTimeRecords(userId?: string): Promise<Array<ITimeRecord>>

    /**
     * Get Timesheets
     */
    getTimesheets(userId?: string): Promise<Array<ITimesheet>>

    /**
     * Get Playing TimeRecord
     */
    getPlayingTimeRecord(userId?: string): Promise<ITimeRecord>
    
    /**
     * Create a new time record
     */
    createTimeRecord(userId: string, request: ITimeRecordRequest) : Promise<string>

    /**
     * Create a new time sheet
     */
    createTimesheet(userId: string, request: ITimesheetCreateRequest) : Promise<Boolean>

    /**
     * Update a new time record
     */
    updateTimeRecord(userId: string, recordId: string, request: ITimeRecordRequest) : Promise<Boolean>

    /**
     * Update a new time record
     */
    updateTimesheet(userId: string, sheetId: string, request: ITimesheetCreateRequest) : Promise<Boolean>


    /**
     * Remove a time record
     */
    removeTimeRecord(userId: string, recordId: string) : Promise<Boolean>

    /**
     * Remove a time sheet
     */
    removeTimesheet(userId: string, sheetId: string) : Promise<Boolean>
}