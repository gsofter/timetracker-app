import { resolver as scheduleResolver } from './schedule-resolver'
import { resolver as timelineResolver } from './timeline-resolver'
import { resolver as timesheetResolver } from './timesheet-resolver'

export const resolvers = [scheduleResolver, timelineResolver, timesheetResolver]