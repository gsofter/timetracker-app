import { Feature } from '@common-stack/client-react';
import ElectronTray from './timetracker/module-tray.electron';
import { timerReducer } from './redux/reducers/TimeWidgetReducer';

export default new Feature(ElectronTray, { reducer: { timerReducer } });
