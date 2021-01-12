// TODO: 
export const resolver = (options) => ({
    Query: {
      getTimesheetEvents: (root, args, { timesheetService }) => {
        options.logger.trace('(Query.getTimesheetEvents) args %j', args)
        return timesheetService.getTimesheetEvents(args.userId);
      },
    },
    Mutation: {
      addTimesheetEvent: (root, args, { timesheetService }) => {
        options.logger.trace('(Mutation.addTimesheetEvent) args %j', args)
        return timesheetService.createTimesheetEvent(args.request);
      },
      updateTimesheetEvent: (root, args, { timesheetService }) => {
        options.logger.trace('(Mutation.updateTimesheetEvent) args %j', args)
        return timesheetService.updateTimesheetEvent(args.eventId, args.request);
      },
      removeTimesheetEvent: (root, args, { timesheetService }) => {
        options.logger.trace('(Mutation.removeTimesheetEvent) args %j', args)
        return timesheetService.removeTimesheetEvent(args.eventId);
      } 
    },
    Subscription: {
  
    },
  });
  