export const DEFAULT_USER = "123"
export const DEFAULT_ORG = "123"
export const TYPES = {
    ITimeTrackerService: Symbol('ITimeTrackerService'),
    ITimeRecordService: Symbol('ITimeRecordService'),
    ITimeSheetService: Symbol('ITimeSheetService'),
    ITimeTrackerRepository: Symbol('ITimeTrackerRepository')
};

export enum IPreDefineAccountPermissions  {
    viewTimeTracker = 'organization.timetracker.view',
    createTimeTracker = 'organization.timetracker.create',
    editTimeTracker = 'organization.timetracker.edit',
    deleteTimeTracker = 'organization.timetracker.delete',
    manageTimeTracker = 'organization.timetracker.manage',
}