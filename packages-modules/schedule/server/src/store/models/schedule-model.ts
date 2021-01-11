
import { Schema, Model, Document, Connection } from 'mongoose';
import { ISchedule } from '@admin-layout/schedule-module-core';
export interface IScheduleModel extends ISchedule, Document {
    id: any
}

const ScheduleSchema = new Schema({
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
    isBillable: { type:Boolean, default: false },
    // submitted date
    submittedOn: { type: Date },
    // reason
    reason: { type: String },
    // note
    note: { type: String },
    // approved date
    approvedOn: { type: Date },
});

ScheduleSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

ScheduleSchema.set('toJSON', {
    virtuals: true,
});

ScheduleSchema.set('toObject', {
    virtuals: true,
});

export type ScheduleModelType = Model<IScheduleModel>;

export const ScheduleModelFunc: (db: Connection) => ScheduleModelType = db => db.model<IScheduleModel>('schedule', ScheduleSchema);