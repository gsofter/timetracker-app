/* eslint-disable no-case-declarations */
import { RESET_CURRENT_TIMER, SET_CURRENT_TIMER } from '../actions/TimeWidgetAction';
import { ITimeRecord } from '../../interfaces/generated-models';
import { ITimerAction } from '../../interfaces/redux';

const initialState = {
    timetracker: {
        currentTimer: {
            endTime: null,
            startTime: null,
            projectId: '',
            taskId: '',
            id: '',
        } as ITimeRecord,
    },
};

export function timerReducer(state = initialState, { type, payload }: ITimerAction) {
    switch (type) {
        case SET_CURRENT_TIMER:
            const newState = {
                timetracker: {
                    currentTimer: payload,
                },
            };
            return {
                ...state,
                ...newState,
            };
        case RESET_CURRENT_TIMER:
            return { ...state, ...initialState };
        default:
            return state;
    }
}
