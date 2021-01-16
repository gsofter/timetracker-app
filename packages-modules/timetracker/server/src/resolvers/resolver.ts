export const resolver = (options) => ({
  Query: {
    getTimeRecords: (root, args, { timeTrackerService }) => {
      options.logger.trace('(Query.getTimeRecords) args %j', args)
      return timeTrackerService.getTimeRecords();
    },
  },
  Mutation: {
    createTimeRecord: (root,  args, { timeTrackerService }) => {
      options.logger.trace('(Mutation.createTimeRecord) args %j', args)
      return timeTrackerService.createTimeRecord(args.request);
    },
    updateTimeRecord: (root,  args, { timeTrackerService }) => {
      options.logger.trace('(Mutation.updateTimeRecord) args %j', args)
      return timeTrackerService.updateTimeRecord(args.recordId, args.request);
    },
    removeTimeRecord: (root,  args, { timeTrackerService }) => {
      options.logger.trace('(Mutation.revmoeTimeRecord) args %j', args)
      return timeTrackerService.removeTimeRecord(args.recordId);
    }
  },
  Subscription: {
    
  },
});
