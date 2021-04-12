import * as _ from 'lodash';
export const resolver = options => ({
  Query: {
    getTimeRecords: (root, args, { timeTrackerService, user, userContext }) => {
      options.logger.trace('(Query.getTimeRecords) args %j', args);
      return timeTrackerService.getTimeRecords(userContext.orgId, args.userId);
    },
    getDurationTimeRecords: (root, args, { timeTrackerService, user, userContext }) => {
      options.logger.trace('(Query.getDurationTimeRecords) args %j', args);
      return timeTrackerService.getDurationTimeRecords(
        userContext.orgId,
        args.startTime,
        args.endTime,
        args.userId,
      );
    },
    getPlayingTimeRecord: (root, args, { timeTrackerService, user, userContext }) => {
      options.logger.trace('(Query.getPlayingTimeRecord) args %j', args);
      return timeTrackerService.getPlayingTimeRecord(user._id || user.sub, userContext.orgId);
    },
  },
  Mutation: {
    createTimeRecord: (root, args, { timeTrackerService, user, userContext }) => {
      options.logger.trace('(Mutation.createTimeRecord) args %j', args);
      let userId = args.request.userId;
      if (userId === undefined) userId = user._id || user.sub;
      return timeTrackerService.createTimeRecord(userId, userContext.orgId, args.request);
    },
    updateTimeRecord: (root, args, { timeTrackerService, user, userContext }) => {
      options.logger.trace('(Mutation.updateTimeRecord) args %j', args);
      let userId = args.request.userId;
      if (userId === undefined) userId = user._id || user.sub;
      return timeTrackerService.updateTimeRecord(
        userId,
        userContext.orgId,
        args.recordId,
        args.request,
      );
    },
    removeTimeRecord: (root, args, { timeTrackerService, user, userContext }) => {
      options.logger.trace('(Mutation.removeTimeRecord) args %j', args);
      let userId = user._id || user.sub;
      return timeTrackerService.removeTimeRecord(userId, userContext.orgId, args.recordId);
    },
    removeDurationTimeRecords: (root, args, { timeTrackerService, user, userContext }) => {
      options.logger.trace('(Mutation.removeDurationTimeRecords) args %j', args);
      let userId = user._id || user.sub;
      return timeTrackerService.removeDurationTimeRecords(
        userId,
        userContext.orgId,
        args.startTime,
        args.endTime,
        args.projectId,
      );
    },
  },
  Subscription: {},
});
