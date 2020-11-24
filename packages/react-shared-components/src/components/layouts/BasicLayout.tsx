
import {
    BasicLayout as ProLayout,
    MenuDataItem,
    BasicLayoutProps as ProLayoutProps,
    Settings,
    DefaultFooter,
} from '@admin-layout/components';
import React, { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GithubOutlined } from '@ant-design/icons';
import { Result, Button } from 'antd';
// import { useIntl } from 'react-intl';

// import Authorized from '@/utils/Authorized';
// import RightContent from '@/components/GlobalHeader/RightContent';
import { getMatchMenu } from '@umijs/route-utils';
import { useHistory } from 'react-router-dom'
// import logo from '../assets/'



export interface BasicLayoutProps extends ProLayoutProps {
    breadcrumbNameMap: {
        [path: string]: MenuDataItem;
    };
    route: ProLayoutProps['route'] & {
        authority: string[];
    };
    settings: Settings;
}
export type BasicLayoutContent = { [K in 'location']: BasicLayoutProps[K] } & {
    breadcrumbNameMap: {
        [path: string]: MenuDataItem;
    };
};

/**
 * use Authorized check all menu item
 */
const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
    menuList.map((item) => {
        const localItem = {
            ...item,
            children: item.children ? menuDataRender(item.children) : undefined,
        };
        // return Authorized.check(item.authority, localItem, null) as MenuDataItem;
        return null;
    });

const defaultFooterDom = (
    <DefaultFooter
        copyright={`${new Date().getFullYear()} By CDMBase LLC`}
        links={[
            {
                key: 'CDEBase Pro',
                title: 'CDEBase  Pro',
                href: 'https://cdebase.com',
                blankTarget: true,
            },
            {
                key: 'github',
                title: <GithubOutlined />,
                href: 'https://github.com/cdebase',
                blankTarget: true,
            },
        ]}
    />
);

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
    const {
        children,
        settings,
        location = {
            pathname: '/',
        },
    } = props;

    const menuDataRef = useRef<MenuDataItem[]>([]);

    useEffect(() => {

    }, []);


    // get children authority
    const authorized = useMemo(
        () =>
            getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
                authority: undefined,
            },
        [location.pathname],
    );

    // const { formatMessage } = useIntl();
    const formatMessage = (props) => props;
    const history = useHistory();


    return (
        <ProLayout
            formatMessage={formatMessage}
            {...props}
            {...settings}
            onMenuHeaderClick={() => history.push('/')}
            menuItemRender={(menuItemProps, defaultDom) => {
                if (menuItemProps.isUrl || !menuItemProps.path) {
                    return defaultDom;
                }
                return <Link to={menuItemProps.path}>{defaultDom}</Link>
            }}
            breadcrumbRender={(routers = []) => [
                {
                    path: '/',
                    breadcrumbName: formatMessage({ id: 'menu.home' }),
                },
                ...routers,
            ]}
            itemRender={(route, params, routes, paths) => {
                const first = routes.indexOf(route) === 0;
                return first ? (
                    <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
                ) : (
                        <span>{route.breadcrumbName}</span>
                    )
            }}
            footerRender={() => defaultFooterDom}
            menuDataRender={menuDataRender}
            postMenuData={(menuData) => {
                menuDataRef.current = menuData || [];
                return menuData || [];
            }}
        >
            {children}
        </ProLayout>
    )
}

export default BasicLayout;