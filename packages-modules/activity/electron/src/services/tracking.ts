import { injectable } from 'inversify';
import ioHook from 'iohook';
import { ITrackingService } from '../interfaces';

@injectable()
export class TrackingService implements ITrackingService {
    private keyPress: number;

    private mouseClick: number;

    private mouseWheel: number;

    Tracking() {
        console.log('Tracking constructor called....');
        ioHook.start();

        ioHook.on('keyup', (event) => {
            console.log('keyup event =======>', event);
            this.keyPress++;
        });
        ioHook.on('mouseclick', (event) => {
            console.log('mouseclick event =======>', event);
            this.mouseClick++;
        });
        ioHook.on('mousewheel', (event) => {
            console.log('mousewheel event =======>', event);
            this.mouseWheel++;
        });
    }

    public countTracking() {
        const information = {
            keyPress: this.keyPress,
            mouseClick: this.mouseClick,
            mouseWheel: this.mouseWheel,
        };

        this.keyPress = 0;
        this.mouseClick = 0;
        this.mouseWheel = 0;
        return information;
    }

    public stopTracking() {
        ioHook.stop();
    }
}

const trackingMock = new TrackingService();

export { trackingMock };
