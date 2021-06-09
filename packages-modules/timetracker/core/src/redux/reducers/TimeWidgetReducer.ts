/* eslint-disable no-case-declarations */
import { RESET_CURRENT_TIMER, SET_CURRENT_TIMER } from '../actions/TimeWidgetAction';

const initialState = {
    timetracker: {
        currentTimer: {
            endTime: null,
            startTime: null,
            projectId: '',
            taskId: '',
            id: '',
        },
    },
};

export function timerReducer(state = initialState, { type, payload }) {
    switch (type) {
        case SET_CURRENT_TIMER:
            const newState = {
                timetracker: {
                    currentTimer: payload.action,
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
