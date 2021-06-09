export const SET_CURRENT_TIMER = '@timer/SET_CURRENT_TIMER';
export const RESET_CURRENT_TIMER = '@timer/RESET_CURRENT_TIMER';

export const setCurrentTimerAction = (action) => ({
  type: SET_CURRENT_TIMER,
  payload: { action },
});

export const resetCurrentTimerAction = () => ({
  type: RESET_CURRENT_TIMER,
});
