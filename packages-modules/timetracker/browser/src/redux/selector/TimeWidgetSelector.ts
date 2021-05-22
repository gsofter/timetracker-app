import { get } from 'lodash';

export const currentTimerSelector = (state) => (get(state, 'timerReducer.timetracker.currentTimer'));