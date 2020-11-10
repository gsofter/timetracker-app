import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';

// import TimeTracker from './TimeTracker';
import { getFilteredMenus, getFilteredRoutes } from '../utils';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    FileOutlined
  } from '@ant-design/icons';


const TimeTracker = () => <div>Timetracker demo</div>
export const timePageStore = [
    {
        path: '/time-tracker',
        key: 'time-tracker',
        exact: true,
        name: 'Time Tracker',
        tab: 'Time Tracker',
        component: TimeTracker,
        position: IMenuPosition.MIDDLE,
        icon: <FileOutlined/>,
    },
];

const selectedRoutesAndMenus = ['time-tracker'];

// get menus
const filteredMenus = getFilteredMenus(timePageStore, selectedRoutesAndMenus);

// get routes
const filteredRoutes = getFilteredRoutes(timePageStore, selectedRoutesAndMenus);

export { filteredMenus, filteredRoutes };

