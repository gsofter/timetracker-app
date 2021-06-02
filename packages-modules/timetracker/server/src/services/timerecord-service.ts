/* eslint-disable import/no-extraneous-dependencies */
import * as ILogger from 'bunyan';
import { inject, injectable } from 'inversify';
import { ITimeRecord, ITimeRecordRequest, ITimesheet, ITimeRecordPubSubEvents } from '@admin-layout/timetracker-core';
import { ServerTypes, IPreferencesService } from '@adminide-stack/core';
import { IMoleculerServiceName, IMailServiceAction, IMailerServicesendArgs } from '@container-stack/mailing-api';
import * as moment from 'moment';
import { PubSubEngine } from 'graphql-subscriptions';

import { ServiceBroker, CallingOptions } from 'moleculer';
import { CommonType } from '@common-stack/core';
import { ITimeRecordRepository, ITimesheetRepository } from '../store/repository';
import { TYPES } from '../constants';

export interface ITimeRecordService {
  getTimeRecords(orgId: string, userId?: string): Promise<Array<ITimeRecord>>;
  getDurationTimeRecords(orgId: string, startTime: Date, endTime: Date, userId?: string): Promise<Array<ITimeRecord>>;
  getPlayingTimeRecord(userId: string, orgId: string): Promise<ITimeRecord>;
  createTimeRecord(userId: string, orgId: string, request: ITimeRecordRequest): Promise<string>;
  updateTimeRecord(userId: string, orgId: string, recordId: string, request: ITimeRecordRequest): Promise<boolean>;
  removeTimeRecord(userId: string, orgId: string, recordId: string): Promise<boolean>;
  removeDurationTimeRecords(
    userId: string,
    orgId: string,
    startTime: Date,
    endTime: Date,
    projectId: string,
  ): Promise<boolean>;
  approveTimeRecords(orgId: string, sheetId: string, startDate: Date, endDate: Date);
  disapproveTimeRecords(orgId: string, sheetId: string);
}

@injectable()
export class TimeRecordService implements ITimeRecordService {
  private logger: ILogger;

  constructor(
    @inject(TYPES.ITimeRecordRepository)
    protected timeRecordRepository: ITimeRecordRepository,

    @inject(TYPES.ITimesheetRepository)
    protected timesheetRepository: ITimesheetRepository,

    @inject(ServerTypes.IPreferenceEditorService)
    private preferencesService: IPreferencesService,

    @inject(CommonType.MOLECULER_BROKER)
    private broker: ServiceBroker,

    @inject('PubSub')
    private pubsub: PubSubEngine,

    @inject('Logger')
    logger: ILogger,
  ) {
    this.logger = logger;
  }

  public async getTimeRecords(orgId: string, userId: string) {
    return this.timeRecordRepository.getTimeRecords(orgId, userId);
  }

  public async getDurationTimeRecords(
    orgId: string,
    startTime: Date,
    endTime: Date,
    userId?: string,
  ): Promise<Array<ITimeRecord>> {
    const timeRecords = await this.timeRecordRepository.getTimeRecords(orgId, userId);
    return timeRecords.filter(
      (r) =>
        (!userId || r.userId === userId) &&
        moment(startTime) <= moment(r.startTime) &&
        moment(r.endTime) <= moment(endTime) &&
        r.endTime !== null,
    );
  }

  public async getPlayingTimeRecord(userId: string, orgId: string): Promise<ITimeRecord> {
    return this.timeRecordRepository.getPlayingTimeRecord(userId, orgId);
  }

  public async createTimeRecord(userId: string, orgId: string, request: ITimeRecordRequest) {
    const data = await this.timeRecordRepository.createTimeRecord(userId, orgId, request);
    this.pubsub.publish(ITimeRecordPubSubEvents.TimeRecordCreated, { SubscribeToTimeTracker: data });
    return data;
  }

  public async updateTimeRecord(userId: string, orgId: string, recordId: string, request: ITimeRecordRequest) {
    const data = await this.timeRecordRepository.updateTimeRecord(userId, orgId, recordId, request);
    this.pubsub.publish(ITimeRecordPubSubEvents.TimeRecordCreated, { SubscribeToTimeTracker: data });
    return data;
  }

  public async removeTimeRecord(userId: string, orgId: string, recordId: string) {
    const data = await this.timeRecordRepository.removeTimeRecord(userId, orgId, recordId);
    this.pubsub.publish(ITimeRecordPubSubEvents.TimeRecordDeleted, { SubscribeToTimeTracker: data });
    return data;
  }

  public async removeDurationTimeRecords(
    userId: string,
    orgId: string,
    startTime: Date,
    endTime: Date,
    projectId: string,
  ) {
    return this.timeRecordRepository.removeDurationTimeRecords(userId, orgId, startTime, endTime, projectId);
  }

  public async approveTimeRecords(orgId: string, sheetId: string, startDate: Date, endDate: Date) {
    this.timeRecordRepository.approveTimeRecords(orgId, sheetId, startDate, endDate);
  }

  public async disapproveTimeRecords(orgId: string, sheetId: string) {
    this.timeRecordRepository.disapproveTimeRecords(orgId, sheetId);
  }

  private sendMail(topic, to, from, templateId, templateVars) {
    return this.callAction<void, IMailerServicesendArgs>(
      IMailServiceAction.send,
      {
        request: {
          topic,
          to,
          templateId,
          from,
          variables: templateVars,
        },
      },
      IMoleculerServiceName.MailService,
    );
  }

  private async callAction<T, P = any>(command: string, params?: P, topic?: string, opts?: CallingOptions) {
    return this.broker.call<T, P>(`${topic}.${command}`, params, opts);
  }
}
