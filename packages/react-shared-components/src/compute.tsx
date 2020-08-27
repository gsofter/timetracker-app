import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';


import { EmptyTab } from './components/Tabs/EmptyTab';
import { getFilteredMenus, getFilteredRoutes } from './utils';

export const counterPageStore: any[] = [
    {
        exact: false,
        icon: 'export',
        key: 'dashboard',
        component: EmptyTab,
        tab: 'React shared',
        position: IMenuPosition.MIDDLE,
        name: 'Shared accout',
        path: '/react-shared',
    },
];

const selectedRoutesAndMenus = ['dashboard'];

// get menus
const filteredMenus = getFilteredMenus(counterPageStore, selectedRoutesAndMenus);

// get routes
const filteredRoutes = getFilteredRoutes(counterPageStore, selectedRoutesAndMenus);

export { filteredMenus, filteredRoutes };
