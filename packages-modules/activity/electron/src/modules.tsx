import { Feature } from '@common-stack/client-react';
import { ActivityElectronModule } from './containers';
import { onIdleTimeWatcherEpic, onIdleTimerWatcherStopEpic } from './epic/idle-epic';

export default new Feature({
    epic: [onIdleTimeWatcherEpic as any, onIdleTimerWatcherStopEpic as any],
    createContainerFunc: ActivityElectronModule,
});
