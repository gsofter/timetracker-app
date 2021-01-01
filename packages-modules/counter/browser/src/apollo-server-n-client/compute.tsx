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
        key: 'apolloServerClient',
        component: Dashboard,
        tab: 'Apollo Server & Client',
        position: IMenuPosition.MIDDLE,
        name: 'Apollo Server & Client',
        path: '//:orgName/apollo-server-n-client',
        priority: 1,
        authority: ['admin', 'user'],
    },
    {
        exact: false,
        key: 'apolloServerClient.counter',
        name: 'Counter',
        component: Counter,
        position: IMenuPosition.MIDDLE,
        path: '//:orgName/apollo-server-n-client/counter',
        priority: 2,
        authority: ['admin', 'user'],
    },
];

const selectedRoutesAndMenus = ['apolloServerClient', 'apolloServerClient.counter'];

// get menus
const filteredMenus = getFilteredMenus(counterPageStore, selectedRoutesAndMenus);

// get routes
const filteredRoutes = getFilteredRoutes(counterPageStore, selectedRoutesAndMenus);

export { filteredMenus, filteredRoutes };
