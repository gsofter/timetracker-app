export const resolver = options => ({
  Query: {
    getTimesheets: (root, args, { timeTrackerService, user, userContext }) => {
      options.logger.trace('(Query.getTimeSheets) args %j', args);
      if (!args.withTotalHours) return timeTrackerService.getTimesheets(userContext.orgId);
      return timeTrackerService.getTimesheetsWithTotalHours(userContext.orgId);
    },
    getDurationTimesheets: (root, args, { timeTrackerService, user, userContext }) => {
      options.logger.trace('(Query.getTimeSheets) args %j', args);
      return timeTrackerService.getDurationTimesheets(userContext.orgId, args.start, args.end);
    },
  },

  Mutation: {
    createTimesheet: (root, args, { timeTrackerService, user, userContext }) => {
      options.logger.trace('(Mutation.createTimesheet) args %j', args);
      return timeTrackerService.createTimesheet(
        user._id || user.sub,
        userContext.orgId,
        args.request,
      );
    },
    updateTimesheet: (root, args, { timeTrackerService, user, userContext }) => {
      options.logger.trace('(Mutation.updateTimesheet) args %j', args);
      return timeTrackerService.updateTimesheet(
        user._id || user.sub,
        userContext.orgId,
        args.sheetId,
        args.request,
        { ...userContext, username: user.name },
      );
    },
    removeTimesheet: (root, args, { timeTrackerService, user, userContext }) => {
      options.logger.trace('(Mutation.removeTimesheet) args %j', args);
      return timeTrackerService.removeTimesheet(
        user._id || user.sub,
        userContext.orgId,
        args.sheetId,
      );
    },
    updateTimesheetStatus: (root, args, { timeTrackerService, user, userContext }) => {
      options.logger.trace('(Mutation.updateTimesheetStatus) args %j', args);
      return timeTrackerService.updateTimesheetStatus(
        user._id || user.sub,
        userContext.orgId,
        args.request,
      );
    },
  },
  Subscription: {},
});
