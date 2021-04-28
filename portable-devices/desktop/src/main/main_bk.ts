/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { format as formatUrl } from 'url';
import { config } from '../config';
// const { localStorage, sessionStorage } = require('electron-browser-storage');
import { convertQueryStrToObj } from './utils';

const { isDevelopment } = config;

// Global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: BrowserWindow | undefined;
app.commandLine.appendSwitch('auth-server-whitelist', 'https://dev-cdebase.auth0.com/co/authenticate');
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
app.commandLine.appendSwitch('disable-site-isolation-trials');

const createMainWindow = () => {
    // Create the browser window.
    const window = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            preload: path.resolve(path.join(__dirname, 'preload.js')),
        },
    });
    const {
        session: { webRequest },
        executeJavaScript,
    } = window.webContents;

    const filter = {
        urls: ['http://localhost:*/callback*'],
    };

    // This is what the call to setItem() looks like
    // const setLocalStorage = (key, value) =>
    //     new Promise((resolve, reject) => {
    //         console.log('---HERERE___');

    //         window.webContents.executeJavaScript(`localStorage.setItem( '${key}', '${value}' )`)
    //         .then((v) => {
    //             resolve(v);
    //         });
    //     });
    // webRequest.onBeforeRequest(filter, async ({ url }) => {
    //     console.log('---REQUEST___URL', url, url);
    //     // load to localstorage
    //     const hash = url.split('#'); // split the string; usually there'll be only one # i
    //     const hashObj = convertQueryStrToObj(hash[1]);
    //     console.log('--HASH OBJE', hashObj);
    //     const expiresAt = JSON.stringify(hashObj.expires_in * 1000 + new Date().getTime());

    //     await setLocalStorage('access_token', hashObj.access_token);
    //     await setLocalStorage('id_token', hashObj.id_token);
    //     await setLocalStorage('expires_at', expiresAt);
    //     // mainWindow.reload();
    //     // await mainWindow.webContents.reload();
    //     console.log('--Loaded Storage');
    //     // mainWindow.loadURL(mainAddr);
    //     window.reload();
    //     console.log('---COMPLETED RELOAD');
    //     // mainWindow.webContents.executeJavaScript('location.href = `${ location.href }app`')
    // });

    if (isDevelopment) {
        window.webContents.openDevTools();

        // window.loadURL(`http://localhost:${config.ELECTRON_WEBPACK_WDS_PORT}`);
        window.loadURL(
            formatUrl({
                protocol: 'http',
                slashes: true,
                hostname: config.ELECTRON_WEBPACK_WDS_HOST,
                port: config.ELECTRON_WEBPACK_WDS_PORT,
            }),
        );
    } else {
        window.loadURL(
            formatUrl({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file',
                slashes: true,
            }),
        );
    }

    window.on('closed', () => {
        mainWindow = null;
    });

    window.webContents.on('devtools-opened', () => {
        window.focus();
        setImmediate(() => {
            window.focus();
        });
    });

    return window;
};

ipcMain.on('get-env', (event) => {
    console.log('---CALLLED --- get-env');
    event.sender.send('get-env-reply', JSON.stringify(process.env));
});

// Quit application when all windows are closed
app.on('window-all-closed', () => {
    // On macOS it is common for applications to stay open until the user explicitly quits
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it is common to re-create a window even after all windows have been closed
    if (!mainWindow) {
        mainWindow = createMainWindow();
    }
});

// Create main BrowserWindow when electron is ready
app.on('ready', () => {
    mainWindow = createMainWindow();
});
