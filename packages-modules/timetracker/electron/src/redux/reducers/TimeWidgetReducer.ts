import { RESET_CURRENT_TIMER, SET_CURRENT_TIMER, SET_TIMER_TICK } from '../actions/TimeWidgetAction';

const initialState = {
  timerTick: null,
  currentTimer: null,
  pagination: {
    page: 1,
    limit: 50,
    disabled: false,
  },
};

export function timerReducer(state = initialState , { type, payload }) {
  switch (type) {
    case SET_TIMER_TICK:
      return { ...state };
    case SET_CURRENT_TIMER:
      return { ...state };
    case RESET_CURRENT_TIMER:
      return { ...state };
    default:
      return state;
  }
}
