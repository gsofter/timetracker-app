import 'jest';

import { createStore } from 'redux';
import * as apiExports from '../../../api';
import * as actions from '../sampleActions';

jest.mock('../../api');

const api: jest.Mocked<apiExports.Api> = apiExports.api as any;

describe('actions', () => {
    const store = () => {
        const reducer = jest.fn();
        const { dispatch } = createStore(reducer);
        reducer.mockReset(); // ignore @@redux/INIT
        return { dispatch, reducer };
    };

    const eventually = (assertFn) =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    assertFn();
                } catch (e) {
                    return reject(e);
                }
                resolve();
            }, 1);
        });

    const expectTypes = (reducer, types) => () =>
        expect(reducer.mock.calls.map((x) => x[1].type)).toEqual(types);

    describe('.saveCount', () => {
        beforeEach(() => {
            api.save.mockReturnValue(Promise.resolve(null));
        });

        it('sends an API request', () => {
            actions.saveCount({ value: 14 })(jest.fn());
            expect(api.save.mock.calls).toHaveLength(1);
        });

        describe('when API request succeeds', () => {
            it('dispatches @@admin-layout/SAVE_COUNT_SUCCESS', () => {
                const { dispatch, reducer } = store();
                actions.saveCount({ value: 14 })(dispatch);
                return eventually(
                    expectTypes(reducer, [
                        '@@admin-layout/SAVE_COUNT_REQUEST',
                        '@@admin-layout/SAVE_COUNT_SUCCESS',
                    ]),
                );
            });
        });

        describe('when API request fails', () => {
            beforeEach(() => {
                api.save.mockReturnValue(
                    Promise.reject(new Error('something terrible happened')),
                );
            });

            it('dispatches @@admin-layout/SAVE_COUNT_ERROR', () => {
                const { dispatch, reducer } = store();
                actions.saveCount({ value: 14 })(dispatch);
                return eventually(
                    expectTypes(reducer, [
                        '@@admin-layout/SAVE_COUNT_REQUEST',
                        '@@admin-layout/SAVE_COUNT_ERROR',
                    ]),
                );
            });

            it('includes error message with @@admin-layout/SAVE_COUNT_ERROR', () => {
                const { dispatch, reducer } = store();
                actions.saveCount({ value: 14 })(dispatch);
                return eventually(() => {
                    expect(reducer.mock.calls[1][1].error.message).toEqual(
                        'something terrible happened',
                    );
                });
            });

            it('includes request with @@admin-layout/SAVE_COUNT_ERROR for convenience', () => {
                const { dispatch, reducer } = store();
                actions.saveCount({ value: 14 })(dispatch);
                return eventually(() => {
                    expect(reducer.mock.calls[1][1].request).toEqual({
                        value: 14,
                    });
                });
            });
        });
    });

    describe('.loadCount', () => {
        beforeEach(() => {
            api.load.mockReturnValue(Promise.resolve({ value: 14 }));
        });

        it('sends an API request', () => {
            actions.loadCount(null)(jest.fn());
            expect(api.load.mock.calls).toHaveLength(1);
        });

        describe('when API request succeeds', () => {
            it('dispatches @admin-layout/LOAD_COUNT_SUCCESS', () => {
                const { dispatch, reducer } = store();
                actions.loadCount(null)(dispatch);
                return eventually(
                    expectTypes(reducer, [
                        '@@admin-layout/LOAD_COUNT_REQUEST',
                        '@@admin-layout/LOAD_COUNT_SUCCESS',
                    ]),
                );
            });

            it('includes new value with LOAD_COUNT_SUCCESS', () => {
                const { dispatch, reducer } = store();
                actions.loadCount(null)(dispatch);
                return eventually(() => {
                    expect(reducer.mock.calls[1][1].response).toEqual({
                        value: 14,
                    });
                });
            });
        });

        describe('when API request fails', () => {
            beforeEach(() => {
                api.load.mockReturnValue(
                    Promise.reject(new Error('something terrible happened')),
                );
            });

            it('dispatches @@admin-layout/LOAD_COUNT_ERROR', () => {
                const { dispatch, reducer } = store();
                actions.loadCount(null)(dispatch);
                return eventually(
                    expectTypes(reducer, [
                        '@@admin-layout/LOAD_COUNT_REQUEST',
                        '@@admin-layout/LOAD_COUNT_ERROR',
                    ]),
                );
            });

            it('includes error message with @@admin-layout/LOAD_COUNT_ERROR', () => {
                const { dispatch, reducer } = store();
                actions.loadCount(null)(dispatch);
                return eventually(() => {
                    expect(reducer.mock.calls[1][1].error.message).toEqual(
                        'something terrible happened',
                    );
                });
            });
        });
    });
});
