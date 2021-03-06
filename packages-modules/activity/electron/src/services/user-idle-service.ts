/* eslint-disable import/no-extraneous-dependencies */
import { from, fromEvent, interval, merge, Observable, of, Subject, Subscription, timer, isObservable } from 'rxjs';
import { inject, injectable } from 'inversify';
import {
    bufferTime,
    distinctUntilChanged,
    filter,
    finalize,
    map,
    scan,
    switchMap,
    take,
    takeUntil,
    tap,
} from 'rxjs/operators';
import { IPreference_DesktopMonitoring as UserIdleConfig } from '@admin-layout/activity-core';

const ONE_SECOND = 1000 as number;
@injectable()
export class UserIdleService {
    public ping$: Observable<any>;

    /**
     * Idle timer start
     */
    protected timerStart$ = new Subject<boolean>();

    protected idleDetected$ = new Subject<boolean>();

    protected timeout$ = new Subject<boolean>();

    protected idle$: Observable<any>;

    /**
     * Idle timer
     */
    protected timer$: Observable<any>;

    /**
     * Idle value in milliseconds.
     * Default equals to 10 minutes.
     */
    protected idleMillisec = 600 * ONE_SECOND;

    /**
     * Idle buffer wait time milliseconds to collect user action
     * Default equals to 1 Sec.
     */
    protected idleSensitivityMillisec = ONE_SECOND;

    /**
     * Timeout value in seconds.
     * Default equals to 5 minutes.
     */
    protected timeout = 300;

    /**
     * Ping value in milliseconds.
     * Default equals to 2 minutes.
     */
    protected pingMilliSec = 120 * ONE_SECOND;

    /**
     * Timeout status.
     */
    protected isTimeout: boolean;

    /**
     * Timer of user's inactivity is in progress.
     */
    protected isInactivityTimer: boolean;

    protected isIdleDetected: boolean;

    protected idleSubscription: Subscription;

    constructor() {}

    /**
     * Start watching for user idle and setup timer and ping.
     */
    public startWatching(activityEvents$: Observable<any>) {
        if (this.idleSubscription) {
            this.idleSubscription.unsubscribe();
        }
        console.log('---ACTIVITY', isObservable(activityEvents$));

        this.idle$ = activityEvents$;

        // If any of user events is not active for idle-seconds when start timer.
        this.idleSubscription = this.idle$
            .pipe(
                bufferTime(this.idleSensitivityMillisec), // Starting point of detecting of user's inactivity
                tap((arr) => console.log('log activity', arr)),
                filter((arr) => !arr.length && !this.isIdleDetected && !this.isInactivityTimer),
                tap(() => {
                    this.isIdleDetected = true;
                    this.idleDetected$.next(true);
                }),
                switchMap(() =>
                    interval(ONE_SECOND).pipe(
                        takeUntil(
                            merge(
                                activityEvents$,
                                timer(this.idleMillisec).pipe(
                                    tap(() => {
                                        this.isInactivityTimer = true;
                                        this.timerStart$.next(true);
                                    }),
                                ),
                            ),
                        ),
                        finalize(() => {
                            this.isIdleDetected = false;
                            this.idleDetected$.next(false);
                        }),
                    ),
                ),
            )
            .subscribe();

        this.setupInactiveTimer(this.timeout);
        this.setupPing(this.pingMilliSec);
    }

    public stopWatching() {
        this.stopTimer();
        if (this.idleSubscription) {
            this.idleSubscription.unsubscribe();
        }
    }

    public stopTimer() {
        this.isInactivityTimer = false;
        this.timerStart$.next(false);
    }

    public resetTimer() {
        this.stopTimer();
        this.isTimeout = false;
    }

    public onInactiveTimerStart(): Observable<number> {
        return this.timerStart$.pipe(
            distinctUntilChanged(),
            switchMap((start) => (start ? this.timer$ : of(null))),
        );
    }

    /**
     * Retrun observable for idle status changed
     */
    onIdleStartusChanged(): Observable<boolean> {
        return this.idleDetected$.asObservable();
    }

    /**
     * Return observable for timeout is fired.
     */
    onTimeout(): Observable<boolean> {
        return this.timeout$.pipe(
            filter((timeout) => !!timeout),
            tap(() => {
                this.isTimeout = true;
            }),
            map(() => true),
        );
    }

    public getConfigValue(): UserIdleConfig {
        return {
            idle: this.idleMillisec / ONE_SECOND,
            idleSensitivity: this.idleSensitivityMillisec / ONE_SECOND,
            timeout: this.timeout,
            ping: this.pingMilliSec / ONE_SECOND,
        };
    }

    public setConfigValues(config: UserIdleConfig) {
        if (this.idleSubscription && !this.idleSubscription.closed) {
            console.error('Call stopWatching() before set config values');
            return;
        }
        this.setConfig(config);
    }

    private setConfig(config: UserIdleConfig) {
        if (config.idle) {
            this.idleMillisec = config.idle * ONE_SECOND;
        }
        if (config.ping) {
            this.pingMilliSec = config.ping * ONE_SECOND;
        }
        if (config.idleSensitivity) {
            this.idleSensitivityMillisec = config.idleSensitivity * ONE_SECOND;
        }
        if (config.timeout) {
            this.timeout = config.timeout;
        }
    }

    // /**
    //  * Set custom activity events
    //  *
    //  * @param customEvents Example: merge(
    //  * )
    //  */
    // setCustomActivityEvents(customEvents: Observable<any>) {
    //     if (this.idleSubscription && !this.idleSubscription.closed) {
    //         console.error('Call stopWatching() before set custom acvitiy events');
    //         return;
    //     }
    //     this.activityEvents$ = customEvents;
    // }

    /**
     * Setup timer.
     *
     * Counts every second and return n+1 and fire timeout for last count.
     * @param timeout Timeout in seconds.
     */
    protected setupInactiveTimer(timeout: number) {
        this.timer$ = interval(ONE_SECOND).pipe(
            take(timeout),
            map(() => 1),
            scan((acc, n) => acc + n),
            tap((count) => {
                if (count === timeout) {
                    this.timeout$.next(true);
                }
            }),
        );
    }

    /**
     * Setup ping.
     *
     * Pings ever ping-seconds only if is not timeout.
     * @param pingMilliSec
     */
    protected setupPing(pingMilliSec: number) {
        this.ping$ = interval(pingMilliSec).pipe(filter(() => !this.isTimeout));
    }
}
