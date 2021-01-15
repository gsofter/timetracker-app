// import { ITimeRecordCreateRequest, ITimeRecord } from '@admin-layout/timetracker-module-core'
import { ITimeRecord, ITimeRecordRequest} from '@admin-layout/timetracker-module-core'
export interface ITimeTrackerRepository {
    
    /**
     * Get Timerecords
     */
    getTimeRecords(): Promise<Array<any>>

    /**
     * Create a new time record
     */
    createTimeRecord(request: ITimeRecordRequest) : Promise<Boolean>

    /**
     * Update a new time record
     */
    updateTimeRecord(recordId: string, request: ITimeRecordRequest) : Promise<Boolean>


    /**
     * Remove a time record
     */
    removeTimeRecord(recordId: string) : Promise<Boolean>
}