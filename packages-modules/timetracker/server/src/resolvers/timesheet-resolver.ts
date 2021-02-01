import { DEFAULT_USER, DEFAULT_ORG } from '../constants'
export const resolver = (options) => ({
    Query: {
      getTimesheets: (root, args, { timeSheetService }) => {
        options.logger.trace('(Query.getTimeSheets) args %j', args)
        return timeSheetService.getTimeSheetEvents(DEFAULT_USER, DEFAULT_ORG);
      },
    },
    Mutation: {
      createTimesheet: (root, args, { timeSheetService }) => {
        options.logger.trace('(Mutation.addTimeSheet) args %j', args)
        return timeSheetService.createTimeSheet(DEFAULT_USER, DEFAULT_ORG, args.request);
      },
      updateTimesheet: (root, args, { timeSheetService }) => {
        options.logger.trace('(Mutation.updateTimeSheet) args %j', args)
        return timeSheetService.updateTimeSheet(DEFAULT_USER, DEFAULT_ORG, args.eventId, args.request);
      },
      removeTimesheet: (root, args, { timeSheetService }) => {
        options.logger.trace('(Mutation.removeTimeSheet) args %j', args)
        return timeSheetService.removeTimeSheet(DEFAULT_USER, DEFAULT_ORG, args.eventId);
      } 
    },
    Subscription: {
  
    },
  });
  