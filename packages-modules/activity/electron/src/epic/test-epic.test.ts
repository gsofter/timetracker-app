import { TestScheduler } from 'rxjs/testing';
import { map } from 'rxjs/operators';
import { logger } from '@cdm-logger/server';

describe('Marble testing in RxJs', () => {

    let testScheduer: TestScheduler;

    beforeEach(() => {
        testScheduer = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        })
    });

    it('test cold observable') {
        testScheduer.run(helpers => {
            const { cold, expectObservable } = helpers;

            const source$ = cold('--a-b--c', { a: 1, b: 2, c: 3 });
            const final$ = source$.pipe(map(val => val * 10));
            const expected = '--a-b---c';
            expectObservable(final$).toBe(expected, { a: 10, b: 20, c: 30})
        })
    }
})