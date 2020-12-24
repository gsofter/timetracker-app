import { IResolvers, Counter } from '../generated-models';

// TODO: 
export const resolver = (options) => ({
  Query: {
    getScheduleEvents: (root, args, { scheduleService }) => {
      options.logger('(Query.getScheduleEvents) args %j', args)
      return scheduleService.getScheduleEvents(args.userId);
    }
  },
  Mutation: {
    addSchedule: (root, args, { scheduleService }) => {
      options.logger('(Mutation.addSchedule) args %j', args)
      return scheduleService.createScheduleEvent(args.request);
    }
  },
  Subscription: {

  },
});
