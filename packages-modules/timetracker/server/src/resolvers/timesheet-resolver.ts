import { DEFAULT_USER } from '../constants'
export const resolver = (options) => ({
    Query: {
      getTimeSheets: (root, args, { timeSheetService }) => {
        options.logger.trace('(Query.getTimeSheets) args %j', args)
        return timeSheetService.getTimeSheetEvents(DEFAULT_USER);
      },
    },
    Mutation: {
      addTimeSheet: (root, args, { timeSheetService }) => {
        options.logger.trace('(Mutation.addTimeSheet) args %j', args)
        return timeSheetService.createTimeSheet(DEFAULT_USER, args.request);
      },
      updateTimeSheet: (root, args, { timeSheetService }) => {
        options.logger.trace('(Mutation.updateTimeSheet) args %j', args)
        return timeSheetService.updateTimeSheet(DEFAULT_USER, args.eventId, args.request);
      },
      removeTimeSheet: (root, args, { timeSheetService }) => {
        options.logger.trace('(Mutation.removeTimeSheet) args %j', args)
        return timeSheetService.removeTimeSheet(DEFAULT_USER, args.eventId);
      } 
    },
    Subscription: {
  
    },
  });
  