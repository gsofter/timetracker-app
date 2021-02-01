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

// ===> TimesheetDateRange 
const TimesheetDateRangeSchema = new Schema({
    startDate: { type: Date },
    endDate: { type: Date },
})

const TimesheetSchema = new Schema({
    dateRange: { type: TimesheetDateRangeSchema},
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

TimeTrackerSchema.virtual('id').get(function() {
    return this._id.toHexString();
})

TimeTrackerSchema.set('toJSON', { 
    virtuals: true,
})

TimeTrackerSchema.set('toObject', { virtuals: true})

export type TimeTrackerModelType = Model<ITimeTrackerModel>

export const TimeTrackerModelFunc : (db: Connection) => TimeTrackerModelType = db => db.model<ITimeTrackerModel>('timetracker', TimeRecordSchema)