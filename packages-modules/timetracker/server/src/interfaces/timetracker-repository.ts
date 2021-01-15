// import { ITimeRecordCreateRequest, ITimeRecord } from '@admin-layout/timetracker-module-core'

export interface ITimeTrackerRepository {
    
    /**
     * Get Timerecords
     */
    getTimeRecords(): Promise<Array<any>>

}