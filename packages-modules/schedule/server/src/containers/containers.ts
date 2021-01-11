import { ContainerModule, interfaces } from 'inversify';
import { TYPES } from '../constants';
import { IScheduleRepository, IScheduleCreateRequest, IScheduleService } from '../interfaces'
import { ScheduleService } from '../services';
import { ScheduleRepository } from '../store/repository';

export const scheduleModule: (settings: any) => ContainerModule = (setting) => new ContainerModule((bind: interfaces.Bind) => {
    bind<IScheduleRepository>(TYPES.IScheduleRepository)
        .to(ScheduleRepository)
        .inSingletonScope()
        .whenTargetIsDefault()

    bind<IScheduleService>(TYPES.IScheduleService).
        to(ScheduleService)
        .inSingletonScope()
        .whenTargetIsDefault();
}) 