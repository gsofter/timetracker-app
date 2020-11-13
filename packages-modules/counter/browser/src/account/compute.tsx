import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';
import { Dashboard } from '../common/components/Dashboard';
import { Account } from './components/Account';
import { AccountSetting } from './components/AccountSetting';
import { getFilteredMenus, getFilteredRoutes } from '../utils';
import {
    UserOutlined
  } from '@ant-design/icons';

export const accountPageStore: any[] = [
    {
        path: '/:orgName/usermenu',
        key: 'userMenu',
        tab: 'User Account',
        exact: false,
        name: 'User',
        component: Dashboard,
        position: IMenuPosition.BOTTOM,
        icon: <UserOutlined/>,
        priority: 1
    },
    {
        path: '/:orgName/usermenu/profile',
        key: 'userMenu.account.profile',
        tab: 'Profile Setting',
        component: Account,
        position: IMenuPosition.BOTTOM,
        exact: true,
        priority: 2
    },
    {
        path: '/:orgName/usermenu/account',
        key: 'userMenu.account',
        tab: 'Accounts',
        name: 'Account',
        component: AccountSetting,
        position: IMenuPosition.BOTTOM,
        exact: true,
        priority: 4,
    }

];

const selectedRoutesAndMenus = ['userMenu', 'userMenu.account', 'userMenu.account.profile'];

// get menus
const filteredMenus = getFilteredMenus(accountPageStore, selectedRoutesAndMenus);

// get routes
const filteredRoutes = getFilteredRoutes(accountPageStore, selectedRoutesAndMenus);

export { filteredMenus, filteredRoutes };
