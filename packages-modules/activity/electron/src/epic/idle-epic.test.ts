/* eslint-disable jest/prefer-strict-equal */
/* eslint-disable jest/no-hooks */
/* eslint-disable import/no-extraneous-dependencies */
import 'reflect-metadata';
import { TestScheduler } from 'rxjs/testing';
import { inject, Container } from 'inversify';
import { logger } from '@cdm-logger/server';
import { onIdleTimeWatcherEpic, SET_CURRENT_TIMER, RESET_CURRENT_TIMER } from './idle-epic';
import { ActivityElectronModule } from '../containers';

require('dotenv').config({ path: process.env.ENV_FILE });

describe('idle check', () => {
    let testScheduler: TestScheduler;
    let dependencies: any;

    // const generateContainer = (cold) => ({
    //     get: () => cold('--a', {

    //     }
    // });
    const timerMarble = {
        a: {
            type: SET_CURRENT_TIMER,
            payload: {},
        },
        b: {
            type: RESET_CURRENT_TIMER,
        },
    };
    beforeEach(() => {
        const container = new Container();
        // container.load(ActivityElectronModule());
        testScheduler = new TestScheduler((actual, expected) => {
            // console.log('actual', JSON.stringify(actual));
            // console.log('expected', JSON.stringify(expected));
            expect(actual).toEqual(expected);
        });
        dependencies = (cold) => ({
            container,
            logger,
        });
    });

    afterEach(() => {
        testScheduler.flush();
        testScheduler = null;
    });

    const resultMarble = {
        x: {
            type: 'test',
        },
    };

    it('idle check', async () => {
        testScheduler.run(({ hot, cold, expectObservable }) => {
            const action$ = hot<any>('-a-b', timerMarble);
            const state$ = null;
            const output$ = onIdleTimeWatcherEpic(action$, state$, dependencies(cold));
            expectObservable(output$).toBe('-x|', resultMarble);
        });
    });
});
