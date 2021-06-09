/* eslint-disable import/no-extraneous-dependencies */
import { message } from 'antd';
import { ITimesheet, ITimesheetCreateRequest } from '@admin-layout/timetracker-core';
import * as Logger from 'bunyan';
import { injectable, inject, optional } from 'inversify';
import * as mongoose from 'mongoose';
import { ITimesheetRepository } from '../../interfaces';
import { TimesheetModelType, TimesheetModelFunc } from '../models';

@injectable()
export class TimesheetRepository implements ITimesheetRepository {
    private timesheetModel: TimesheetModelType;

    private logger: Logger;

    constructor(
        @inject('MongoDBConnection')
        db: mongoose.Connection,

        @inject('Logger')
        logger: Logger,

        @inject('MongoOptions')
        @optional()
        options?: any,
    ) {
        this.logger = logger.child({ className: 'TimesheetRepository' });
        this.timesheetModel = TimesheetModelFunc(db);
    }

    public async getTimesheetEvents(userId: string): Promise<Array<ITimesheet>> {
        if (userId === undefined) return await this.timesheetModel.find({}).exec();
        return await this.timesheetModel.find({ resourceId: userId }).exec();
    }

    public async createTimesheetEvent(newEvent: ITimesheetCreateRequest): Promise<boolean> {
        try {
            await this.timesheetModel.create({ ...newEvent });
            return true;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async updateTimesheetEvent(eventId: string, newEvent: ITimesheetCreateRequest): Promise<boolean> {
        try {
            await this.timesheetModel.update({ _id: eventId }, { ...newEvent });
            return true;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async removeTimesheetEvent(eventId: string): Promise<boolean> {
        try {
            await this.timesheetModel.remove({ _id: eventId });
            return true;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}
