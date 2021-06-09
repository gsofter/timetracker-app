/* eslint-disable no-use-before-define */
import { BrowserWindow, ipcMain } from 'electron';
import { ElectronTypes } from '@common-stack/client-core';
import * as path from 'path';
import { createWindow, provideSingleton } from '../utils';
import { convertQueryStrToObj } from '../utils/utils';
import { IPC_EVENTS } from '../../common';

@provideSingleton(ElectronTypes.MainWindow)
export class MainWindow {
    private window: BrowserWindow;

    constructor() {
        this.window = createWindow({
            name: 'main-page',
            show: true,
            width: 400,
            height: 400,
            // frame: false,
            minWidth: 800,
            minHeight: 600,
            remote: true,
            backgroundColor: '#E4ECEF',
            webPreferences: {
                nodeIntegration: true,
                webSecurity: false,
                enableRemoteModule: true,
                // add preload to load esm
                preload: path.resolve(path.join(__dirname, 'preload.js')),
            },
        });
        // Custom events MAIN WINDOW
        // ipcMain.on(IPC_EVENTS.SHOW_MAIN, function () {
        //     if (this.window) {
        //         this.window.show();
        //     }
        // });

        const {
            session: { webRequest },
            executeJavaScript,
        } = this.window.webContents;

        const filter = {
            urls: ['http://localhost:*/callback*'],
        };

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
                setLocalStorage('id_token', hashObj.id_token, () => {
                    setLocalStorage('expires_at', expiresAt, () => {
                        this.window.reload();
                    });
                });
            });

            this.window.reload();
        });
    }

    show() {
        this.window.show();
    }

    close() {
        this.window.close();
        this.window = null;
    }
}
