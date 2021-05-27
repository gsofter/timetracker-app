/* eslint-disable import/no-extraneous-dependencies */
import { Observable, of } from 'rxjs';
import { Container } from 'inversify';
import { mergeMap, takeUntil, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { IClientContainerService } from '@admin-layout/activity-core';
import { CdmLogger } from '@cdm-logger/core';
import { ActivityService } from '../services/activity-service';

export const SET_CURRENT_TIMER = '@timer/SET_CURRENT_TIMER';
export const RESET_CURRENT_TIMER = '@timer/RESET_CURRENT_TIMER';

// function* checkIdle() {
//     const idleTime = system.getIdleTime();
//     const idleState = yeild;
// }
export const onIdleTimeWatcherEpic = (
    action$: Observable<any>,
    state$: Observable<any>,
    {
        container,
        logger,
    }: {
        container: Container;
        logger: CdmLogger.ILogger;
    },
) =>
    action$.pipe(
        ofType(SET_CURRENT_TIMER),
        tap(() => console.log('---IDEL EPIC')),
        mergeMap(() => {
            const activityService = container.get<ActivityService>(IClientContainerService.ActivtyService);
            activityService.onStartWatching();
            return of({ type: 'TIMER_START' });
        }),
    );

export const onIdleTimerWatcherStopEpic = (
    action$: Observable<any>,
    state$: Observable<any>,
    {
        container,
        logger,
    }: {
        container: Container;
        logger: CdmLogger.ILogger;
    },
) =>
    action$.pipe(
        ofType(RESET_CURRENT_TIMER),
        tap(() => console.log('----')),
        mergeMap(() => {
            const activityService = container.get<ActivityService>(IClientContainerService.ActivtyService);
            activityService.onStopWatching();
            return of({ type: 'TIMER_STOP' });
        }),
    );
