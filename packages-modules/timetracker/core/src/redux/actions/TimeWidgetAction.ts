import { ITimeRecord } from '../../interfaces';

export const SET_CURRENT_TIMER = '@timer/SET_CURRENT_TIMER';
export const RESET_CURRENT_TIMER = '@timer/RESET_CURRENT_TIMER';

export const setCurrentTimerAction = (payload: ITimeRecord) => ({
    type: SET_CURRENT_TIMER,
    payload,
});

export const resetCurrentTimerAction = () => ({
    type: RESET_CURRENT_TIMER,
});
