import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';
import { Organization } from './components/Organization';
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
    component: Organization,
    position: IMenuPosition.LOWER,
    exact: true,
    priority: 2,
  },
];

const selectedRoutesAndMenus = [ 'dashboard'];

// get menus
const filteredMenus = getFilteredMenus(accountPageStore, selectedRoutesAndMenus);

// get routes
const filteredRoutes = getFilteredRoutes(accountPageStore, selectedRoutesAndMenus);

export { filteredMenus, filteredRoutes };
