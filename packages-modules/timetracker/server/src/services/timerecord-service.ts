/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import { CdmLogger } from '@cdm-logger/core';
import { inject, injectable } from 'inversify';
import { ITimeRecord, ITimeRecordRequest, ITimeRecordPubSubEvents, ITimeTracker } from '@admin-layout/timetracker-core';
import { ServerTypes, IPreferencesService } from '@adminide-stack/core';
import { PubSubEngine } from 'graphql-subscriptions';
import { ServiceBroker, CallingOptions } from 'moleculer';
import { CommonType } from '@common-stack/core';
import { ITimeRecordRepository } from '../store/repository';
import { TYPES } from '../constants';

export interface ITimeRecordService {
  getTimeRecords(orgId: string, userId?: string): Promise<Array<ITimeRecord>>;
  getDurationTimeRecords(orgId: string, startTime: Date, endTime: Date, userId?: string): Promise<Array<ITimeRecord>>;
  getPlayingTimeRecord(userId: string, orgId: string): Promise<ITimeRecord>;
  createTimeRecord(userId: string, orgId: string, request: ITimeRecordRequest): Promise<Partial<ITimeTracker>>;
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
  private logger: CdmLogger.ILogger;

  constructor(
    @inject(TYPES.ITimeRecordRepository)
    protected timeRecordRepository: ITimeRecordRepository,

    @inject(ServerTypes.IPreferenceEditorService)
    private preferencesService: IPreferencesService,

    @inject(CommonType.MOLECULER_BROKER)
    private broker: ServiceBroker,

    @inject('PubSub')
    private pubsub: PubSubEngine,

    @inject('Logger')
    logger: CdmLogger.ILogger,
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
    const timeRecords = await this.timeRecordRepository.getTimeRecords(orgId, userId, startTime, endTime);
    return timeRecords.filter((r) => r.endTime !== null);
  }

  public async getPlayingTimeRecord(userId: string, orgId: string): Promise<ITimeRecord> {
    return this.timeRecordRepository.getPlayingTimeRecord(userId, orgId);
  }

  public async createTimeRecord(userId: string, orgId: string, request: ITimeRecordRequest) {
    const data = await this.timeRecordRepository.createTimeRecord(userId, orgId, request);
    const timeRecord = data?.timeRecords[0];
    if (timeRecord) {
      const record = {
        orgName: data.orgId,
        userId: timeRecord.userId,
        mutation: ITimeRecordPubSubEvents.TimeRecordCreated,
        timeRecord,
      };
      this.pubsub.publish(ITimeRecordPubSubEvents.TimeRecordCreated, { SubscribeToTimeTracker: record });
    }
    return (data as any)._id;
  }

  public async updateTimeRecord(userId: string, orgId: string, recordId: string, request: ITimeRecordRequest) {
    const data = await this.timeRecordRepository.updateTimeRecord(userId, orgId, recordId, request);
    const timeRecord = data?.timeRecords[0];
    if (timeRecord) {
      const record = {
        orgName: data.orgId,
        userId: timeRecord.userId,
        mutation: ITimeRecordPubSubEvents.TimeRecordUpdated,
        timeRecord,
      };
      this.pubsub.publish(ITimeRecordPubSubEvents.TimeRecordUpdated, { SubscribeToTimeTracker: record });
    }
    return true;
  }

  public async removeTimeRecord(userId: string, orgId: string, recordId: string) {
    const data = await this.timeRecordRepository.removeTimeRecord(userId, orgId, recordId);
    this.pubsub.publish(ITimeRecordPubSubEvents.TimeRecordDeleted, { SubscribeToTimeTracker: data });
    return true;
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
}
