import { combineReducers, Action as reduxAction } from 'redux';
import { Action } from '../actions';
import { Store } from './Store';

function isSaving(state: boolean = false, action: Action): boolean {
  switch (action.type) {
    case '@@admin-layout/SAVE_COUNT_REQUEST':
      return true;
    case '@@admin-layout/SAVE_COUNT_SUCCESS':
    case '@@admin-layout/SAVE_COUNT_ERROR':
      return false;
    default:
      return state;
  }
}

function isLoading(state: boolean = false, action: Action): boolean {
  switch (action.type) {
    case '@@admin-layout/LOAD_COUNT_REQUEST':
      return true;
    case '@@admin-layout/LOAD_COUNT_SUCCESS':
    case '@@admin-layout/LOAD_COUNT_ERROR':
      return false;
    default:
      return state;
  }
}

function error(state: string = '', action: Action): string {
  switch (action.type) {
    case '@@admin-layout/LOAD_COUNT_REQUEST':
    case '@@admin-layout/SAVE_COUNT_REQUEST':
      return '';
    case '@@admin-layout/LOAD_COUNT_ERROR':
    case '@@admin-layout/SAVE_COUNT_ERROR':
      return action.error.toString();
    default:
      return state;
  }
}

const initialState: Store.Counter = {
  value: 0,
};

function counter(state: Store.Counter = initialState, action: Action): Store.Counter {
  switch (action.type) {
    case '@@admin-layout/INCREMENT_COUNTER':
      const { delta } = action;
      return { value: state.value + delta };

    case '@@admin-layout/RESET_COUNTER':
      return { value: 0 };

    case '@@admin-layout/LOAD_COUNT_SUCCESS':
      return { value: action.response.value };

    default:
      return state;
  }
}

export const reducers = {
  '@admin-layout/counter': counter,
  '@admin-layout/isSaving': isSaving,
  '@admin-layout/isLoading': isLoading,
  '@admin-layout/error': error,
};
