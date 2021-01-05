import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';

import { Home } from '../common/components/Home';
import { getFilteredMenus, getFilteredRoutes } from '../utils';
import { HomeOutlined } from '@ant-design/icons';

export const commonPageStore: any[] = [
  {
    path: '//home',
    tab: 'Home Component',
    key: 'home-component',
    exact: true,
    name: 'Home Component',
    component: Home,
    position: IMenuPosition.MIDDLE,
    icon: <HomeOutlined />,
    priority: 1,
  },
];

const selectedRoutesAndMenus = ['home-component'];

// get menus
const filteredMenus = getFilteredMenus(commonPageStore, selectedRoutesAndMenus);

// get routes
const filteredRoutes = getFilteredRoutes(commonPageStore, selectedRoutesAndMenus);

export { filteredMenus, filteredRoutes };
