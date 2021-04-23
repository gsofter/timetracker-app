import { ContainerModule, interfaces } from 'inversify';
import { TYPES } from '../constants';
import { TimeRecordService, TimesheetService } from '../services';
import { TimeRecordRepository, TimesheetRepository } from '../store/repository';
import { TimesheetApprovalMailTemplate, TimesheetSubmitMailTemplate } from '../migration';
export const timeTrackerModule: (settings: any) => ContainerModule = (setting) =>
  new ContainerModule((bind: interfaces.Bind) => {
    bind(TYPES.ITimeRecordRepository)
      .to(TimeRecordRepository)
      .inSingletonScope()
      .whenTargetIsDefault();

    bind(TYPES.ITimesheetRepository)
      .to(TimesheetRepository)
      .inSingletonScope()
      .whenTargetIsDefault();

    bind(TYPES.ITimeRecordService).to(TimeRecordService).inSingletonScope().whenTargetIsDefault();
    bind(TYPES.ITimesheetService).to(TimesheetService).inSingletonScope().whenTargetIsDefault();

    bind('MongodbMigration')
      .to(TimesheetApprovalMailTemplate)
      .whenTargetNamed(TimesheetApprovalMailTemplate.name);

    bind('MongodbMigration')
      .to(TimesheetSubmitMailTemplate)
      .whenTargetNamed(TimesheetSubmitMailTemplate.name);
  });
