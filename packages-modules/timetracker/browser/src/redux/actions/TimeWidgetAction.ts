export const SET_CURRENT_TIMER = '@timer/SET_CURRENT_TIMER';
export const RESET_CURRENT_TIMER = '@timer/SET_CURRENT_TIMER';
export const SET_TIMER_TICK = '@timer/SET_TIMER_TICK';

export const setCurrentTimerAction = (payload) => ({
  type: SET_CURRENT_TIMER,
  payload,
});