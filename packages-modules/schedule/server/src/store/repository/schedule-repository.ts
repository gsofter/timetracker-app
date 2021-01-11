import { message } from 'antd';
import { ISchedule, IScheduleCreateRequest } from '@admin-layout/schedule-module-core';
import * as Logger from 'bunyan';
import { injectable, inject, optional } from 'inversify';
import { IScheduleRepository } from './../../interfaces';
import * as mongoose from 'mongoose';
import { ScheduleModelType, ScheduleModelFunc } from './../models/schedule-model';

@injectable()
export class ScheduleRepository implements IScheduleRepository {
  private scheduleModel: ScheduleModelType;
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
    this.logger = logger.child({ className: 'ScheduleRepository' });
    this.scheduleModel = ScheduleModelFunc(db);
  }

  public async getScheduleEvents(userId: string): Promise<Array<ISchedule>> {
    if (userId === undefined) return await this.scheduleModel.find({}).exec();
    return await this.scheduleModel.find({ resourceId: userId }).exec();
  }

  public async createScheduleEvent(newEvent: IScheduleCreateRequest): Promise<boolean> {
    try {
      await this.scheduleModel.create({ ...newEvent });
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public async updateScheduleEvent(
    eventId: string,
    newEvent: IScheduleCreateRequest,
  ): Promise<boolean> {
    try {
      await this.scheduleModel.update({ _id: eventId }, { ...newEvent });
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public async removeScheduleEvent(
    eventId: string,
  ): Promise<boolean> {
    try {
      await this.scheduleModel.remove({ _id: eventId });
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
