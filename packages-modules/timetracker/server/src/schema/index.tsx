import * as _ from 'lodash';
import timeRecordSchema from './timerecord-schema.graphql';
import timesheetSchema from './timesheet-schema.graphql';
import timeTrackerSchema from './timetracker-schema.graphql';

const schema = [timeRecordSchema, timesheetSchema, timeTrackerSchema].join('\n');

export { schema };
