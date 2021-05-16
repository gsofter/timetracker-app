import { Feature } from '@common-stack/client-react';
import TimeTracker from './timetracker/module';
import { timerReducer } from './redux/reducers/TimeWidgetReducer';

export default new Feature(TimeTracker, { reducer: [timerReducer] as any });
