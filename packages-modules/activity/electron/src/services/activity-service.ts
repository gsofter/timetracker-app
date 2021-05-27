/* eslint-disable no-useless-constructor */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-return-assign */
import { Subscription } from 'rxjs';
import { injectable, inject } from 'inversify';
import { tap } from 'rxjs/operators';
import { IClientContainerService } from '@admin-layout/activity-core';
import { UserIdleService } from './user-idle-service';
import { IActivityTracking } from '../interfaces';

@injectable()
export class ActivityService {
    public idle: number;

    public timeout: number;

    public ping: number;

    public lastPing: string;

    public isWatching: boolean;

    public isTimer: boolean;

    public timeIsUp: boolean;

    public timerCount: number;

    private timerStartSubscription: Subscription;

    private timeoutSubscription: Subscription;

    private pingSubscription: Subscription;

    constructor(
        @inject(IClientContainerService.UserIdleService)
        private userIdle: UserIdleService,
        @inject(IClientContainerService.ActivityTracking)
        private tracker: IActivityTracking,
    ) {}

    public onStartWatching() {
        console.log('==STARTED ON START WATCHING');
        this.tracker.startMonitoring();
        this.isWatching = true;
        this.timerCount = this.timeout;
        this.userIdle.setConfigValues({
            idle: this.idle,
            timeout: this.timeout,
            ping: this.ping,
        });

        // Start watching for user inactivity.
        this.userIdle.startWatching(this.tracker.interactivity);

        // Start watching when user idle is starting.
        this.timerStartSubscription = this.userIdle
            .onInactiveTimerStart()
            .pipe(tap(() => (this.isTimer = true)))
            .subscribe((count) => (this.timerCount = count));

        // Start watch when time is up.
        this.timeoutSubscription = this.userIdle.onInactiveTimerStart().subscribe(() => (this.timeIsUp = true));

        this.pingSubscription = this.userIdle.ping$.subscribe(
            (value) => (this.lastPing = `#${value} at ${new Date().toString()}`),
        );
    }

    public onStopWatching() {
        console.log('==STOPPED ON START WATCHING');
        this.tracker.stopMonitoring();
        this.userIdle.stopWatching();
        this.timerStartSubscription.unsubscribe();
        this.timeoutSubscription.unsubscribe();
        this.isWatching = false;
        this.isTimer = false;
        this.timeIsUp = false;
        this.lastPing = null;
    }

    public onStopTimer() {
        this.userIdle.stopTimer();
        this.isTimer = false;
    }

    public onResetTimer() {
        this.userIdle.resetTimer();
        this.isTimer = false;
        this.timeIsUp = false;
    }

    // public onIdleKeyup

    /** *
     * Start session timer for the timeout after x minutes
     */
    startActivityTimer(reset: boolean): void {}
}
