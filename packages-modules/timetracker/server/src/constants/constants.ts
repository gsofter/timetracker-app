export const DEFAULT_USER = '123';
export const DEFAULT_ORG = '123';
export const TYPES = {
  ITimeTrackerService: Symbol('ITimeTrackerService'),
  ITimeRecordService: Symbol('ITimeRecordService'),
  ITimesheetService: Symbol('ITimesheetService'),
  ITimeTrackerRepository: Symbol('ITimeTrackerRepository'),
  ITimeRecordRepository: Symbol('ITimeRecordRepository'),
  ITimesheetRepository: Symbol('ITimesheetRepository'),
};

export enum IPreDefineAccountPermissions {
  viewTimeTracker = 'organization.timetracker.view',
  createTimeTracker = 'organization.timetracker.create',
  editTimeTracker = 'organization.timetracker.edit',
  deleteTimeTracker = 'organization.timetracker.delete',
  manageTimeTracker = 'organization.timetracker.manage',
}

export const EmailTemplateCodes = {
  TIMESHEET_APPROVAL: 'TIMESHEET_APPROVAL_EMAIL_TEMPLATE',
  ENABLE_TIMETRACKER: 'ENABLE_TIMETRACKER_EMAIL_TEMPLATE',
  SUBMIT_TIME: 'SUBMIT_TIME_EMAIL_TEMPLATE',
  TIMETRACKING_STOP: 'TIMETRACKING_STOP_TEMPLATE',
};
