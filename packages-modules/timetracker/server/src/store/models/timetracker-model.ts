import { Schema, Model, Document, Connection } from 'mongoose'
import { ITimeRecord } from '@admin-layout/timetracker-module-core'

interface ITimeRecordModel extends ITimeRecord, Document {
    id: any;
}

const timeRecordSchema = new Schema({
    // record
    start: { type: Date },
    end: { type: Date },
    task: { type: String },
    tags: { type: [String] },
    isBillable: { type: Boolean},
    projectId: { type: String },
    clientId: { type: String },
    totalTime: { type: Number },
});

timeRecordSchema.virtual('id').get(function() {
    return this._id.toHexString();
})

timeRecordSchema.set('toJSON', { 
    virtuals: true,
})

timeRecordSchema.set('toObject', { virtuals: true})

export type TimeRecordModelType = Model<ITimeRecordModel>

export const TimeRecordModelFunc : (db: Connection) => TimeRecordModelType = db => db.model<ITimeRecordModel>('timerecord', timeRecordSchema)