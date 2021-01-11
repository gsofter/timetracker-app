import { ITimelineCreateRequest, ITimeline } from '@admin-layout/schedule-module-core'

export interface ITimelineRepository {
    /**
     * Create a new schedule event
     */
    createTimelineEvent(newEvent: ITimelineCreateRequest): Promise<Boolean>

    /**
     * Get schedule events
     */
    getTimelineEvents(userId: string): Promise<Array<ITimeline>>

    /**
     * Update a event
     */
    updateTimelineEvent(eventId: string, newEvent: ITimelineCreateRequest): Promise<Boolean>

    /**
     * remove a event
     */
    removeTimelineEvent(eventId: string)
}