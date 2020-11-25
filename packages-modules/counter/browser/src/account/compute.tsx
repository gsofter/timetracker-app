import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';
import { Dashboard } from '../common/components/Dashboard';
import { Account } from './components/Account';
import { AccountSetting } from './components/AccountSetting';
import { Billing } from './components/Billing';
import { Organization } from './components/Organization'
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
        priority: 1,
        authority: ['admin', 'user'],
    },
    {
        path: '/:orgName/usermenu/billing',
        key: 'userMenu.billing',
        exact: true,
        name: 'Billing Setting',
        component: Billing,
        position: IMenuPosition.BOTTOM,
        priority: 3,
        authority: ['admin', 'user'],
    },
    {
        exact: true,
        key: 'userMenu.billing.home',
        name: 'Home',
        path: '/:orgName/usermenu/billing/home',
        component: Billing,
        priority: 1,
        authority: ['admin', 'user'],
    },
    {
        path: '/:orgName/usermenu/profile',
        key: 'userMenu.account.profile',
        tab: 'Profile Setting',
        component: Account,
        position: IMenuPosition.BOTTOM,
        exact: true,
        priority: 2,
        authority: ['admin', 'user'],
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
        authority: ['admin', 'user'],
    },
    {
        path: '/:orgName/usermenu/account/collaborators',
        key: 'userMenu.account.collaborators',
        tab: 'Collaborators',
        name: 'Collaborators',
        position: IMenuPosition.BOTTOM,
        component: AccountSetting,
        exact: true,
        priority: 1,
        authority: ['admin', 'user'],
    },
    {
        path: '/:orgName/usermenu/account/git-integration',
        key: 'userMenu.account.git-integration',
        tab: 'Integration',
        name: 'Integration',
        position: IMenuPosition.BOTTOM,
        component: AccountSetting,
        exact: true,
        priority: 2,
        authority: ['admin', 'user'],
    },
    {
        path: '/:orgName/usermenu/account/tokens',
        key: 'userMenu.account.tokens',
        tab: 'Tokens',
        name: 'Tokens',
        position: IMenuPosition.BOTTOM,
        component: AccountSetting,
        exact: true,
        priority: 4,
        authority: ['admin', 'user'],
    },
    {
        path: '/:orgName/usermenu/account/referrals',
        key: 'userMenu.account.referrals',
        tab: 'Referrals',
        name: 'Referrals',
        position: IMenuPosition.BOTTOM,
        component: AccountSetting,
        exact: true,
        priority: 3,
        authority: ['admin', 'user'],
    },
    {
        path: '/:orgName/usermenu/organization',
        key: 'userMenu.organization',
        tab: 'Create Organization',
        component: Organization,
        position: IMenuPosition.BOTTOM,
        exact: true,
        priority: 6,
        authority: ['admin', 'user'],
    }

];

const selectedRoutesAndMenus = ['userMenu', 'userMenu.billing', 'userMenu.billing.home', 'userMenu.account', 'userMenu.account.referrals', 'userMenu.account.tokens', 'userMenu.account.git-integration', 'userMenu.account.collaborators', 'userMenu.account.profile', 'userMenu.organization'];

// get menus
const filteredMenus = getFilteredMenus(accountPageStore, selectedRoutesAndMenus);

// get routes
const filteredRoutes = getFilteredRoutes(accountPageStore, selectedRoutesAndMenus);

export { filteredMenus, filteredRoutes };
