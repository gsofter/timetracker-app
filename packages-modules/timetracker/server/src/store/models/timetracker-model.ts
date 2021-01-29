import { Schema, Model, Document, Connection } from 'mongoose'
import { ITimeFrame } from '@admin-layout/timetracker-module-core'

interface ITimeFrameModel extends ITimeFrame , Document {
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

// ===> Timeline
const TimeRecordSchema = new Schema({
    start: { type: Date },
    end: { type: Date },
    task: { type: String },
    tags: { type: [String] },
    isBillable: { type: Boolean},
    projectId: { type: String },
    clientId: { type: String },
    totalTime: { type: Number },
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

const TimeFrameSchema = new Schema({
    // record
    userId: { type: String },
    orgId: { type: String },
    timerecords: [TimeRecordSchema],
    timesheets: [TimesheetSchema],
});

TimeFrameSchema.virtual('id').get(function() {
    return this._id.toHexString();
})

TimeFrameSchema.set('toJSON', { 
    virtuals: true,
})

TimeFrameSchema.set('toObject', { virtuals: true})

export type TimeFrameModelType = Model<ITimeFrameModel>

export const TimeFrameModelFunc : (db: Connection) => TimeFrameModelType = db => db.model<ITimeFrameModel>('timerecord', timeRecordSchema)