// TODO: 
export const resolver = (options) => ({
    Query: {
      getTimeSheets: (root, args, { timeSheetService }) => {
        options.logger.trace('(Query.getTimeSheets) args %j', args)
        return timeSheetService.getTimeSheetEvents(args.userId);
      },
    },
    Mutation: {
      addTimeSheet: (root, args, { timeSheetService }) => {
        options.logger.trace('(Mutation.addTimeSheet) args %j', args)
        return timeSheetService.createTimeSheet(args.request);
      },
      updateTimeSheet: (root, args, { timeSheetService }) => {
        options.logger.trace('(Mutation.updateTimeSheet) args %j', args)
        return timeSheetService.updateTimeSheet(args.eventId, args.request);
      },
      removeTimeSheet: (root, args, { timeSheetService }) => {
        options.logger.trace('(Mutation.removeTimeSheet) args %j', args)
        return timeSheetService.removeTimeSheet(args.eventId);
      } 
    },
    Subscription: {
  
    },
  });
  