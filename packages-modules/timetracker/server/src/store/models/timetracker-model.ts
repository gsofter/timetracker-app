/* eslint-disable no-underscore-dangle */
import { Schema, Model, Document, Connection } from 'mongoose';
import { ITimeTracker, ITimeRecord, ITimesheet } from '@admin-layout/timetracker-core';

export declare type Maybe<T> = T | null;

interface ITimeRecordModel extends ITimeRecord, Document {
  id?: any;
}
interface ITimeSheetModel extends ITimesheet, Document {
  id?: any;
}
interface ITimeTrackerModel extends ITimeTracker, Document {
  id: any;
  timeRecords: ITimeRecordModel[];
  timesheets: ITimeSheetModel[];
}

enum TimesheetState {
  OPEN,
  APPROVED_PENDING,
  APPROVED,
  APPROVED_FINALIZED,
  DENYED,
  SUBMITTED,
  DENYED_FINALIZED,
}

// ===> TimeRecord
const TimeRecordSchema = new Schema({
  userId: { type: String },
  startTime: { type: Date },
  endTime: { type: Date, default: null },
  taskName: { type: String },
  description: { type: String },
  taskId: { type: String }, // ----> task
  tags: { type: [String] },
  isBillable: { type: Boolean },
  projectId: { type: String }, // ----> project
  timesheetId: { type: String }, // ----> timesheet
});

// ===> Timesheet
const TimesheetSchema = new Schema({
  userId: { type: String, index: true },
  startDate: { type: Date },
  endDate: { type: Date },
  state: { type: TimesheetState },
  submittedOn: { type: Date },
  approvedOn: { type: Date },
  approvedBy: { type: String },
  updatedBy: { type: String },
  updatedOn: { type: Date },
});

const TimeTrackerSchema = new Schema({
  orgId: { type: String, index: true },
  timeRecords: [TimeRecordSchema],
  timesheets: [TimesheetSchema],
});

TimeRecordSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

TimeRecordSchema.set('toJSON', {
  virtuals: true,
});

TimeTrackerSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

TimeTrackerSchema.set('toJSON', {
  virtuals: true,
});

TimeTrackerSchema.set('toObject', { virtuals: true });

export type TimeTrackerModelType = Model<ITimeTrackerModel>;

export const TimeTrackerModelFunc: (db: Connection) => TimeTrackerModelType = (db) =>
  db.model<ITimeTrackerModel>('timetracker', TimeTrackerSchema);
