import React, { CSSProperties, useContext, useEffect, useState, useRef } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { useFela } from 'react-fela';
import SiderMenu from '../components/SubMenu3/index';
import { useRouteMatch, generatePath } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import useMergedState from 'rc-util/lib/hooks/useMergedState';
import warning from 'warning';
import classNames from 'classnames';
import { stringify } from 'use-json-comparison';
import Omit from 'omit.js';
import useAntdMediaQuery from 'use-media-antd-query';
import { BreadcrumbProps as AntdBreadcrumbProps } from 'antd/lib/breadcrumb';
import MenuCounter from '../components/SubMenu3/Counter';
import RouteContext, { RouteContextType } from '../components/RouteContext';
import { SiderMenuProps } from '../components/SubMenu3/SiderMenu';
import Header, { HeaderViewProps } from '../components/Header';
import defaultSettings, {
  PureSettings,
  ProSettings,
} from '../components/defaultSettings';
import {
  MenuDataItem,
  MessageDescriptor,
  Route,
  RouterTypes,
  WithFalse,
} from '../components/typings';
import { BaseMenuProps } from '../components/SubMenu3/BaseMenu';
import {
  getPageTitleInfo,
  GetPageTitleProps,
} from '../components/getPageTitle';
import getMenuData from '../components/utils/getMenuData';
import getLocales, { LocaleType } from '../components/locales';
import compatibleLayout from '../components/utils/compatibleLayout';
import WrapContent from '../components/WrapContent';
import useDeepCompareEffect from '../components/hooks/useDeepCompareEffect';
import { isBrowser } from '../components/utils/utils';
import SettingDrawer, {
  SettingDrawerProps,
  SettingDrawerState,
} from '../components/SettingDrawer';
import GridContent from '../components/GridContent/index';
// @ts-ignore
import favicon from '../../../../favicon.ico';
import { useGetOrgNameFromContextQuery } from '../../generated';

export type BasicLayoutProps = Partial<RouterTypes<Route>> &
  SiderMenuProps &
  HeaderViewProps &
  Partial<PureSettings> & {
    pure?: boolean;
    /**
     * logo url
     */
    logo?: React.ReactNode | WithFalse<() => React.ReactNode>;
    // params
    params?: any;
    /**
     * 页面切换的时候触发
     */
    onPageChange?: (location?: RouterTypes<Route>['location']) => void;

    loading?: boolean;

    locale?: LocaleType;

    onCollapse?: (collapsed: boolean) => void;

    footerRender?: WithFalse<
      (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
    >;

    breadcrumbRender?: (
      routers: AntdBreadcrumbProps['routes'],
    ) => AntdBreadcrumbProps['routes'];
    menuItemRender?: BaseMenuProps['menuItemRender'];
    pageTitleRender?: WithFalse<
      (
        props: GetPageTitleProps,
        defaultPageTitle?: string,
        info?: {
          // 页面标题
          title: string;
          // locale 的 title
          id: string;
          // 页面标题不带默认的 title
          pageName: string;
        },
      ) => string
    >;
    menuDataRender?: (menuData: MenuDataItem[]) => MenuDataItem[];
    itemRender?: AntdBreadcrumbProps['itemRender'];

    formatMessage?: (message: MessageDescriptor) => string;
    /**
     * 是否禁用移动端模式，有的管理系统不需要移动端模式，此属性设置为true即可
     */
    disableMobile?: boolean;
    contentStyle?: CSSProperties;
    isChildrenLayout?: boolean;

    className?: string;

    /**
     * 兼用 content的 margin
     */
    disableContentMargin?: boolean;
  };

const headerRender = (
  props: BasicLayoutProps & {
    hasSiderMenu: boolean;
  },
): React.ReactNode => {
  if (props.headerRender === false || props.pure) {
    return null;
  }
  return <Header {...props} />;
};

//  To do work on footer

// const footerRender = (props: BasicLayoutProps): React.ReactNode => {
//   if (props.footerRender === false || props.pure) {
//     return null;
//   }
//   if (props.footerRender) {
//     return props.footerRender({ ...props }, <Footer />);
//   }
//   return null;
// };

const renderSiderMenu = (props: BasicLayoutProps): React.ReactNode => {
  const { layout, isMobile, menuRender } = props;
  // const {css} = useFela(props);
  if (props.menuRender === false || props.pure) {
    return null;
  }
  if (layout === 'top' && !isMobile) {
    return <SiderMenu {...props} hide={true} />;
  }
  if (menuRender) {
    return menuRender(props, <SiderMenu {...props} />);
  }

  return <SiderMenu {...props} />;
};

const defaultPageTitleRender = (
  pageProps: GetPageTitleProps,
  props: BasicLayoutProps,
): {
  title: string;
  id: string;
  pageName: string;
} => {
  const { pageTitleRender } = props;
  const pageTitleInfo = getPageTitleInfo(pageProps);
  if (pageTitleRender === false) {
    return {
      title: 'title',
      id: '',
      pageName: '',
    };
  }
  if (pageTitleRender) {
    const title = pageTitleRender(
      pageProps,
      pageTitleInfo.title,
      pageTitleInfo,
    );
    if (typeof title === 'string') {
      return {
        ...pageTitleInfo,
        title,
      };
    }
    warning(
      typeof title === 'string',
      'pro-layout: renderPageTitle return value should be a string',
    );
  }
  return pageTitleInfo;
};

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumb: { [path: string]: MenuDataItem };
};

