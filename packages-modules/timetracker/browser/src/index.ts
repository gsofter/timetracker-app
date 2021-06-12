import { Feature } from '@common-stack/client-react';
import TimeTracker from './timetracker/module';
import { timerReducer } from '@admin-layout/timetracker-core';

export default new Feature(TimeTracker, { reducer: { timerReducer } });
