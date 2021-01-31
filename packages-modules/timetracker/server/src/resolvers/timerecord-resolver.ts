import { DEFAULT_USER } from '../constants'
export const resolver = (options) => ({
  Query: {
    getTimeRecords: (root, args, { timeTrackerService }) => {
      options.logger.trace('(Query.getTimeRecords) args %j', args)
      return timeTrackerService.getTimeRecords();
    },
    getPlayingTimeRecord: (root, args, { timeTrackerService }) => {
      options.logger.trace('(Query.getPlayingTimeRecord) args %j', args)
      return timeTrackerService.getPlayingTimeRecord();
    }
  },
  Mutation: {
    createTimeRecord: (root,  args, { timeTrackerService }) => {
      options.logger.trace('(Mutation.createTimeRecord) args %j', args)
      return timeTrackerService.createTimeRecord(DEFAULT_USER, args.request);
    },
    updateTimeRecord: (root,  args, { timeTrackerService }) => {
      options.logger.trace('(Mutation.updateTimeRecord) args %j', args)
      return timeTrackerService.updateTimeRecord(DEFAULT_USER, args.recordId, args.request);
    },
    removeTimeRecord: (root,  args, { timeTrackerService }) => {
      options.logger.trace('(Mutation.revmoeTimeRecord) args %j', args)
      return timeTrackerService.removeTimeRecord(DEFAULT_USER, args.recordId);
    }
  },
  Subscription: {
    
  },
});
