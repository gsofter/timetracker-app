import 'reflect-metadata';
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// load environment config
import './config/public-config';
import App from './tray/index';

// Virtual (module as any), generated in-memory by zenjs, contains count of backend rebuilds
// tslint:disable-next-line
import 'antd/dist/antd.css';
import 'react-table/react-table.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const rootEl = document.getElementById('root');
let frontendReloadCount = 0;

const renderApp = ({ key }: { key: number }) => ReactDOM.render(<App key={key} />, rootEl);
renderApp({ key: frontendReloadCount });
if (__DEV__) {
    if ((module as any).hot) {
        (module as any).hot.accept();
        (module as any).hot.accept((err) => {
            if (err) {
                console.error('Cannot apply HMR update.', err);
            }
        });
        //  React-hot-loader v4 doesn't require following code any more.
        //  but if RHL not working we can uncomment below code to make normal HMR to refresh the page
        (module as any).hot.accept('./tray/index', () => {
            try {
                console.log('Updating front-end');
                frontendReloadCount = (frontendReloadCount || 0) + 1;

                renderApp({ key: frontendReloadCount });
            } catch (err) {
                // log(err.stack);
            }
        });
    }
}
