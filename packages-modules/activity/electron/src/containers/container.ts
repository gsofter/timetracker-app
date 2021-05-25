import { ContainerModule, interfaces, Container } from 'inversify';
import { IClientContainerService } from '@admin-layout/activity-core';
import { ActivityService } from '../services/activity-service';
import { UserIdleService } from '../services/user-idle-service';

export const ActivityElectronModule: () => interfaces.ContainerModule = () =>
    new ContainerModule((bind: interfaces.Bind) => {
        bind(IClientContainerService.ActivtyService).to(ActivityService).inSingletonScope();
        bind(IClientContainerService.UserIdleService).to(UserIdleService).inSingletonScope();
    });
