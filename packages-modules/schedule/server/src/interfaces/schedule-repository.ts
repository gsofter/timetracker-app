import { IScheduleCreateRequest, ISchedule } from '@admin-layout/schedule-module-core'

export interface IScheduleRepository {
    /**
     * Create a new schedule event
     */
    createScheduleEvent(newEvent: IScheduleCreateRequest): Promise<Boolean>

    /**
     * Get schedule events
     */
    getScheduleEvents(userId: string): Promise<Array<ISchedule>>

    /**
     * Update a event
     */
    updateScheduleEvent(eventId: string, newEvent: IScheduleCreateRequest): Promise<Boolean>

    /**
     * remove a event
     */
    removeScheduleEvent(eventId: string)
}