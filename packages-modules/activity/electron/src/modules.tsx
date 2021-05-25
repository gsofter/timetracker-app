import { Feature } from '@common-stack/client-react';
import { TimerElectronModule } from './containers';
import { onIdleTimeWatcherEpic } from './epic/idle-epic';

export default new Feature({
    // epic: [onIdleTimeWatcherEpic as any],
    createContainerFunc: TimerElectronModule,
});
