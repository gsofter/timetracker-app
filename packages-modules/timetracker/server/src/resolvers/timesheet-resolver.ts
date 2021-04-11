import { DEFAULT_ORG } from '../constants';

export const resolver = options => ({
  Query: {
    getTimesheets: (root, args, { timeTrackerService, user, userContext }) => {
      options.logger.trace('(Query.getTimeSheets) args %j', args);
      return timeTrackerService.getTimesheets(user._id || user.sub, userContext.orgId, DEFAULT_ORG);
    },
    getDurationTimesheet: (root, args, { timeTrackerService, user, userContext }) => {
      options.logger.trace('(Query.getTimeSheets) args %j', args);
      return timeTrackerService.getDurationTimesheet(
        user._id || user.sub,
        userContext.orgId,
        args.start,
        args.end,
      );
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
      console.log('updateTimesheet =>', userContext);
      console.log(
        'updateTimesheet.userContext.permissions.organization.timetracker =>',
        userContext.permissions.organization.timetracker,
      );
      console.log(
        'updateTimesheet.userContext.permissions.organization.permissions =>',
        userContext.permissions.organization.settings,
      );
      console.log('updateTimesheet.user =>', user);
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
