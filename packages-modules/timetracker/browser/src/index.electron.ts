import { Feature } from '@common-stack/client-react';
import ElectronTray from './timetracker/module-tray.electron';
import { timerReducer } from '@admin-layout/timetracker-core';

export default new Feature(ElectronTray, { reducer: { timerReducer } });
