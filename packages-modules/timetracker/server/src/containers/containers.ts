import { ContainerModule, interfaces } from 'inversify';
import { TYPES } from '../constants';
import { ITimeTrackerRepository, ITimeTrackerService } from '../interfaces';
import { TimeTrackerService } from '../services';
import { TimeTrackerRepository } from '../store/repository';
import { TimesheetApprovalMailTemplate } from '../migration';
export const timeTrackerModule: (settings: any) => ContainerModule = setting =>
  new ContainerModule((bind: interfaces.Bind) => {
    bind<ITimeTrackerRepository>(TYPES.ITimeTrackerRepository)
      .to(TimeTrackerRepository)
      .inSingletonScope()
      .whenTargetIsDefault();

    bind<ITimeTrackerService>(TYPES.ITimeTrackerService)
      .to(TimeTrackerService)
      .inSingletonScope()
      .whenTargetIsDefault();

    bind('MongodbMigration')
      .to(TimesheetApprovalMailTemplate)
      .whenTargetNamed(TimesheetApprovalMailTemplate.name);
  });
