/* eslint-disable no-return-assign */
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserIdleService } from './user-idle-service';

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

    constructor(private userIdle: UserIdleService) {}

    public onStartWatching() {
        this.isWatching = true;
        this.timerCount = this.timeout;
        this.userIdle.setConfigValues({
            idle: this.idle,
            timeout: this.timeout,
            ping: this.ping,
        });

        // Start watching for user inactivity.
        this.userIdle.startWatching();

        // Start watching when user idle is starting.
        this.timerStartSubscription = this.userIdle
            .onTimerStart()
            .pipe(tap(() => (this.isTimer = true)))
            .subscribe((count) => (this.timerCount = count));

        // Start watch when time is up.
        this.timeoutSubscription = this.userIdle.onTimerStart().subscribe(() => (this.timeIsUp = true));

        this.pingSubscription = this.userIdle.ping$.subscribe(
            (value) => (this.lastPing = `#${value} at ${new Date().toString()}`),
        );
    }

    public onStopWatching() {
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

    public onIdleKeyup

    /** *
     * Start session timer for the timeout after x minutes
     */
    startActivityTimer(reset: boolean): void {}
}
