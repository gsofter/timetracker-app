import { Observable } from 'rxjs';

export interface IActivityTracking {
    interactivity: Observable<any>;

    startMonitoring(): void;

    stopMonitoring(): void;
}
