import { get } from 'lodash';

export const currentTimerSelector = (state) => (get(state, 'timerReducer.currentTimer'));