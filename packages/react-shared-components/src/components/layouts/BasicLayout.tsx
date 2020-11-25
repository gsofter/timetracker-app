
import {
    BasicLayout as ProLayout,
    MenuDataItem,
    BasicLayoutProps as ProLayoutProps,
    Settings,
    DefaultFooter,
} from '@admin-layout/components';
import React, { useEffect, useMemo, useRef } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { GithubOutlined } from '@ant-design/icons';
import { Result, Button } from 'antd';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { ConnectState } from '../../redux/connect';
// import Authorized from '@/utils/Authorized';
// import RightContent from '@/components/GlobalHeader/RightContent';
import { getMatchMenu } from '@umijs/route-utils';
import { useHistory } from 'react-router-dom';
import { IOrgNameInContextFragment } from '@admin-layout/core';
// import logo from '../assets/'

const noMatch = (
    <Result
        status={403}
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
            <Button type="primary">
                <Link to="/user/login">Go Login</Link>
            </Button>
        }
    />
);
export interface RouteParams {
    routeParams: IOrgNameInContextFragment
}

export interface ReduxState {
    settings: Settings;
}
export interface BasicLayoutProps extends ProLayoutProps {

    breadcrumbNameMap: {
        [path: string]: MenuDataItem;
    };
    route: ProLayoutProps['route'] & {
        authority: string[];
    };
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
        return localItem;
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
const generateMenuPath = (path, params) => {
    try {
        const generatedPath = generatePath(path, params);
        return generatedPath;
    } catch (err) {
        console.log('--fillParams.path', path)
        console.log('--fillParams.params', params)
        console.log('generatePath is errored due to missing orgId');
    }
    return null;
}
const BasicLayout: React.FC<BasicLayoutProps & RouteParams & ReduxState> = (props) => {
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
    const history = useHistory();

    return (
        <ProLayout
            {...props}
            {...settings}
            onMenuHeaderClick={() => history.push('/')}
            menuItemRender={(menuItemProps, defaultDom) => {
                if (menuItemProps.isUrl || !menuItemProps.path) {
                    return defaultDom;
                }
                return <Link to={generateMenuPath(menuItemProps.path, props.routeParams)}>{defaultDom}</Link>
            }}

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
                console.log('---POSTMENU DATA', menuData)
                menuDataRef.current = menuData || [];
                return menuData || [];
            }}
        >
            {children}
        </ProLayout>
    )
}

export default connect(({ settings }: ConnectState) => ({
    settings,
  }))(BasicLayout);
