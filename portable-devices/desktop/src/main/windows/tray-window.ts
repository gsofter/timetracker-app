/* eslint-disable @typescript-eslint/no-floating-promises */
import * as path from 'path';
import { BrowserWindow, webContents } from 'electron';
import { format as formatUrl } from 'url';
import { config } from '../../config';

const TRAY_HTML_PAGE = 'tray-page.html';

export default class TrayWindow {
    public window: BrowserWindow;

    constructor() {
        // Creation of the new window.
        this.window = new BrowserWindow({
            show: false, // Initially, we should hide it, in such way will remove blink-effect.
            height: 500,
            width: 500,
            backgroundColor: '#E4ECEF',
            frame: false,
            fullscreenable: false,
            resizable: true,
            transparent: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true,
                devTools: true,
            },
        });

        if (config.isDevelopment) {
            this.window.webContents.openDevTools();
            this.window.webContents.on('devtools-opened', () => {
                this.window.focus();
                setImmediate(() => {
                    this.window.focus();
                });
            });
            const htmlDevPath = formatUrl({
                protocol: 'http',
                slashes: true,
                hostname: config.ELECTRON_WEBPACK_WDS_HOST,
                port: config.ELECTRON_WEBPACK_WDS_PORT,
                pathname: TRAY_HTML_PAGE,
            });
            this.window.loadURL(htmlDevPath);
        } else {
            const htmlPath = formatUrl({
                pathname: path.join(__dirname, TRAY_HTML_PAGE),
                protocol: 'file',
                slashes: true,
            });
            this.window.loadURL(htmlPath);
        }

        // Object BrowserWindow has a lot of standart events
        // We will hide Tray window on blur. To emulate standart behavior of the tray-like apps.
        this.window.on('blur', () => {
            this.window.hide();
        });
    }
}
