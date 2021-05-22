import { ContainerModule, interfaces, Container } from 'inversify';
import { IClientContainerService } from '@admin-layout/activity-core';
import { ActivityService } from '../services/activity-service';

export const TimerElectronModule: () => interfaces.ContainerModule = () =>
    new ContainerModule((bind: interfaces.Bind) => {
        bind(IClientContainerService.ActivtyService).to(ActivityService).inSingletonScope();
    });
