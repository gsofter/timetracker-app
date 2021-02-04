import { Schema, Model, Document, Connection } from 'mongoose'
import { ITimeTracker } from '@admin-layout/timetracker-module-core'

interface ITimeTrackerModel extends ITimeTracker , Document {
    id: any;
}

enum TimesheetState {
    APPROVED_PENDING,
    APPROVED,
    APPROVED_FINALIZED,
    DENYED,
    SUBMITTED,
    DENYED_FINALIZED
}

// ===> TimeRecord
const TimeRecordSchema = new Schema({
    startTime: { type: Date },
    endTime: { type: Date },
    taskName: { type: String },
    taskId: { type: String }, // ----> task
    tags: { type: [String] },
    isBillable: { type: Boolean },
    projectId: { type: String }, // ----> project
})

const TimesheetSchema = new Schema({
    startDate: { type: Date },
    endDate: { type: Date },
    state: { type: TimesheetState },
    submittedOn: { type: Date },
    approvedOn: { type: Date },
    updatedBy: { type: String },
    updatedOn: { type: Date }
})

const TimeTrackerSchema = new Schema({
    userId: { type: String },
    orgId: { type: String },
    timeRecords: [TimeRecordSchema],
    timesheets: [TimesheetSchema],
});

TimeRecordSchema.virtual('id').get(function() {
    return this._id.toHexString();
})

TimeRecordSchema.set('toJSON', { 
    virtuals: true,
})

TimeTrackerSchema.virtual('id').get(function() {
    return this._id.toHexString();
})

TimeTrackerSchema.set('toJSON', { 
    virtuals: true,
})

TimeTrackerSchema.set('toObject', { virtuals: true})

export type TimeTrackerModelType = Model<ITimeTrackerModel>

export const TimeTrackerModelFunc : (db: Connection) => TimeTrackerModelType = db => db.model<ITimeTrackerModel>('timetracker', TimeTrackerSchema)