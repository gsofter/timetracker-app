import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';

import Counter from './containers/Counter';
import { Dashboard } from '../common/components/Dashboard';
import { getFilteredMenus, getFilteredRoutes } from '../utils';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons';


export const counterPageStore: any[] = [
    {
        exact: false,
        icon: <MenuUnfoldOutlined/>,
        key: '/apollo-server-n-client',
        component: Dashboard,
        tab: 'Apollo Server & Client',
        position: IMenuPosition.MIDDLE,
        name: 'Apollo Server & Client',
        path: '/apollo-server-n-client',
    },
    {
        exact: false,
        key: '/apollo-server-n-client/counter',
        name: 'Counter',
        component: Counter,
        position: IMenuPosition.MIDDLE,
        path: '/apollo-server-n-client/counter',
    },
];

const selectedRoutesAndMenus = ['/apollo-server-n-client', '/apollo-server-n-client/counter'];

// get menus
const filteredMenus = getFilteredMenus(counterPageStore, selectedRoutesAndMenus);

// get routes
const filteredRoutes = getFilteredRoutes(counterPageStore, selectedRoutesAndMenus);

export { filteredMenus, filteredRoutes };
