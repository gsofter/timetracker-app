/* eslint-disable class-methods-use-this */
import iohook from 'iohook';
import { merge, Observable } from 'rxjs';
import { injectable } from 'inversify';
import { IActivityTracking } from '../interfaces';
import { keyboardKeydownEvents$, mouseClickEvents$, mouseMovementEvents$, mouseWheelEvents$ } from './interactivity';

@injectable()
export class ActivityTracking implements IActivityTracking {
    public interactivity: Observable<any>;

    constructor() {
        this.interactivity = merge(mouseMovementEvents$, mouseClickEvents$, keyboardKeydownEvents$, mouseWheelEvents$);
    }

    public startMonitoring(): void {
        iohook.start();
    }

    public stopMonitoring(): void {
        iohook.stop();
    }
}
