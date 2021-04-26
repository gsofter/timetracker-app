import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';
import { Organization } from './components/Organization';
import { Dashboard } from '../Dashboard'
import { getFilteredMenus, getFilteredRoutes } from '../utils';

export const accountPageStore: any[] = [
  {
    path: '/:orgName/organization',
    key: 'organization',
    name: 'Organization Menu',
    component: Organization,
    position: IMenuPosition.UPPER,
    exact: true,
    priority: 2,
  },
  {
    path: '/:orgName/dashboard',
    key: 'dashboard',
    name: 'Dashboard',
    component: Dashboard,
    position: IMenuPosition.UPPER,
    exact: true,
    priority: 1,
  },
];

const selectedRoutesAndMenus = [ 'dashboard'];

// get menus
const filteredMenus = getFilteredMenus(accountPageStore, selectedRoutesAndMenus);

// get routes
const filteredRoutes = getFilteredRoutes(accountPageStore, selectedRoutesAndMenus);

export { filteredMenus, filteredRoutes };
