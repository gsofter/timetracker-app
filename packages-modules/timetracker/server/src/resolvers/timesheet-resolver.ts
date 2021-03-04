import { request } from 'express';
import { DEFAULT_USER, DEFAULT_ORG } from '../constants'
import { ITimesheet } from '@admin-layout/timetracker-core'

export const resolver = (options) => ({
    Query: {
      getTimesheets: (root, args, { timeTrackerService }) => {
        options.logger.trace('(Query.getTimeSheets) args %j', args)
        return timeTrackerService.getTimesheets(args.userId, DEFAULT_ORG);
      },
      getDurationTimesheet: (root, args, { timeTrackerService }) => {
        options.logger.trace('(Query.getTimeSheets) args %j', args)
        return timeTrackerService.getDurationTimesheet(DEFAULT_USER, DEFAULT_ORG, args.start, args.end);
      },
    },
    
    Mutation: {
      createTimesheet: (root, args, { timeTrackerService }) => {
        options.logger.trace('(Mutation.createTimesheet) args %j', args)
        return timeTrackerService.createTimesheet(DEFAULT_USER, DEFAULT_ORG, args.request);
      },
      updateTimesheet: (root, args, { timeTrackerService }) => {
        options.logger.trace('(Mutation.updateTimesheet) args %j', args)
        return timeTrackerService.updateTimesheet(DEFAULT_USER, DEFAULT_ORG, args.sheetId, args.request);
      },
      removeTimesheet: (root, args, { timeTrackerService }) => {
        options.logger.trace('(Mutation.removeTimesheet) args %j', args)
        return timeTrackerService.removeTimesheet(DEFAULT_USER, DEFAULT_ORG, args.sheetId);
      },
      updateTimesheetStatus: (root, args, { timeTrackerService }) => {
        options.logger.trace('(Mutation.updateTimesheetStatus) args %j', args)
        return timeTrackerService.updateTimesheetStatus(DEFAULT_USER, DEFAULT_ORG, request);
      },
    },
    Subscription: {
  
    },
  });
  