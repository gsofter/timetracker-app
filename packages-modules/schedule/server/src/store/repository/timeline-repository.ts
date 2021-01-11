import { message } from 'antd';
import { ITimeline, ITimelineCreateRequest } from '@admin-layout/schedule-module-core';
import * as Logger from 'bunyan';
import { injectable, inject, optional } from 'inversify';
import { ITimelineRepository } from './../../interfaces';
import * as mongoose from 'mongoose';
import { TimelineModelType, TimelineModelFunc } from './../models';

@injectable()
export class TimelineRepository implements ITimelineRepository {
  private timelineModel: TimelineModelType;
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
    this.logger = logger.child({ className: 'TimelineRepository' });
    this.timelineModel = TimelineModelFunc(db);
  }

  public async getTimelineEvents(userId: string): Promise<Array<ITimeline>> {
    if (userId === undefined) return await this.timelineModel.find({}).exec();
    return await this.timelineModel.find({ resourceId: userId }).exec();
  }

  public async createTimelineEvent(newEvent: ITimelineCreateRequest): Promise<boolean> {
    try {
      await this.timelineModel.create({ ...newEvent });
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public async updateTimelineEvent(
    eventId: string,
    newEvent: ITimelineCreateRequest,
  ): Promise<boolean> {
    try {
      await this.timelineModel.update({ _id: eventId }, { ...newEvent });
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public async removeTimelineEvent(
    eventId: string,
  ): Promise<boolean> {
    try {
      await this.timelineModel.remove({ _id: eventId });
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
