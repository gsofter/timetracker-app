import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';
import { Dashboard } from './components';
import { getFilteredMenus, getFilteredRoutes } from '../utils';

export const dashboardPageStore: any[] = [
    {
        path: '/:orgName/dashboard',
        key: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        position: IMenuPosition.LOWER,
        exact: true,
        priority: 1,
    },
];

const selectedRoutesAndMenus = ['dashboard'];

// get menus
const filteredMenus = getFilteredMenus(dashboardPageStore, selectedRoutesAndMenus);

// get routes
const filteredRoutes = getFilteredRoutes(dashboardPageStore, selectedRoutesAndMenus);

export { filteredMenus, filteredRoutes };
