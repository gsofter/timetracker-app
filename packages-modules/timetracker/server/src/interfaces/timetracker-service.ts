import { ITimeRecord, ITimeRecordRequest } from '@admin-layout/timetracker-module-core'
export interface ITimeTrackerService {
    
    /**
     * Get Timerecords
     */
    getTimeRecords(): Promise<Array<ITimeRecord>>

    /**
     * Get Playing TimeRecord
     */
    getPlayingTimeRecord(): Promise<ITimeRecord>

    /**
     * Create a new time record
     */
    createTimeRecord(request: ITimeRecordRequest): Promise<string>

    /**
     * Update a existing time record
     */
    updateTimeRecord(recordId: string, request: ITimeRecordRequest): Promise<Boolean>

    /**
     * Remove time record
     */
    removeTimeRecord(recordId: string): Promise<Boolean>
}