const getPaddingLeft = (
  hasLeftPadding: boolean,
  collapsed: boolean | undefined,
  siderWidth: number,
): number | undefined => {
  if (hasLeftPadding) {
    return collapsed ? 65 : siderWidth;
  }
  return 0;
};

const MainLayoutSection: React.FC<BasicLayoutProps> = (main_props) => {
  const [settings, setSettings] = useState({}); 
  const fillParms = (path, params) => {
    try {
      const generatedPath = generatePath(path, params);
      return generatedPath;
    } catch (err) {
      console.log('--fillParams.path', path)
      console.log('--fillParams.params', params)
      console.log('generatePath is errored due to missing orgId');
    }
    return '/';
  }

  const routesHandler = (routes, params) => {
    return routes.map(route => {
        const path =  fillParms(route.path, params);
        console.log('---pathas', path);
        return {
          path,
          children: route.children && routesHandler(route.children, params),
          exact: route.exact,
          icon: route.icon,
          key: path,
          name: route.name,
          position: route.position,
          tab: route.tab
        }
    });
  }

  const [ props, setUserRoutes ] = useState({ ...main_props, ...settings });
  const { params, userRoute } = {...props, userRoute: props.route};
  const prevRoute = useRef({ params, userRoute }).current;
  useEffect(() => {
    if (prevRoute.params !== params || prevRoute.userRoute !== userRoute) {
      setUserRoutes({ ...main_props, route: routesHandler(main_props.route, main_props.params), ...settings });
    }
    return () => { 
      prevRoute.params = params;
      prevRoute.userRoute = userRoute;
    };
  }, [params, userRoute]);

  const { css, theme } = useFela(props);
  const {
    children,
    onCollapse: propsOnCollapse,
    location = { pathname: '/' },
    fixSiderbar,
    navTheme,
    contentStyle,
    route: rs,
    layout: defaultPropsLayout,
    style,
    disableContentMargin,
    siderWidth = 208,
    menu,
    isChildrenLayout: propsIsChildrenLayout,
    menuDataRender,
    breadcrumbRender,
    loading,
    ...rest
  } = props;

  const route = { routes: rs };

  const propsLayout = compatibleLayout(defaultPropsLayout);
  const { prefixCls } = rest;
  const value = useContext(RouteContext);
  const prefixedClassName = `${prefixCls}-page-container`;

  const classNameLayout = classNames(prefixedClassName, props.className, {
    // [`${prefixCls}-page-container-ghost`]: ghost,
  });

  const formatMessage = ({
    id,
    defaultMessage,
    ...restParams
  }: {
    id: string;
    defaultMessage?: string;
  }): string => {
    if (props.formatMessage) {
      return props.formatMessage({
        id,
        defaultMessage,
        ...restParams,
      });
    }
    const locales = getLocales();
    if (locales[id]) {
      return locales[id];
    }
    if (defaultMessage) {
      return defaultMessage as string;
    }
    return id;
  };

  const colSize = useAntdMediaQuery();
  const { routes = [] } = route;
  const [menuInfoData, setMenuInfoData] = useMergedState<{
    breadcrumb?: {
      [key: string]: MenuDataItem;
    };
    breadcrumbMap?: Map<string, MenuDataItem>;
    menuData?: MenuDataItem[];
  }>(() => getMenuData(routes, menu, formatMessage, menuDataRender));

  let renderMenuInfoData: {
    breadcrumb?: {
      [key: string]: MenuDataItem;
    };
    breadcrumbMap?: Map<string, MenuDataItem>;
    menuData?: MenuDataItem[];
  } = {};

  // 如果menuDataRender 存在，就应该每次都render一下，不然无法保证数据的同步

  if (menuDataRender) {
    renderMenuInfoData = getMenuData(
      routes,
      menu,
      formatMessage,
      menuDataRender,
    );
  }

  const isMobile =
    (colSize === 'sm' || colSize === 'xs') && !props.disableMobile;

  const { breadcrumb = {}, breadcrumbMap, menuData = [] } = !menuDataRender
    ? menuInfoData
    : renderMenuInfoData;

  /**
   *  如果 menuRender 不存在，可以做一下性能优化
   *  只要 routers 没有更新就不需要重新计算
   */

  //  To do work on this function due to this less dependent package '@ant-design/pro-utils'

  useDeepCompareEffect(() => {
    if (!menuDataRender) {
      const infoData = getMenuData(routes, menu, formatMessage, menuDataRender);
      // 稍微慢一点 render，不然会造成性能问题，看起来像是菜单的卡顿
      const animationFrameId = requestAnimationFrame(() => {
        setMenuInfoData(infoData);
      });
      return () =>
        window.cancelAnimationFrame &&
        window.cancelAnimationFrame(animationFrameId);
    }
    return () => null;
  }, [props.route, stringify(menu)]);

  // If it is a fix menu, calculate padding
  // don't need padding in phone mode
  const hasLeftPadding = propsLayout !== 'top' && !isMobile;

  const [collapsed, onCollapse] = useMergedState<boolean>(false, {
    value: props.collapsed,
    onChange: propsOnCollapse,
  });

  // Splicing parameters, adding menuData and formatMessage in props

  const defaultProps = Omit(
    {
      ...props,
      formatMessage,
      breadcrumb,
      layout: compatibleLayout(props.layout) as 'side',
    },
    ['className', 'style'],
  );

  // gen page title
  const pageTitleInfo = defaultPageTitleRender(
    {
      pathname: location.pathname,
      ...defaultProps,
      breadcrumbMap,
    },
    props,
  );

  // render sider dom
  const siderMenuDom = renderSiderMenu({
    ...defaultProps,
    menuData,
    onCollapse,
    isMobile,
    theme: (navTheme || 'dark').toLocaleLowerCase().includes('dark')
      ? 'dark'
      : 'light',
    collapsed,
  });

  // render header dom
  const headerDom = headerRender({
    ...defaultProps,
    hasSiderMenu: !!siderMenuDom,
    menuData,
    isMobile,
    collapsed,
    onCollapse,
    theme: (navTheme || 'dark').toLocaleLowerCase().includes('dark')
      ? 'dark'
      : 'light',
  });

  // render footer dom

  // const footerDom = footerRender({
  //   isMobile,
  //   collapsed,
  //   ...defaultProps,
  // });

  const { isChildrenLayout: contextIsChildrenLayout } = useContext(
    RouteContext,
  );

  // 如果 props 中定义，以 props 为准
  const isChildrenLayout =
    propsIsChildrenLayout !== undefined
      ? propsIsChildrenLayout
      : contextIsChildrenLayout;

  const baseClassName = `${prefixCls}-basicLayout`;
  // gen className
  const className = classNames(
    props.className,
    'ant-design-pro',
    baseClassName,
    {
      [`screen-${colSize}`]: colSize,
      [`${baseClassName}-top-menu`]: propsLayout === 'top',
      [`${baseClassName}-is-children`]: isChildrenLayout,
      [`${baseClassName}-fix-siderbar`]: fixSiderbar,
      [`${baseClassName}-mobile`]: isMobile,
    },
  );

  /**
   * 计算 slider 的宽度
   */
  const leftSiderWidth = getPaddingLeft(
    !!hasLeftPadding,
    collapsed,
    siderWidth,
  );

  // siderMenuDom 为空的时候，不需要 padding
  const genLayoutStyle: CSSProperties = {
    position: 'relative',
  };

  // if is some layout children, don't need min height
  if (isChildrenLayout || (contentStyle && contentStyle.minHeight)) {
    genLayoutStyle.minHeight = 0;
  }

  const contentClassName = classNames(`${baseClassName}-content`, {
    [`${baseClassName}-has-header`]: headerDom,
    [`${baseClassName}-content-disable-margin`]: disableContentMargin,
  });

  /**
   * 页面切换的时候触发
   */
  useEffect(() => {
    const { onPageChange } = props;
    if (onPageChange) {
      onPageChange(props.location);
    }
  }, [stringify(props.location)]);
  const [hasFooterToolbar, setHasFooterToolbar] = useState(false);

  const [breadcrumbProps, setBreadcrumbProps] = useState({});
  const match = useRouteMatch();
  useEffect(() => {
    setBreadcrumbProps({
      ...defaultProps,
      breadcrumbMap,
    });
  }, [match]);

  return (
    <div id="test-pro-layout">
      <MenuCounter.Provider>
        <RouteContext.Provider
          value={{
            ...defaultProps,
            breadcrumb: breadcrumbProps,
            menuData,
            isMobile,
            collapsed,
            isChildrenLayout: true,
            title: pageTitleInfo.pageName,
            hasSiderMenu: !!siderMenuDom,
            hasHeader: !!headerDom,
            siderWidth: leftSiderWidth,
            // hasFooter: !!footerDom,
            // hasFooterToolbar,
            // setHasFooterToolbar,
            pageTitleInfo,
          }}
        >
          <div className={className}>
            <Helmet>
              <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
            </Helmet>
            <Layout className={css(styleSheet.layoutCss)} hasSider={true}>
              {siderMenuDom}
              <Layout className={css(styleSheet.genLayoutStyle)}>
                {headerDom}
                <WrapContent
                  isChildrenLayout={isChildrenLayout}
                  {...rest}
                  className={contentClassName}
                  style={contentStyle}
                >
                  <div className={classNameLayout}>
                    <div className="ant-pro-page-container-warp">
                      <Breadcrumb>
                        <Breadcrumb.Item>
                          <a href="/">Home</a>
                        </Breadcrumb.Item>
                        {pageTitleInfo.id.split('.')[1] !== 'Home' && (
                          <>
                            <Breadcrumb.Item>
                              {pageTitleInfo.id.split('.')[1]}
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                              <a href={location.pathname}>
                                {' '}
                                {pageTitleInfo.pageName}
                              </a>
                            </Breadcrumb.Item>
                          </>
                        )}
                      </Breadcrumb>
                      <div className="ant-page-header-heading">
                        <div className="ant-page-header-heading-left">
                          <span className="ant-page-header-heading-title">
                            {pageTitleInfo.pageName}
                          </span>
                        </div>
                      </div>
                    </div>
                    <GridContent>
                      <div className="ant-pro-page-container-children-content">
                        {children ? (
                          <div className="ant-card">
                            <div className="ant-card-spacing">{children}</div>
                          </div>
                        ) : null}
                      </div>
                    </GridContent>
                  </div>
                </WrapContent>
                {/* {footerDom} */}
              </Layout>
            </Layout>
            <SettingDrawer
              getContainer={() => document.getElementById('test-pro-layout')}
              settings={settings}
              onSettingChange={(changeSetting) => setSettings(changeSetting)}
            />
          </div>
        </RouteContext.Provider>
      </MenuCounter.Provider>
    </div>
  );
};

