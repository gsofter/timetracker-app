
import { BrowserWindow } from 'electron';
import path from 'path';
// import process from 'process';
import Positioner from 'electron-positioner';

let browserWindow = null;
let cachedTrayBounds;


function positionWindow() {
    let windowPosition = 'topRight';
    if (cachedTrayBounds) {
        windowPosition = (process.platform === 'win32') ? 'trayBottomCenter' : 'trayCenter';
    }
    const positioner = new Positioner(browserWindow);
    const { x, y } = positioner.calculate(windowPosition, cachedTrayBounds);
    positioner.move('topRight');
    // browserWindow.setPosition(x, y);
}

function showWindow() {
    browserWindow.show();
    browserWindow.focus();
}

export default function createMenuBar({ trayBounds = null, uri = '/' } = { }) {

}