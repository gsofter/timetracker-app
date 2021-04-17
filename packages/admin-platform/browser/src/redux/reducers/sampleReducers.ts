import { combineReducers, Action as reduxAction } from 'redux';
import { Action } from '../actions';
import { Store } from './Store';

function isSaving(state = false, action: Action): boolean {
  switch (action.type) {
    case '@@admin-layhout/SAVE_COUNT_REQUEST':
      return true;
    case '@@admin-layhout/SAVE_COUNT_SUCCESS':
    case '@@admin-layhout/SAVE_COUNT_ERROR':
      return false;
    default:
      return state;
  }
}

function isLoading(state = false, action: Action): boolean {
  switch (action.type) {
    case '@@admin-layhout/LOAD_COUNT_REQUEST':
      return true;
    case '@@admin-layhout/LOAD_COUNT_SUCCESS':
    case '@@admin-layhout/LOAD_COUNT_ERROR':
      return false;
    default:
      return state;
  }
}

function error(state = '', action: Action): string {
  switch (action.type) {
    case '@@admin-layhout/LOAD_COUNT_REQUEST':
    case '@@admin-layhout/SAVE_COUNT_REQUEST':
      return '';
    case '@@admin-layhout/LOAD_COUNT_ERROR':
    case '@@admin-layhout/SAVE_COUNT_ERROR':
      return action.error.toString();
    default:
      return state;
  }
}

const initialState: Store.Counter = {
  value: 0,
};

function counter(
  state: Store.Counter = initialState,
  action: Action,
): Store.Counter {
  switch (action.type) {
    case '@@admin-layhout/INCREMENT_COUNTER':
      const { delta } = action;
      return { value: state.value + delta };

    case '@@admin-layhout/RESET_COUNTER':
      return { value: 0 };

    case '@@admin-layhout/LOAD_COUNT_SUCCESS':
      return { value: action.response.value };

    default:
      return state;
  }
}

export const reducers = {
  '@admin-layhout/counter': counter,
  '@admin-layhout/isSaving': isSaving,
  '@admin-layhout/isLoading': isLoading,
  '@admin-layhout/error': error,
};
