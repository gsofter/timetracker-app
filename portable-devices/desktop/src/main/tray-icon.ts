import * as path from 'path';
import { app, BrowserWindow, Tray, Menu } from 'electron';
// import Positioner from 'electron-positioner';

const iconPath = path.join(__dirname, '../../assets/icons/16x16.png');

export default class TrayIcon {
    public trayIcon: Tray;
    public trayWindow: BrowserWindow;

    constructor(trayWindow: BrowserWindow) {
        // Path to the app icon that will be displayed in the Tray (icon size: 22px)
        this.trayWindow = trayWindow;
        this.trayIcon = new Tray(iconPath);
        this.trayIcon.setToolTip('Sample Desktop'); // This tooltip will show up, when user hovers over our tray-icon.

        // By clicking on the icon we have to show TrayWindow and position it in the middle under
        // the tray icon (initially this windo is hidden).
        const menu = Menu.buildFromTemplate([
            {
                label: 'Stop timer',
                click() {
                }
            },
            {
                label: 'Continue latest',
                click() {
                }
            },
            {
                label: 'Discard timer',
                click() {
                }
            },
            {
                label: 'Quit',
                click() {
                    app.quit();
                }
            }
        ]);
        if (process.platform === 'linux') {
            this.trayIcon.setContextMenu(menu);
        } else {
            this.trayIcon.on('right-click', () => {
                this.trayIcon.setContextMenu(menu);
            });
            this.trayIcon.on('double-click', this.toggleTrayWindow)
            this.trayIcon.on('click', function () {
                this.toggleTrayWindow()
            });
        }
    }

    getTrayWindowPosition() {
        if (!this.trayWindow || !this.trayIcon) return { x: 2, y: 2 };
        const windowBounds = this.trayWindow.getBounds()
        const trayBounds = this.trayIcon.getBounds()

        // Center window horizontally below the tray icon
        const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))

        // Position window 4 pixels vertically below the tray icon
        const y = Math.round(trayBounds.y + trayBounds.height + 4)

        return { x: x, y: y }
    }

    showTrayWindow() {
        const position = this.getTrayWindowPosition()
        if (position) {
            this.trayWindow?.setPosition(position.x, position.y, false)
        }
        this.trayWindow?.show()
        this.trayWindow?.focus()
    }

    toggleTrayWindow = () => {
        if (!this.trayWindow) return;
        if (this.trayWindow.isVisible()) {
            this.trayWindow.hide();
        } else {
            this.showTrayWindow();
        }
    }

    public updateTitle(title: string) {
        const time = `00:0${title}`;
        console.log('----tititle----', time);
        this.trayIcon.setTitle(title);
    }
}
