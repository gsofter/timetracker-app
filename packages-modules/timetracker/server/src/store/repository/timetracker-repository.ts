import { message } from 'antd';
import * as Logger from 'bunyan';
import { injectable, inject, optional } from 'inversify';
import { ITimeTrackerRepository } from './../../interfaces';
import * as mongoose from 'mongoose';
import { TimeRecordModelType, TimeRecordModelFunc } from './../models/timetracker-model';

@injectable()
export class TimeTrackerRepository implements ITimeTrackerRepository {
  private timeRecordModel: TimeRecordModelType;
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
    this.timeRecordModel = TimeRecordModelFunc(db);
  }

  public async getTimeRecords() {
    return [];
  }
}
