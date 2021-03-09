import { DEFAULT_USER, DEFAULT_ORG } from '../constants'
export const resolver = (options) => ({
  Query: {
    getTimeRecords: (root, args, { timeTrackerService, user, userContext }) => {
      options.logger.trace('(Query.getTimeRecords) args %j', args)
      return timeTrackerService.getTimeRecords(user._id || user.sub, userContext.orgId);
    },
    getDurationTimeRecords: (root, args, { timeTrackerService, user, userContext }) => {
      options.logger.trace('(Query.getDurationTimeRecords) args %j', args)
      return timeTrackerService.getDurationTimeRecords(user._id || user.sub, userContext.orgId, args.startTime, args.endTime);
    },
    getPlayingTimeRecord: (root, args, { timeTrackerService, user, userContext }) => {
      options.logger.trace('(Query.getPlayingTimeRecord) args %j', args)
      return timeTrackerService.getPlayingTimeRecord(user._id || user.sub, userContext.orgId);
    }
  },
  Mutation: {
    createTimeRecord: (root,  args, { timeTrackerService, user, userContext}) => {
      options.logger.trace('(Mutation.createTimeRecord) args %j', args)
      return timeTrackerService.createTimeRecord(user._id || user.sub, userContext.orgId, args.request);
    },
    updateTimeRecord: (root,  args, { timeTrackerService, user, userContext }) => {
      options.logger.trace('(Mutation.updateTimeRecord) args %j', args)
      return timeTrackerService.updateTimeRecord(user._id || user.sub, userContext.orgId, args.recordId, args.request);
    },
    removeTimeRecord: (root,  args, { timeTrackerService, user, userContext}) => {
      options.logger.trace('(Mutation.revmoeTimeRecord) args %j', args)
      return timeTrackerService.removeTimeRecord(user._id || user.sub, userContext.orgId, args.recordId);
    },
    removeDurationTimeRecords: (root,  args, { timeTrackerService, user, userContext }) => {
      options.logger.trace('(Mutation.removeDurationTimeRecords) args %j', args)
      return timeTrackerService.removeDurationTimeRecords(user._id || user.sub, userContext.orgId, args.startTime, args.endTime, args.projectId);
    }
  },
  Subscription: {
    
  },
});
