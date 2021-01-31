import { ITimesheetCreateRequest, ITimesheet } from '@admin-layout/schedule-module-core'

export interface ITimesheetService {
    /**
     * Create a new schedule event
     */
    createTimesheet(newSheet: ITimesheetCreateRequest): Promise<Boolean>

    /**
     * Get schedule events
     */
    getTimesheets(userId: string): Promise<Array<ITimesheet>>

    /**
     * Update a event
     */
    updateTimesheet(sheetId: string, newSheet: ITimesheetCreateRequest): Promise<Boolean>

    /**
     * remove a event
     */
    removeTimesheet(sheetId: string)
}