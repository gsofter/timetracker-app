/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jest/prefer-strict-equal */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jest/no-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import * as MongoDB from 'mongodb';
import { connection as mongooseConnection } from 'mongoose';
import * as mongoose from 'mongoose';
import { logger } from '@cdm-logger/server';
import { TimeRecordRepository } from './timerecord-repository';

// Note: Make sure `mongodbConfig` is uncommented in <root>/jest.config.js

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

describe('timeRecod Repository with tests', () => {
  let db: MongoDB.Db;
  let connection: MongoDB.MongoClient;
  let timeRecordRepo: TimeRecordRepository;
  let timeRecordId = null;
  const timeRecord = {
    clientId: null,
    description: '',
    isBillable: false,
    startTime: new Date(),
  };
  // Connect to MongoDB Memory Server
  beforeAll(async () => {
    const conn = mongoose.createConnection(process.env.MONGO_URL, { dbName: 'jest' });
    timeRecordRepo = new TimeRecordRepository(conn, logger as any);
  });
  afterAll(async () => {
    await dropAllCollections();
    connection.close();
  });

  it('create timeRecrod', async () => {
    const record = await timeRecordRepo.createTimeRecord('userA', 'orgA', timeRecord);
    timeRecordId = (record.timeRecords[0] as any)._id;
    expect(record.timeRecords[0].startTime.toString()).toEqual(timeRecord.startTime.toString());
  });
  it('modify timeRecord', async () => {
    const timeRecordUpdate = {
      endTime: new Date(),
      ...timeRecord,
    };
    const record = await timeRecordRepo.updateTimeRecord('userA', 'orgA', timeRecordId, timeRecordUpdate);
    expect(record.timeRecords[0].startTime.toString()).toEqual(timeRecordUpdate.startTime.toString());
  });

  it('remove timeRecord', async () => {
    const record = await timeRecordRepo.removeTimeRecord('userA', 'orgA', timeRecordId);
    expect(record.timeRecords[0].id).toEqual(timeRecordId);
  });
});
