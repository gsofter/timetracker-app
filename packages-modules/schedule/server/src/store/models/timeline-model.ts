import { Schema, Model, Document, Connection } from 'mongoose';
import { ITimeline } from '@admin-layout/schedule-module-core';
export interface ITimelineModel extends ITimeline, Document {
  id: any;
}

const TimelineSchema = new Schema({
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

TimelineSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

TimelineSchema.set('toJSON', {
  virtuals: true,
});

TimelineSchema.set('toObject', {
  virtuals: true,
});

export type TimelineModelType = Model<ITimelineModel>;

export const TimelineModelFunc: (db: Connection) => TimelineModelType = db =>
  db.model<ITimelineModel>('timeline', TimelineSchema);
