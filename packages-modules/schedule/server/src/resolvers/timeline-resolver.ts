// TODO: 
export const resolver = (options) => ({
    Query: {
      getTimelineEvents: (root, args, { timelineService }) => {
        options.logger.trace('(Query.getTimelineEvents) args %j', args)
        return timelineService.getTimelineEvents(args.userId);
      },
    },
    Mutation: {
      addTimelineEvent: (root, args, { timelineService }) => {
        options.logger.trace('(Mutation.addTimelineEvent) args %j', args)
        return timelineService.createTimelineEvent(args.request);
      },
      updateTimelineEvent: (root, args, { timelineService }) => {
        options.logger.trace('(Mutation.updateTimelineEvent) args %j', args)
        return timelineService.updateTimelineEvent(args.eventId, args.request);
      },
      removeTimelineEvent: (root, args, { timelineService }) => {
        options.logger.trace('(Mutation.removeTimelineEvent) args %j', args)
        return timelineService.removeTimelineEvent(args.eventId);
      } 
    },
    Subscription: {
  
    },
  });
  