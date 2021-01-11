import { Schema, Model, Document, Connection } from 'mongoose';
import { ITimesheet } from '@admin-layout/schedule-module-core';
export interface ITimesheetModel extends ITimesheet, Document {
  id: any;
}

const TimesheetSchema = new Schema({
  // Event title
  title: { type: String, required: true },
  // all day event ? true: false
  allDay: { type: Boolean, default: false },
  // start date
  start: { type: Date },
  // end date
  end: { type: Date },
  // description
  desc: { type: String },
  // userId
  userId: { type: String },
  // resouceId
  resourceId: { type: String },
  // tip
  tooltip: { type: String },
  // isBillable
  isBillable: { type: Boolean, default: false },
  // submitted date
  submittedOn: { type: Date },
  // reason
  reason: { type: String },
  // note
  note: { type: String },
  // approved date
  approvedOn: { type: Date },
});

TimesheetSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

TimesheetSchema.set('toJSON', {
  virtuals: true,
});

TimesheetSchema.set('toObject', {
  virtuals: true,
});

export type TimesheetModelType = Model<ITimesheetModel>;

export const TimesheetModelFunc: (db: Connection) => TimesheetModelType = db =>
  db.model<ITimesheetModel>('timesheet', TimesheetSchema);
