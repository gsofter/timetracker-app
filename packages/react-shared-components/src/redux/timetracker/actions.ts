import { Action } from 'redux';

export const SET_CURRENT_TIMER = '@timer/SET_CURRENT_TIMER';
export const RESET_CURRENT_TIMER = '@timer/SET_CURRENT_TIMER';
export const SET_TIMER_TICK = '@timer/SET_TIMER_TICK';

interface setCurrentTimerAction extends Action {
  type: typeof SET_CURRENT_TIMER,
  payload: object | boolean,
}

export const setCurrentTimerAction = (action): setCurrentTimerAction => ({
  type: SET_CURRENT_TIMER,
  payload: { action },
});