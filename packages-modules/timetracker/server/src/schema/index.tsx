import * as _ from 'lodash';
import timeRecordSchema from './timerecord-schema.graphql';
import timesheetSchema from './timesheet-schema.graphql';
import timeTrackerSchema from './timetracker-schema.graphql';
import commonSchema from './common-schema.graphql';

const schema = [timeRecordSchema, timesheetSchema, timeTrackerSchema, commonSchema].join('\n');

export { schema };
