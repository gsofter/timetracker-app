import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';
import { Dashboard } from '../common/components/Dashboard';
import { Account } from './components/Account';
import { Billing } from './components/Billing';
import { AccountSetting } from './components/AccountSetting';
import { Organization } from './components/Organization';
import { OrganizationSwitch } from './components/OrganizationSwitch';
import { getFilteredMenus, getFilteredRoutes } from '../utils';
import {
    UserOutlined
  } from '@ant-design/icons';

export const accountPageStore: any[] = [
    {
        path: '/:orgName/usermenu',
        key: '/:orgName/usermenu',
        exact: false,
        name: 'User',
        component: Dashboard,
        position: IMenuPosition.MIDDLE,
        icon: <UserOutlined/>,
    },
    {
        path: '/:orgName/usermenu/account/profile',
        key: '/:orgName/usermenu/account/profile',
        tab: 'Profile Setting',
        component: Account,
        position: IMenuPosition.BOTTOM,
        exact: true,
    },
    {
        path: '/:orgName/usermenu/billing',
        key: '/:orgName/usermenu/billing',
        exact: false,
        name: 'Billing Setting',
        component: Billing,
        position: IMenuPosition.BOTTOM,
        children: [
            {
                exact: true,
                key: '/:orgName/usermenu/billing/home',
                name: 'Home',
                path: '/:orgName/usermenu/billing/home',
                component: Billing
            }
        ]
    },
    {
        path: '/:orgName/usermenu/account',
        key: '/:orgName/usermenu/account',
        tab: 'Accounts',
        component: AccountSetting,
        position: IMenuPosition.BOTTOM,
        exact: false,
        children: [
            {
                path: '/:orgName/usermenu/account/collaborators',
                key: '/:orgName/usermenu/account/collaborators',
                tab: 'Collaborators',
                name: 'Collaborators',
                position: IMenuPosition.BOTTOM,
                component: AccountSetting,
                exact: true,
            },
            {
                path: '/:orgName/usermenu/account/git-integration',
                key: '/:orgName/usermenu/account/git-integration',
                tab: 'Integration',
                name: 'Integration',
                position: IMenuPosition.BOTTOM,
                component: AccountSetting,
                exact: true,
            },
            {
                path: '/:orgName/usermenu/account/tokens',
                key: '/:orgName/usermenu/account/tokens',
                tab: 'Tokens',
                name: 'Tokens',
                position: IMenuPosition.BOTTOM,
                component: AccountSetting,
                exact: true,
            },
            {
                path: '/:orgName/usermenu/account/referrals',
                key: '/:orgName/usermenu/account/referrals',
                tab: 'Referrals',
                name: 'Referrals',
                position: IMenuPosition.BOTTOM,
                component: AccountSetting,
                exact: true,
            }
        ]
    },
    {
        path: '/:orgName/usermenu/organization',
        key: '/:orgName/usermenu/organization',
        tab: 'Create Organization',
        component: Organization,
        position: IMenuPosition.BOTTOM,
        exact: true,
    },
    {
        path: '/:orgName/usermenu/switch-organization',
        key: '/:orgName/usermenu/switch-organization',
        tab: 'Select Organization',
        component: OrganizationSwitch,
        position: IMenuPosition.BOTTOM,
        exact: true,
    },

];

const selectedRoutesAndMenus = ['/:orgName/usermenu', '/:orgName/usermenu/account/profile' , '/:orgName/usermenu/billing', '/:orgName/usermenu/account', '/:orgName/usermenu/organization', '/:orgName/usermenu/switch-organization'];

// get menus
const filteredMenus = getFilteredMenus(accountPageStore, selectedRoutesAndMenus);

// get routes
const filteredRoutes = getFilteredRoutes(accountPageStore, selectedRoutesAndMenus);

export { filteredMenus, filteredRoutes };
