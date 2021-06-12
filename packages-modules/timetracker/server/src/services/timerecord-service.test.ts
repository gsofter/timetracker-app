/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jest/no-disabled-tests */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jest/no-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import * as MongoDB from 'mongodb';
import { connection as mongooseConnection } from 'mongoose';
import * as mongoose from 'mongoose';
import { logger } from '@cdm-logger/server';
import * as moment from 'moment';
import { TimeRecordRepository } from '../store/repository/timerecord-repository';
import { TimeRecordService } from './timerecord-service';

async function dropAllCollections() {
  const collections = Object.keys(mongooseConnection.collections);
  for (const collectionName of collections) {
    const collection = mongooseConnection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === 'ns not found') return;
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes('a background operation is currently running')) return;
      console.log(error.message);
    }
  }
}
describe('test Create/Update/Delete timeRecord Repository', () => {
  let db: MongoDB.Db;
  let connection: MongoDB.MongoClient;
  let timeRecordRepo: TimeRecordRepository;
  let timeRecordService: TimeRecordService;
  const timeRecordId = null;
  const defaultTimeRecord = {
    clientId: null,
    description: '',
    isBillable: false,
    startTime: new Date(),
  };
  beforeAll(async () => {
    const conn = mongoose.createConnection(process.env.MONGO_URL, { dbName: 'jest' });
    timeRecordRepo = new TimeRecordRepository(conn, logger as any);
    // add multiple timerecord
    await timeRecordRepo.createTimeRecord('userA', 'orgA', { ...defaultTimeRecord, userId: 'userA' });
    await timeRecordRepo.createTimeRecord('userB', 'orgA', { ...defaultTimeRecord, userId: 'userB' });
    await timeRecordRepo.createTimeRecord('userA', 'orgA', { ...defaultTimeRecord, userId: 'userA' });
  });
  afterAll(async () => {
    await dropAllCollections();
    connection.close();
  });

  it('get play records', async () => {
    const pubsub = {
      publish: (x, y) => console.log(x, y),
    };
    timeRecordService = new TimeRecordService(timeRecordRepo, null, null, pubsub as any, logger);
    const currentDate = new Date();
    const startDate = moment(currentDate).subtract(30, 'm').toDate();
    const endDate = moment(startDate).add(60, 'm').toDate();
    const result = await timeRecordService.getDurationTimeRecords('orgA', startDate, endDate, 'userA');
    console.log('---Result---', result);
  });
});
