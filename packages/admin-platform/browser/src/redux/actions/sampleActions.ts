import * as redux from 'redux';

import { api } from '../../api';
import { Store } from '../reducers/index';

export type Q<T> = { request: T };
export type S<T> = { response: T };
export type E = { error: Error };

export type QEmpty = Q<null>;
export type QValue = Q<{ value: number }>;

export type Action =
    // UI actions
    | { type: '@@admin-layout/INCREMENT_COUNTER'; delta: number }
    | { type: '@@admin-layout/RESET_COUNTER' }

    // API Requests
    | ({ type: '@@admin-layout/SAVE_COUNT_REQUEST' } & QValue)
    | ({ type: '@@admin-layout/SAVE_COUNT_SUCCESS' } & QValue & S<{}>)
    | ({ type: '@@admin-layout/SAVE_COUNT_ERROR' } & QValue & E)
    | ({ type: '@@admin-layout/LOAD_COUNT_REQUEST' } & QEmpty)
    | ({ type: '@@admin-layout/LOAD_COUNT_SUCCESS' } & QEmpty &
        S<{ value: number }>)
    | ({ type: '@@admin-layout/LOAD_COUNT_ERROR' } & QEmpty & E);

export const incrementCounter = (delta: number): Action => ({
    type: '@@admin-layout/INCREMENT_COUNTER',
    delta,
});

export const resetCounter = (): Action => ({
    type: '@@admin-layout/RESET_COUNTER',
});

export type ApiActionGroup<_Q, _S> = {
    request: (q?: _Q) => Action & Q<_Q>;
    success: (s: _S, q?: _Q) => Action & Q<_Q> & S<_S>;
    error: (e: Error, q?: _Q) => Action & Q<_Q> & E;
};

const _saveCount: ApiActionGroup<{ value: number }, {}> = {
    request: (request) => ({
        type: '@@admin-layout/SAVE_COUNT_REQUEST',
        request,
    }),
    success: (response, request) => ({
        type: '@@admin-layout/SAVE_COUNT_SUCCESS',
        request,
        response,
    }),
    error: (error, request) => ({
        type: '@@admin-layout/SAVE_COUNT_ERROR',
        request,
        error,
    }),
};

const _loadCount: ApiActionGroup<null, { value: number }> = {
    request: (request) => ({
        type: '@@admin-layout/LOAD_COUNT_REQUEST',
        request: null,
    }),
    success: (response, request) => ({
        type: '@@admin-layout/LOAD_COUNT_SUCCESS',
        request: null,
        response,
    }),
    error: (error, request) => ({
        type: '@@admin-layout/LOAD_COUNT_ERROR',
        request: null,
        error,
    }),
};

type apiFunc<Q, S> = (q: Q) => Promise<S>;

function apiActionGroupFactory<Q, S>(
    x: ApiActionGroup<Q, S>,
    go: apiFunc<Q, S>,
) {
    return (request: Q) => (dispatch: redux.Dispatch) => {
        dispatch(x.request(request));
        go(request)
            .then((response) => dispatch(x.success(response, request)))
            .catch((e: Error) => dispatch(x.error(e, request)));
    };
}

export const saveCount = apiActionGroupFactory(_saveCount, api.save);
export const loadCount = apiActionGroupFactory(_loadCount, api.load);
