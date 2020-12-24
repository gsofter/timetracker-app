import { IScheduleCreateRequest, ISchedule } from './generated-models'

export interface IScheduleService {
    /**
     * Create a new schedule event
     */
    createSchedule(newEvent: IScheduleCreateRequest): Promise<Boolean>

    /**
     * Get schedule events
     */
    getScheduleEvents(userId: string): Promise<Array<ISchedule>>
}