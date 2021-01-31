import * as _ from 'lodash';
import scheduleSchema from './schedule-schema.graphql'
import timelineSchema from './timeline-schema.graphql'

const schema = [scheduleSchema, timelineSchema].join('\n')

export { schema }