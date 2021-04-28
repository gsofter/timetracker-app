/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import path from 'path';
import { Tray } from 'electron';

const trayIcon = path.join(__dirname, '../../../assets/icon.png');
let appIcon = null;

export default function create() {
    if (appIcon !== null) return appIcon;

    appIcon = new Tray(trayIcon);
    appIcon.setToolTip('Clockbook');

    return appIcon;
}
