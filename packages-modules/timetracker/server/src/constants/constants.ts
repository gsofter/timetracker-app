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

export const EmailTemplateCodes = {
  TIMESHEET_APPROVAL: 'TIMESHEET_APPROVAL_EMAIL_TEMPLATE',
  ENABLE_TIMETRACKER: 'ENABLE_TIMETRACKER_EMAIL_TEMPLATE',
  SUBMIT_TIME: 'SUBMIT_TIME_EMAIL_TEMPLATE',
  TIMETRACKING_STOP: 'TIMETRACKING_STOP_TEMPLATE',
};

export enum IPreDefineAccountPermissions {
  // others
  viewOthersTimeTracker = 'organization.timetracker.others.view',
  createOthersTimeTracker = 'organization.timetracker.others.create',
  editOthersTimeTracker = 'organization.timetracker.others.edit',
  deleteOthersTimeTracker = 'organization.timetracker.others.delete',
  manageOthersTimeTracker = 'organization.timetracker.others.manage',

  // self
  viewSelfTimeTracker = 'organization.timetracker.self.view',
  createSelfTimeTracker = 'organization.timetracker.self.create',
  editSelfTimeTracker = 'organization.timetracker.self.edit',
  deleteSelfTimeTracker = 'organization.timetracker.self.delete',
  manageSelfTimeTracker = 'organization.timetracker.self.manage',
}
