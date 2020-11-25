import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';
import { getFilteredMenus, getFilteredRoutes } from '../utils';
import { ComplexWithTheme } from './components/CompledWithTheme';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons';



export const felaPageStore: any[] = [
    {
        component: ComplexWithTheme,
        tab: 'Fela Styling',
        key: 'fela',
        position: IMenuPosition.LOWER,
        name: 'Fela Styling',
        path: '/:orgName/fela',
        icon: <MenuFoldOutlined/>
    },
];

const selectedRoutesAndMenus = ['fela'];

// get menus
const filteredMenus = getFilteredMenus(felaPageStore, selectedRoutesAndMenus);

// get routes
const filteredRoutes = getFilteredRoutes(felaPageStore, selectedRoutesAndMenus);

export { filteredMenus, filteredRoutes };
