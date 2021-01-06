import { IScheduleCreateRequest, ISchedule } from '@admin-layout/schedule-module-core'

export interface IScheduleRepository {
    /**
     * Create a new schedule event
     */
    createSchedule(newEvent: IScheduleCreateRequest): Promise<Boolean>

    /**
     * Get schedule events
     */
    getScheduleEvents(userId: string): Promise<Array<ISchedule>>
}