import * as _ from 'lodash';
import scheduleSchema from './schedule-schema.graphql'
import timelineSchema from './timeline-schema.graphql'
import timesheetSchema from './timesheet-schema.graphql'

const schema = [scheduleSchema, timelineSchema, timesheetSchema].join('\n')

export { schema }