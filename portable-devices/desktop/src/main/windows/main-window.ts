/* eslint-disable @typescript-eslint/no-floating-promises */
import * as path from 'path';
import { BrowserWindow, shell } from 'electron';
import { format as formatUrl } from 'url';
import { config } from '../../config';
import { convertQueryStrToObj } from '../utils';

const MAIN_HTML_PAGE = 'main-page.html';
export default class MainWindow {
    public window: BrowserWindow;

    constructor() {
        this.window = new BrowserWindow({
            show: false,
            width: 400,
            height: 400,
            // frame: false,
            minWidth: 800,
            minHeight: 600,
            backgroundColor: '#E4ECEF',
            webPreferences: {
                nodeIntegration: true,
                webSecurity: false,
                enableRemoteModule: true,
                preload: path.resolve(path.join(__dirname, 'preload.js')),
            },
        });

        const {
            session: { webRequest },
            executeJavaScript,
        } = this.window.webContents;

        const filter = {
            urls: ['http://localhost:*/callback*'],
        };

        // This is what the call to setItem() looks like
        const setLocalStorage = async (key, value, callback) => {
            console.log('---HERERE___', key);

            await this.window.webContents
                .executeJavaScript(`window.localStorage.setItem( '${key}', '${value}' )`)
                .then((v) => {
                    console.log('Successfulltyy stotred ', v);
                    callback();
                })
                .catch((err) => {
                    console.log('ERROROOROROROROOROROR', err);
                });
        };

        webRequest.onBeforeRequest(filter, async ({ url }) => {
            console.log('---REQUEST___URL', url);

            // load to localstorage
            const hash = url.split('#'); // split the string; usually there'll be only one # i
            const hashObj = convertQueryStrToObj(hash[1]);
            console.log('--HASH OBJE', hashObj);
            const expiresAt = JSON.stringify(hashObj.expires_in * 1000 + new Date().getTime());

            setLocalStorage('access_token', hashObj.access_token, () => {
                console.log('FINISH ACCESS TOKEN 11111111111');
                setLocalStorage('id_token', hashObj.id_token, () => {
                    console.log('FINISH ACCESS TOKEN 222222222222');
                    setLocalStorage('expires_at', expiresAt, () => {
                        console.log('FINISH ACCESS TOKEN 333333333333');
                        console.log('--Loaded Storage');
                        this.window.reload();
                        console.log('---COMPLETED RELOAD');
                    });
                });
            });

            this.window.reload();
        });

        if (config.isDevelopment) {
            // app.commandLine.appendSwitch('auth-server-whitelist', 'https://dev-cdebase.auth0.com/co/authenticate');
            // app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
            // app.commandLine.appendSwitch('disable-site-isolation-trials');

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
                pathname: MAIN_HTML_PAGE,
            });
            console.log('----------htmlDevPath----------->', htmlDevPath);
            this.window.loadURL(htmlDevPath);
        } else {
            const htmlPath = formatUrl({
                pathname: path.join(__dirname, MAIN_HTML_PAGE),
                protocol: 'file',
                slashes: true,
            });
            console.log('----------htmlDevPath----------->', htmlPath);
            this.window.loadURL(htmlPath);
        }

        this.window.on('closed', () => {
            this.window = null;
        });

        // Open urls in the user's browser
        this.window.webContents.on('new-window', (event, url) => {
            event.preventDefault();
            shell.openExternal(url);
        });

        // @TODO: Use 'ready-to-show' event
        //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
        // this.window.webContents.on('did-finish-load', () => {
        //     if (!this.window) {
        //         throw new Error('"mainWindow" is not defined');
        //     }
        //     if (process.env.START_MINIMIZED) {
        //         this.window.minimize();
        //     } else {
        //         this.window.show();
        //         this.window.focus();
        //     }
        // });
    }
}
