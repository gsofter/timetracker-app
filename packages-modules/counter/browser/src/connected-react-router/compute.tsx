import * as React from 'react';
import { IMenuPosition, IRoute } from '@common-stack/client-react';

import { Hello } from './components/Hello';
import { Counter } from './components/Counter';
import { Dashboard } from '../common/components/Dashboard';
import { getFilteredMenus, getFilteredRoutes } from '../utils';
import { CONNECTED_REACT_ROUTER_ROUTES_TYPES, CONNECTED_REACT_ROUTER_KEY_TYPES } from './constants';
import {
    FileOutlined
  } from '@ant-design/icons';

export const counterPageStore: IRoute[] = [
    {
        exact: false,
        icon: <FileOutlined/>,
        component: Dashboard,
        position: IMenuPosition.MIDDLE,
        name: 'Connected React Router',
        key: CONNECTED_REACT_ROUTER_KEY_TYPES.HOME,
        path: CONNECTED_REACT_ROUTER_ROUTES_TYPES.HOME,
        priority: 1,
        authority: ['admin', 'user'],
    },
    {
        exact: true,
        name: 'Hello',
        component: Hello,
        position: IMenuPosition.MIDDLE,
        key: CONNECTED_REACT_ROUTER_KEY_TYPES.HELLO,
        path: CONNECTED_REACT_ROUTER_ROUTES_TYPES.HELLO,
        priority: 2,
        authority: ['admin', 'user'],
    },
    {
        exact: true,
        name: 'Counter',
        component: Counter as any,
        position: IMenuPosition.MIDDLE,
        key: CONNECTED_REACT_ROUTER_KEY_TYPES.COUNTER,
        path: CONNECTED_REACT_ROUTER_ROUTES_TYPES.COUNTER,
        priority: 3,
        authority: ['admin', 'user'],
    },
];

const selectedRoutesAndMenus = [
    CONNECTED_REACT_ROUTER_KEY_TYPES.HOME,
    CONNECTED_REACT_ROUTER_KEY_TYPES.HELLO,
    CONNECTED_REACT_ROUTER_KEY_TYPES.COUNTER,
];


// get routes
const filteredRoutes = getFilteredRoutes(counterPageStore, selectedRoutesAndMenus);

export { filteredRoutes };
