import {
  RESET_CURRENT_TIMER,
  SET_CURRENT_TIMER,
} from '../actions/TimeWidgetAction';

const initialState = {
  timetracker: {
    currentTimer: {
      endTime: null,
      startTime: null,
      projectId: '',
      taskId: '',
      id: '',
    },
  }
};

export function timerReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_CURRENT_TIMER:
      state.timetracker.currentTimer = payload.action;
      return {
        ...state
      };
    case RESET_CURRENT_TIMER:
      state = {
        timetracker: {
          currentTimer: {
            endTime: null,
            startTime: null,
            projectId: '',
            taskId: '',
            id: '',
          }
        }
      };
      return { ...state };
    default:
      return state;
  }
}
