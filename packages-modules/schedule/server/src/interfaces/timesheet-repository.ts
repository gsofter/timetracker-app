/* eslint-disable import/no-extraneous-dependencies */
import { ITimesheetCreateRequest, ITimesheet } from '@admin-layout/timetracker-core';

export interface ITimesheetRepository {
    /**
     * Create a new schedule event
     */
    createTimesheetEvent(newEvent: ITimesheetCreateRequest): Promise<boolean>;

    /**
     * Get schedule events
     */
    getTimesheetEvents(userId: string): Promise<Array<ITimesheet>>;

    /**
     * Update a event
     */
    updateTimesheetEvent(eventId: string, newEvent: ITimesheetCreateRequest): Promise<boolean>;

    /**
     * remove a event
     */
    removeTimesheetEvent(eventId: string);
}