export const MainLayout: React.SFC<BasicLayoutProps> = (props) => {
  const { data, loading} = useGetOrgNameFromContextQuery();
  if(loading) {
      return (<div>Loading</div>)
  }

  const params = { ...data.getOrgNameFromContext}
  return (
      <MainLayoutSection params={params} {...props}/>
  )    
}


MainLayoutSection.defaultProps = {
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg',
  ...defaultSettings,
  prefixCls: 'ant-pro',
  siderWidth: 208,
  location: isBrowser() ? window.location : undefined,
};
const styleSheet: any = {
  minHeight: (props) => ({
    minHeight: '100vh',
  }),
  genLayoutStyle: (props) => ({
    position: 'relative',
  }),
  layoutCss: ({ theme, primaryColor, layout }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: '100vh',
    '& .ant-pro-fixed-header': {
      position: layout === 'top' || 'mix' ? 'fixed' : 'relative',
      top: 0,
    },
    '& .ant-pro-sider-fixed': {
      position: layout === 'top' || 'mix' ? 'fixed' : 'relative',
      height: '100vh',
    },
    '& .ant-pro-basicLayout .ant-layout-header .ant-pro-fixed-header': {
      position: 'fixed',
      top: 0,
    },
    '& .ant-pro-basicLayout-content': {
      position: 'relative',
      margin: '24px',
    },
    '& .ant-pro-basicLayout-content .ant-pro-page-container': {
      margin: '-24px -24px 0',
    },
    '& .ant-pro-basicLayout-content-disable-margin': {
      margin: 0,
    },
    '& .ant-pro-basicLayout-content-disable-margin .ant-pro-page-container': {
      margin: 0,
    },
    '& .ant-pro-basicLayout-content > .ant-layout': {
      maxHeight: '100%',
    },
    '& .ant-pro-basicLayout .ant-pro-basicLayout-is-children .ant-pro-basicLayout-fix-siderbar': {
      height: '100vh',
      overflow: 'hidden',
      transform: 'rotate(0)',
    },
    '& .ant-pro-basicLayout .ant-pro-basicLayout-has-header .tech-page-container': {
      height: 'calc(52vh)',
    },
    '& .ant-pro-basicLayout .ant-pro-basicLayout-has-header .ant-pro-basicLayout-is-children.ant-pro-basicLayout-has-header .ant-pro-basicLayout-is-children': {
      minHeight: 'calc(52vh)',
    },
    '& .ant-pro-basicLayout .ant-pro-basicLayout-has-header .ant-pro-basicLayout-is-children.ant-pro-basicLayout-has-header .ant-pro-basicLayout-is-children.ant-pro-basicLayout-fix-siderbar': {
      height: 'calc(52vh)',
    },
    '& .ant-pro-page-container-warp': {
      backgroundColor: '#fff',
      padding: '16px',
    },
    '& .ant-page-header': {
      boxSizing: 'border-box',
      margin: '0',
      color: 'rgba(0,0,0,.85)',
      fontSize: '14px',
      fontVariant: 'tabular-nums',
      lineHeight: '1.5715',
      listStyle: 'none',
      fontFeatureSettings: 'tnum , tnum',
      position: 'relative',
      padding: '18px 24px',
      backgroundColor: '#fff',
    },
    '& .ant-page-header.has-breadcrumb': {
      paddingTop: '12px',
    },
    '& .ant-pro-page-container-children-content': {
      margin: '16px 16px 0',
    },
    '&.ant-pro-page-container-warp': {
      backgroundColor: '#fff',
    },
    '& .ant-pro-page-container-warp .ant-tabs-nav': {
      margin: 0,
    },
    '& .ant-pro-page-container-main .ant-pro-page-container-detail': {
      display: 'flex',
    },
    '& .ant-pro-page-container-main .ant-pro-page-container-row': {
      display: 'flex',
      width: '100%',
    },
    '& .ant-pro-page-container-main .ant-pro-page-container-title-content': {
      marginBottom: '16px',
    },
    '& .ant-pro-page-container-main .ant-pro-page-container-title, .ant-pro-page-container-main .ant-pro-page-container-content': {
      flex: 'auto',
    },
    '& .ant-pro-page-container-main .ant-pro-page-container-extraContent, .ant-pro-page-container-main .-pro-page-container-main': {
      flex: '0 1 auto',
    },
    '& .ant-pro-page-container-main .ant-pro-page-container-main': {
      width: '100%',
    },
    '& .ant-pro-page-container-main .ant-pro-page-container-title': {
      marginBottom: '16px',
    },
    '& .ant-pro-page-container-main .ant-pro-page-container-logo': {
      marginBottom: '16px',
    },
    '& .ant-pro-page-container-main .ant-pro-page-container-extraContent': {
      minWidth: '242px',
      marginLeft: '88px',
      textAlign: 'right',
    },
    '& .ant-card-spacing': {
      padding: '16px',
    },
    '& .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected': {
      backgroundColor: primaryColor
    },
  })
};
