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
        key: 'usermenu',
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
        key: 'usermenu.billing',
        exact: true,
        name: 'Billing Setting',
        component: Billing,
        position: IMenuPosition.BOTTOM,
        priority: 3,
        authority: ['admin', 'user'],
    },
    {
        exact: true,
        key: 'usermenu.billing.home',
        name: 'Home',
        path: '/:orgName/usermenu/billing/home',
        component: Billing,
        priority: 1,
        authority: ['admin', 'user'],
    },
    {
        path: '/:orgName/usermenu/profile',
        key: 'usermenu.account.profile',
        tab: 'Profile Setting',
        component: Account,
        position: IMenuPosition.BOTTOM,
        exact: true,
        priority: 2,
        authority: ['admin', 'user'],
    },
    {
        path: '/:orgName/usermenu/account',
        key: 'usermenu.account',
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
        key: 'usermenu.account.collaborators',
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
        key: 'usermenu.account.git-integration',
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
        key: 'usermenu.account.tokens',
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
        key: 'usermenu.account.referrals',
        // tab: 'Referrals',
        // name: 'Referrals',
        position: IMenuPosition.BOTTOM,
        component: AccountSetting,
        hideInMenu: true,
        exact: true,
        priority: 3,
        authority: ['admin', 'user'],
    },
    {
        path: '/:orgName/usermenu/organization',
        key: 'usermenu.organization',
        tab: 'Create Organization',
        component: Organization,
        position: IMenuPosition.BOTTOM,
        exact: true,
        priority: 6,
        authority: ['admin', 'user'],
    }

];

const selectedRoutesAndMenus = ['usermenu', 'usermenu.billing', 'usermenu.billing.home', 'usermenu.account', 'usermenu.account.referrals', 'usermenu.account.tokens', 'usermenu.account.git-integration', 'usermenu.account.collaborators', 'usermenu.account.profile', 'usermenu.organization'];

// get menus
const filteredMenus = getFilteredMenus(accountPageStore, selectedRoutesAndMenus);

// get routes
const filteredRoutes = getFilteredRoutes(accountPageStore, selectedRoutesAndMenus);

export { filteredMenus, filteredRoutes };
