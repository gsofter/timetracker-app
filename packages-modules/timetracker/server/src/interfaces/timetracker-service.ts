// import { ITimeRecordCreateRequest, ITimeRecord } from '@admin-layout/timetracker-module-core'

export interface ITimeTrackerService {
    
    /**
     * Get Timerecords
     */
    getTimeRecords(): Promise<Array<any>>
}