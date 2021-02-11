import { DEFAULT_USER, DEFAULT_ORG } from '../constants'
export const resolver = (options) => ({
    Query: {
      getTimesheets: (root, args, { timeTrackerService }) => {
        options.logger.trace('(Query.getTimeSheets) args %j', args)
        return timeTrackerService.getTimesheets(DEFAULT_USER, DEFAULT_ORG);
      },
    },
    Mutation: {
      createTimesheet: (root, args, { timeTrackerService }) => {
        options.logger.trace('(Mutation.createTimesheet) args %j', args)
        return timeTrackerService.createTimesheet(DEFAULT_USER, DEFAULT_ORG, args.request);
      },
      updateTimesheet: (root, args, { timeTrackerService }) => {
        options.logger.trace('(Mutation.updateTimesheet) args %j', args)
        return timeTrackerService.updateTimesheet(DEFAULT_USER, DEFAULT_ORG, args.sheetId, args.request);
      },
      removeTimesheet: (root, args, { timeTrackerService }) => {
        options.logger.trace('(Mutation.removeTimesheet) args %j', args)
        return timeTrackerService.removeTimesheet(DEFAULT_USER, DEFAULT_ORG, args.sheetId);
      }
    },
    Subscription: {
  
    },
  });
  