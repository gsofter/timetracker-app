import { ContainerModule, interfaces } from 'inversify';
import { TYPES } from '../constants';
import {
  IScheduleRepository,
  ITimelineRepository,
  ITimesheetRepository,
  IScheduleService,
  ITimelineService,
  ITimesheetService,
} from '../interfaces';
import { ScheduleService, TimelineService, TimesheetService } from '../services';
import { ScheduleRepository, TimelineRepository, TimesheetRepository } from '../store/repository';

export const scheduleModule: (settings: any) => ContainerModule = setting =>
  new ContainerModule((bind: interfaces.Bind) => {
    bind<IScheduleRepository>(TYPES.IScheduleRepository)
      .to(ScheduleRepository)
      .inSingletonScope()
      .whenTargetIsDefault();

    bind<IScheduleService>(TYPES.IScheduleService)
      .to(ScheduleService)
      .inSingletonScope()
      .whenTargetIsDefault();
  });

export const timelineModule: (settings: any) => ContainerModule = setting =>
  new ContainerModule((bind: interfaces.Bind) => {
    bind<ITimelineRepository>(TYPES.ITimelineRepository)
      .to(TimelineRepository)
      .inSingletonScope()
      .whenTargetIsDefault();

    bind<ITimelineService>(TYPES.ITimelineService)
      .to(TimelineService)
      .inSingletonScope()
      .whenTargetIsDefault();
  });

export const timesheetModule: (settings: any) => ContainerModule = setting =>
  new ContainerModule((bind: interfaces.Bind) => {
    bind<ITimesheetRepository>(TYPES.ITimesheetRepository)
      .to(TimesheetRepository)
      .inSingletonScope()
      .whenTargetIsDefault();

    bind<ITimesheetService>(TYPES.ITimesheetService)
      .to(TimesheetService)
      .inSingletonScope()
      .whenTargetIsDefault();
  });
