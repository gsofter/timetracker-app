/* eslint-disable import/no-extraneous-dependencies */
import { from, fromEvent, interval, merge, Observable, of, Subject, Subscription, timer } from 'rxjs';
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

export class UserIdleService {
    ping$: Observable<any>;

    /**
     * Events that can interrupts user's inactivity timer.
     */
    protected activityEvents$: Observable<any>;

    protected timerStart$ = new Subject<boolean>();

    protected idleDetected$ = new Subject<boolean>();

    protected timeout$ = new Subject<boolean>();

    protected idle$: Observable<any>;

    protected timer$: Observable<any>;

    /**
     * Idle value in milliseconds.
     * Default equals to 10 minutes.
     */
    protected idleMillisec = 600 * 1000;

    /**
     * Idle buffer wait time milliseconds to collect user action
     * Default equals to 1 Sec.
     */
    protected idleSensitivityMillisec = 100;

    /**
     * Timeout value in seconds.
     * Default equals to 5 minutes.
     */
    protected timeout = 300;

    /**
     * Ping value in milliseconds.
     * Default equals to 2 minutes.
     */
    protected pingMilliSec = 120 * 1000;

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
    public startWatching() {
        if (!this.activityEvents$) {
            this.activityEvents$ = merge(from);
        }

        this.idle$ = from(this.activityEvents$);

        if (this.idleSubscription) {
            this.idleSubscription.unsubscribe();
        }

        // If any of user events is not active for idle-seconds when start timer.
        this.idleSubscription = this.idle$
            .pipe(
                bufferTime(this.idleSensitivityMillisec), // Starting point of detecting of user's inactivity
                filter((arr) => !arr.length && !this.isIdleDetected && !this.isInactivityTimer),
                tap(() => {
                    this.isIdleDetected = true;
                    this.idleDetected$.next(true);
                }),
                switchMap(() =>
                    interval(1000).pipe(
                        takeUntil(
                            merge(
                                this.activityEvents$,
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

        this.setupTimer(this.timeout);
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

    public onTimerStart(): Observable<number> {
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
            tap(() => (this.isTimeout = true)),
            map(() => true),
        );
    }

    getConfigValue(): UserIdleConfig {
        return {
            idle: this.idleMillisec / 1000,
            idleSensitivity: this.idleSensitivityMillisec / 1000,
            timeout: this.timeout,
            ping: this.pingMilliSec / 1000,
        };
    }

    setConfigValues(config: UserIdleConfig) {
        if (this.idleSubscription && !this.idleSubscription.closed) {
            console.error('Call stopWatching() before set config values');
            return;
        }
        this.setConfig(config);
    }

    private setConfig(config: UserIdleConfig) {
        if (config.idle) {
            this.idleMillisec = config.idle * 1000;
        }
        if (config.ping) {
            this.pingMilliSec = config.ping * 1000;
        }
        if (config.idleSensitivity) {
            this.idleSensitivityMillisec = config.idleSensitivity * 100;
        }
        if (config.timeout) {
            this.timeout = config.timeout;
        }
    }

    /**
     * Set custom activity events
     *
     * @param customEvents Example: merge(
     * )
     */
    setCustomActivityEvents(customEvents: Observable<any>) {
        if (this.idleSubscription && !this.idleSubscription.closed) {
            console.error('Call stopWatching() before set custom acvitiy events');
            return;
        }
        this.activityEvents$ = customEvents;
    }

    /**
     * Setup timer.
     *
     * Counts every second and return n+1 and fire timeout for last count.
     * @param timeout Timeout in seconds.
     */
    protected setupTimer(timeout: number) {
        this.timer$ = interval(1000).pipe(
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