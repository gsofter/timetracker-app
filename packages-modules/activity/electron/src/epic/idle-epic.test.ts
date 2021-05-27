/* eslint-disable class-methods-use-this */
/* eslint-disable jest/prefer-strict-equal */
/* eslint-disable jest/no-hooks */
/* eslint-disable import/no-extraneous-dependencies */
import 'reflect-metadata';
import { TestScheduler } from 'rxjs/testing';
import { logger } from '@cdm-logger/server';
import { onIdleTimeWatcherEpic, SET_CURRENT_TIMER, RESET_CURRENT_TIMER } from './idle-epic';
import { ActivityService } from '../services/activity-service';
import { UserIdleService } from '../services/user-idle-service';

require('dotenv').config({ path: process.env.ENV_FILE });

/**
 * When start activity services, it look for events from cold observable.
 *
 */

describe('idle check', () => {
    let testScheduler: TestScheduler;
    const TestTracking1 = (cold) => ({
        interactivity$: cold('--a---a-----a----a-------a--a--a-a----|', {
            a: [
                { button: 0, clicks: 0, x: 926, y: 936, type: 'mousemove' },
                { button: 0, clicks: 0, x: 900, y: 949, type: 'mousemove' },
                { button: 0, clicks: 0, x: 900, y: 949, type: 'mousemove' },
                { button: 0, clicks: 0, x: 899, y: 949, type: 'mousemove' },
            ],
            b: [
                {
                    amount: 10,
                    clicks: 1,
                    direction: 3,
                    rotation: -2,
                    type: 'mousewheel',
                    x: 793,
                    y: 909,
                },
                {
                    amount: 12,
                    clicks: 1,
                    direction: 3,
                    rotation: -2,
                    type: 'mousewheel',
                    x: 793,
                    y: 909,
                },
            ],
        }),
        startMonitoring: () => { },
        stopMonitoring: () => { },
    });
    const timerMarble = {
        a: {
            type: SET_CURRENT_TIMER,
            payload: {},
        },
        b: {
            type: RESET_CURRENT_TIMER,
        },
    };
    const dependencies = (cold) => {
        console.log('---Here', cold);
        const testObservable = {
            interactivity: cold('-a-a-a-a|', {
                a: [
                    { button: 0, clicks: 0, x: 926, y: 936, type: 'mousemove' },
                    { button: 0, clicks: 0, x: 900, y: 949, type: 'mousemove' },
                    { button: 0, clicks: 0, x: 900, y: 949, type: 'mousemove' },
                    { button: 0, clicks: 0, x: 899, y: 949, type: 'mousemove' },
                ],
                b: [
                    {
                        amount: 10,
                        clicks: 1,
                        direction: 3,
                        rotation: -2,
                        type: 'mousewheel',
                        x: 793,
                        y: 909,
                    },
                    {
                        amount: 12,
                        clicks: 1,
                        direction: 3,
                        rotation: -2,
                        type: 'mousewheel',
                        x: 793,
                        y: 909,
                    },
                ],
            }),
            startMonitoring: () => { },
            stopMonitoring: () => { },
        };
        const idleService = new UserIdleService();
        const activityService = new ActivityService(idleService, testObservable);
        const container = {
            get: () => activityService,
        };
        return {
            container,
            logger,
        };
    };
    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            console.log('actual', JSON.stringify(actual));
            console.log('expected', JSON.stringify(expected));
            expect(actual).toEqual(expected);
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
        console.log('---IDEL CHECK----');
        testScheduler.run(({ hot, cold, expectObservable }) => {
            const action$ = hot<any>('-a-b', timerMarble);
            const state$ = null;
            const output$ = onIdleTimeWatcherEpic(action$, state$, dependencies(cold) as any);
            expectObservable(output$).toBe('-x|', resultMarble);
        });
    });
});
