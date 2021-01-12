// TODO: 
export const resolver = (options) => ({
  Query: {
    getScheduleEvents: (root, args, { scheduleService }) => {
      options.logger.trace('(Query.getScheduleEvents) args %j', args)
      return scheduleService.getScheduleEvents(args.userId);
    },
  },
  Mutation: {
    addScheduleEvent: (root, args, { scheduleService }) => {
      options.logger.trace('(Mutation.addScheduleEvent) args %j', args)
      return scheduleService.createScheduleEvent(args.request);
    },
    updateScheduleEvent: (root, args, { scheduleService }) => {
      options.logger.trace('(Mutation.updateScheduleEvent) args %j', args)
      return scheduleService.updateScheduleEvent(args.eventId, args.request);
    },
    removeScheduleEvent: (root, args, { scheduleService }) => {
      options.logger.trace('(Mutation.removeScheduleEvent) args %j', args)
      return scheduleService.removeScheduleEvent(args.eventId);
    } 
  },
  Subscription: {

  },
});
