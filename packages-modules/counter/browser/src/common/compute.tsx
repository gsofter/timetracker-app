import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';

import { Home } from '../common/components/Home';
import { TimeTracker }  from '../common/components/TimeTracker';
import { getFilteredMenus, getFilteredRoutes } from '../utils';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    FileOutlined
  } from '@ant-design/icons';

export const commonPageStore: any[] = [
    {
        path: '/',
        key: 'home',
        exact: true,
        name: 'Home',
        component: Home,
        position: IMenuPosition.MIDDLE,
        icon: <FileOutlined/>,
    },
    {
        path: '/time-tracker',
        key: 'time-tracker',
        exact: true,
        name: 'Time Tracker',
        component: TimeTracker,
        position: IMenuPosition.MIDDLE,
        icon: <FileOutlined/>,
    },
];

const selectedRoutesAndMenus = ['home', 'time-tracker'];

// get menus
const filteredMenus = getFilteredMenus(commonPageStore, selectedRoutesAndMenus);

// get routes
const filteredRoutes = getFilteredRoutes(commonPageStore, selectedRoutesAndMenus);

export { filteredMenus, filteredRoutes };
