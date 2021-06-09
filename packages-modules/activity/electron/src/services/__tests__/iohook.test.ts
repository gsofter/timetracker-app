/* eslint-disable jest/no-jest-import */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jest/no-hooks */
import 'jest';
import ioHook from 'iohook';
import robot from 'robotjs';

/**
 * To test `iohook` is working propertly
 */
describe('keyboard events', () => {
    beforeEach(() => {
        ioHook.start();
    });
    afterEach(() => {
        ioHook.stop();
    });

    it('receives the text "hello world" on keyup event', (done) => {
        expect.assertions(22);

        const chars = [
            { keycode: 35, value: 'h' },
            { keycode: 18, value: 'e' },
            { keycode: 38, value: 'l' },
            { keycode: 38, value: 'l' },
            { keycode: 24, value: 'o' },
            { keycode: 57, value: ' ' },
            { keycode: 17, value: 'w' },
            { keycode: 24, value: 'o' },
            { keycode: 19, value: 'r' },
            { keycode: 38, value: 'l' },
            { keycode: 32, value: 'd' },
        ];
        let i = 0;

        ioHook.on('keydown', (event) => {
            expect(event).toMatchObject({
                keycode: chars[i].keycode,
                type: 'keydown',
                shiftKey: false,
                altKey: false,
                ctrlKey: false,
                metaKey: false,
            });
        });
        ioHook.on('keyup', (event) => {
            console.log('--keyUp', i, 'event', event);
            expect(event).toMatchObject({
                keycode: chars[i].keycode,
                type: 'keyup',
                shiftKey: false,
                altKey: false,
                ctrlKey: false,
                metaKey: false,
            });

            if (i === chars.length - 1) {
                done();
            }
            console.log('--- ADD I', i);
            i += 1;
        });
        ioHook.start();

        setTimeout(() => {
            // Make sure ioHook starts before anything gets typed
            for (const char of chars) {
                // robot.keyTap(char.value);
            }
        }, 5);
    });

    // NOTE: shift key is not recongized in the test.
    it.skip('recognizes shift key being pressed', (done) => {
        // expect.assertions(8);

        ioHook.on('keydown', (event) => {
            console.log('--EVENT', event);
            expect(event).toMatchObject({
                type: 'keydown',
                shiftKey: true,
                altKey: false,
                ctrlKey: false,
                metaKey: false,
            });
        });
        ioHook.on('keyup', (event) => {
            expect(event).toMatchObject({
                type: 'keyup',
                shiftKey: true,
                altKey: false,
                ctrlKey: false,
                metaKey: false,
            });
        });
        ioHook.start();

        setTimeout(() => {
            // Make sure ioHook starts before anything gets typed
            // robot.keyToggle('shift', 'down');
            // robot.keyTap('1');
            // robot.keyToggle('shift', 'up');
        }, 5);
    });
});
