/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-underscore-dangle */
import * as _ from 'lodash';
import { withFilter } from 'graphql-subscriptions';
import { ITimeRecordPubSubEvents } from '@admin-layout/timetracker-core';

export const resolver = (options) => ({
  Query: {
    getTimeRecords: (root, args, { timeRecordService, user, userContext }) => {
      options.logger.trace('(Query.getTimeRecords) args %j', args);
      return timeRecordService.getTimeRecords(userContext.orgId, args.userId);
    },
    getDurationTimeRecords: (root, args, { timeRecordService, user, userContext }) => {
      options.logger.trace('(Query.getDurationTimeRecords) args %j', args);
      return timeRecordService.getDurationTimeRecords(userContext.orgId, args.startTime, args.endTime, args.userId);
    },
    getPlayingTimeRecord: (root, args, { timeRecordService, user, userContext }) => {
      options.logger.trace('(Query.getPlayingTimeRecord) args %j', args);
      return timeRecordService.getPlayingTimeRecord(user._id || user.sub, userContext.orgId);
    },
  },
  Mutation: {
    createTimeRecord: (root, args, { timeRecordService, user, userContext }) => {
      options.logger.trace('(Mutation.createTimeRecord) args %j', args);
      let { userId } = args.request;
      if (userId === undefined) userId = user._id || user.sub;
      return timeRecordService.createTimeRecord(userId, userContext.orgId, args.request);
    },
    updateTimeRecord: (root, args, { timeRecordService, user, userContext }) => {
      options.logger.trace('(Mutation.updateTimeRecord) args %j', args);
      let { userId } = args.request;
      if (userId === undefined) userId = user._id || user.sub;
      return timeRecordService.updateTimeRecord(userId, userContext.orgId, args.recordId, args.request);
    },
    removeTimeRecord: (root, args, { timeRecordService, user, userContext }) => {
      options.logger.trace('(Mutation.removeTimeRecord) args %j', args);
      const userId = user._id || user.sub;
      return timeRecordService.removeTimeRecord(userId, userContext.orgId, args.recordId);
    },
    removeDurationTimeRecords: (root, args, { timeRecordService, user, userContext }) => {
      options.logger.trace('(Mutation.removeDurationTimeRecords) args %j', args);
      const userId = user._id || user.sub;
      return timeRecordService.removeDurationTimeRecords(
        userId,
        userContext.orgId,
        args.startTime,
        args.endTime,
        args.projectId,
      );
    },
  },
  Subscription: {
    SubscribeToOrganizationContext: {
      subscribe: withFilter(
        () =>
          options.pubsub.asyncIterator([
            ITimeRecordPubSubEvents.TimeRecordCreated,
            ITimeRecordPubSubEvents.TimeRecordUpdated,
            ITimeRecordPubSubEvents.TimeRecordDeleted,
          ]),
        async (payload, variables, context: {}) =>
          payload.SubscribeToOrganizationContext.orgId === variables.orgNameFilter &&
          payload.SubscribeToOrganizationContext.userId === variables.userId,
      ),
    },
  },
});
