/* eslint-disable import/no-extraneous-dependencies */
import { get } from 'lodash';

export const currentTimerSelector = (state) => get(state, 'timerReducer.timetracker.currentTimer');
