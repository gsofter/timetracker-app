export const resolver = (options) => ({
  Query: {
    getTimeRecords: (root, args, { timetrackerService }) => {
      options.logger.trace('(Query.getTimeRecords) args %j', args)
      return timetrackerService.getTimeRecords();
    },
  },
  Mutation: {
  },
  Subscription: {
    
  },
});
