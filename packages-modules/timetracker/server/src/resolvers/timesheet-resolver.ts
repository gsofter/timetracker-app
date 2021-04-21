export const resolver = (options) => ({
  Query: {
    getTimesheets: (root, args, { timesheetService, userContext }) => {
      options.logger.trace('(Query.getTimeSheets) args %j', args);
      if (!args.withTotalHours) return timesheetService.getTimesheets(userContext.orgId);
      return timesheetService.getTimesheetsWithTotalHours(userContext.orgId);
    },
    getDurationTimesheets: (root, args, { timesheetService, userContext }) => {
      options.logger.trace('(Query.getDurationTimesheets) args %j', args);
      return timesheetService.getDurationTimesheets(userContext.orgId, args.start, args.end);
    },
  },

  Mutation: {
    createTimesheet: (root, args, { timesheetService, user, userContext }) => {
      options.logger.trace('(Mutation.createTimesheet) args %j', args);
      return timesheetService.createTimesheet(
        user._id || user.sub,
        userContext.orgId,
        args.request,
      );
    },
    updateTimesheet: (root, args, { timesheetService, user, userContext }) => {
      options.logger.trace('(Mutation.updateTimesheet) args %j', args);
      return timesheetService.updateTimesheet(
        user._id || user.sub,
        userContext.orgId,
        args.sheetId,
        args.request,
        { ...userContext, username: user.name },
      );
    },
    removeTimesheet: (root, args, { timesheetService, user, userContext }) => {
      options.logger.trace('(Mutation.removeTimesheet) args %j', args);
      return timesheetService.removeTimesheet(
        user._id || user.sub,
        userContext.orgId,
        args.sheetId,
      );
    },
    updateTimesheetStatus: (root, args, { timesheetService, user, userContext }) => {
      options.logger.trace('(Mutation.updateTimesheetStatus) args %j', args);
      return timesheetService.updateTimesheetStatus(
        user._id || user.sub,
        userContext.orgId,
        args.request,
      );
    },
  },
  Subscription: {},
});
