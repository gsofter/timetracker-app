import { ContainerModule, interfaces } from 'inversify';
import { TYPES } from '../constants';
import { TimeTrackerService } from '../services';
import { TimeTrackerRepository } from '../store/repository';
import { TimesheetApprovalMailTemplate, TimesheetSubmitMailTemplate } from '../migration';
export const timeTrackerModule: (settings: any) => ContainerModule = setting =>
  new ContainerModule((bind: interfaces.Bind) => {
    bind(TYPES.ITimeTrackerRepository)
      .to(TimeTrackerRepository)
      .inSingletonScope()
      .whenTargetIsDefault();

    bind(TYPES.ITimeTrackerService)
      .to(TimeTrackerService)
      .inSingletonScope()
      .whenTargetIsDefault();

    bind('MongodbMigration')
      .to(TimesheetApprovalMailTemplate)
      .whenTargetNamed(TimesheetApprovalMailTemplate.name);

    bind('MongodbMigration')
      .to(TimesheetSubmitMailTemplate)
      .whenTargetNamed(TimesheetSubmitMailTemplate.name);
  });
