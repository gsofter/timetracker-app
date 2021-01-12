import { ITimesheetCreateRequest, ITimesheet } from '@admin-layout/schedule-module-core'

export interface ITimesheetService {
    /**
     * Create a new schedule event
     */
    createTimesheetEvent(newEvent: ITimesheetCreateRequest): Promise<Boolean>

    /**
     * Get schedule events
     */
    getTimesheetEvents(userId: string): Promise<Array<ITimesheet>>

    /**
     * Update a event
     */
    updateTimesheetEvent(eventId: string, newEvent: ITimesheetCreateRequest): Promise<Boolean>

    /**
     * remove a event
     */
    removeTimesheetEvent(eventId: string)
}