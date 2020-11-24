import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { BreadcrumbProps as AntdBreadcrumbProps } from 'antd/lib/breadcrumb';
import { Layout, ConfigProvider } from 'antd';
import classNames from 'classnames';
import warning from 'warning';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { stringify } from 'use-json-comparison';
import useAntdMediaQuery from 'use-media-antd-query';
import { useDeepCompareEffect, useDocumentTitle, isBrowser } from '../../../utils';
import Omit from 'omit.js';
import { getMatchMenu } from '@umijs/route-utils';

import Header, { HeaderViewProps } from './Header';
import { MenuDataItem, MessageDescriptor, Route, RouterTypes, WithFalse } from './typings';
import { getPageTitleInfo, GetPageTitleProps } from './getPageTitle';
import defaultSettings, { ProSettings } from './defaultSettings';
import getLocales, { LocaleType } from './locales';
import { BaseMenuProps } from './SiderMenu/BaseMenu';
import Footer from './Footer';
import RouteContext from './RouteContext';
import SiderMenu from './SiderMenu';
import { SiderMenuProps } from './SiderMenu/SiderMenu';
import { getBreadcrumbProps } from './utils/getBreadcrumbProps';
import getMenuData from './utils/getMenuData';
import PageLoading from './PageLoading';
import MenuCounter from './SiderMenu/Counter';
import WrapContent from './WrapContent';
import compatibleLayout from './utils/compatibleLayout';
import useCurrentMenuLayoutProps from './utils/useCurrentMenuLayoutProps';
import { clearMenuItem } from './utils/utils';

import { useFela } from "react-fela";

export type BasicLayoutProps = Partial<RouterTypes<Route>> &
  SiderMenuProps &
  HeaderViewProps & {
    pure?: boolean;
    /**
     *@name logo url
     */
    logo?: React.ReactNode | WithFalse<() => React.ReactNode>;

    /**
     *@name 页面切换的时候触发
     */
    onPageChange?: (location?: RouterTypes<Route>['location']) => void;

    loading?: boolean;

    locale?: LocaleType;

    onCollapse?: (collapsed: boolean) => void;

    footerRender?: WithFalse<
      (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
    >;

    breadcrumbRender?: (routers: AntdBreadcrumbProps['routes']) => AntdBreadcrumbProps['routes'];
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
  matchMenuKeys: string[],
): React.ReactNode => {
  if (props.headerRender === false || props.pure) {
    return null;
  }
  return <Header matchMenuKeys={matchMenuKeys} {...props} />;
};

const footerRender = (props: BasicLayoutProps): React.ReactNode => {
  if (props.footerRender === false || props.pure) {
    return null;
  }
  if (props.footerRender) {
    return props.footerRender({ ...props }, <Footer />);
  }
  return null;
};

const renderSiderMenu = (props: BasicLayoutProps, matchMenuKeys: string[]): React.ReactNode => {
  const { layout, isMobile, openKeys, splitMenus, menuRender } = props;
  if (props.menuRender === false || props.pure) {
    return null;
  }
  let { menuData } = props;

  /**
   * 如果是分割菜单模式，需要专门实现一下
   */
  if (splitMenus && openKeys !== false && !isMobile) {
    const [key] = matchMenuKeys;
    if (key) {
      menuData = props.menuData?.find((item) => item.key === key)?.children || [];
    } else {
      menuData = [];
    }
  }

  // 这里走了可以少一次循环
  const clearMenuData = clearMenuItem(menuData || []);
  if (clearMenuData && clearMenuData?.length < 1 && splitMenus) {
    return null;
  }
  if (layout === 'top' && !isMobile) {
    return <SiderMenu matchMenuKeys={matchMenuKeys} {...props} hide />;
  }
  if (menuRender) {
    const defaultDom = (
      <SiderMenu
        matchMenuKeys={matchMenuKeys}
        {...props}
        // 这里走了可以少一次循环
        menuData={clearMenuData}
      />
    );
    return menuRender(props, defaultDom);
  }

  return (
    <SiderMenu
      matchMenuKeys={matchMenuKeys}
      {...props}
      // 这里走了可以少一次循环
      menuData={clearMenuData}
    />
  );
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
      title: props.title || '',
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
    return collapsed ? 48 : siderWidth;
  }
  return 0;
};

/**
 * 🌃 Powerful and easy to use beautiful layout
 * 🏄‍ Support multiple topics and layout types
 * @param props
 */
const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  //@sri custom function
  const menuSeparation = (menus) => {
    const upperMenus = menus.filter(menu => menu.position === 'UPPER');
    const middleMenus = menus.filter(menu => ((menu.position === 'MIDDLE') || (menu.position !== 'UPPER' && menu.position !== 'LOWER' && menu.position !== 'BOTTOM')));
    const lowerMenus = menus.filter(menu => menu.position === 'LOWER');
    const bottomMenus = menus.filter(menu => menu.position === 'BOTTOM');
    return {
      upperMenus,
      middleMenus,
      lowerMenus,
      bottomMenus
    }
  }
  //@sri custom css
  const { css, theme } = useFela(props);
  const {
    children,
    onCollapse: propsOnCollapse,
    location = { pathname: '/' },
    contentStyle,
    route,
    defaultCollapsed,
    style,
    disableContentMargin,
    siderWidth = 208,
    menu,
    isChildrenLayout: propsIsChildrenLayout,
    menuDataRender,
    loading,
  } = props;

  const context = useContext(ConfigProvider.ConfigContext);
  const prefixCls = props.prefixCls ?? context.getPrefixCls('pro');

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
    return locales[id] ? locales[id] : (defaultMessage as string);
  };

  const [menuInfoData, setMenuInfoData] = useMergedState<{
    breadcrumb?: {
      [key: string]: MenuDataItem;
    };
    breadcrumbMap?: Map<string, MenuDataItem>;
    menuData?: MenuDataItem[];
  }>(() => getMenuData(route?.routes || [], menu, formatMessage, menuDataRender));

  const { breadcrumb = {}, breadcrumbMap, menuData = [] } = menuInfoData;

  const matchMenus = getMatchMenu(location.pathname || '/', menuData, true);
  const matchMenuKeys = Array.from(new Set(matchMenus.map((item) => item.key || item.path || '')));

  // 当前选中的menu，一般不会为空
  const currentMenu = (matchMenus[matchMenus.length - 1] || {}) as ProSettings & MenuDataItem;
  const currentMenuLayoutProps = useCurrentMenuLayoutProps(currentMenu);
  const { fixSiderbar, navTheme, layout: defaultPropsLayout, ...rest } = {
    ...props,
    ...currentMenuLayoutProps,
  };

  const propsLayout = compatibleLayout(defaultPropsLayout);

  const colSize = useAntdMediaQuery();

  const isMobile = (colSize === 'sm' || colSize === 'xs') && !props.disableMobile;

  /**
   *  如果 menuRender 不存在，可以做一下性能优化
   *  只要 routers 没有更新就不需要重新计算
   */
  useDeepCompareEffect(() => {
    if (menu?.loading) {
      return () => null;
    }
    // if (!menuDataRender) {
    const infoData = getMenuData(route?.routes || [], menu, formatMessage, menuDataRender);
    // 稍微慢一点 render，不然会造成性能问题，看起来像是菜单的卡顿
    const animationFrameId = requestAnimationFrame(() => {
      setMenuInfoData(infoData);
    });
    return () => window.cancelAnimationFrame && window.cancelAnimationFrame(animationFrameId);
  }, [props.route, stringify(menu)]);

  // If it is a fix menu, calculate padding
  // don't need padding in phone mode
  const hasLeftPadding = propsLayout !== 'top' && !isMobile;

  const [collapsed, onCollapse] = useMergedState<boolean>(defaultCollapsed || false, {
    value: props.collapsed,
    onChange: propsOnCollapse,
  });

  // Splicing parameters, adding menuData and formatMessage in props

  const defaultProps = Omit(
    {
      prefixCls,
      ...props,
      siderWidth,
      ...currentMenuLayoutProps,
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

  // gen breadcrumbProps, parameter for pageHeader
  const breadcrumbProps = getBreadcrumbProps({
    ...defaultProps,
    breadcrumbMap,
  });


  // render sider dom
  const siderMenuDom = renderSiderMenu({
    ...defaultProps,
    separateMenus: menuSeparation(menuData),
    menuData,
    onCollapse,
    isMobile,
    theme: (navTheme || 'dark').toLocaleLowerCase().includes('dark') ? 'dark' : 'light',
    collapsed,
  },
    matchMenuKeys,
  );

  // render header dom
  const headerDom = headerRender(
    {
      ...defaultProps,
      hasSiderMenu: !!siderMenuDom,
      menuData,
      isMobile,
      collapsed,
      onCollapse,
      theme: (navTheme || 'dark').toLocaleLowerCase().includes('dark') ? 'dark' : 'light',
    },
    matchMenuKeys,
  );

  // render footer dom

  const footerDom = footerRender({
    isMobile,
    collapsed,
    ...defaultProps,
  });

  const { isChildrenLayout: contextIsChildrenLayout } = useContext(RouteContext);

  // 如果 props 中定义，以 props 为准
  const isChildrenLayout =
    propsIsChildrenLayout !== undefined ? propsIsChildrenLayout : contextIsChildrenLayout;

  const baseClassName = `${prefixCls}-basicLayout`;
  // gen className
  const className = classNames(
    props.className,
    'ant-design-pro',
    // baseClassName,
    css(styleSheet.basicLayout),
    {
      [`screen-${colSize}`]: colSize,
      [`${baseClassName}-top-menu`]: propsLayout === 'top',
      [`${baseClassName}-is-children`]: isChildrenLayout,
      [`${baseClassName}-fix-siderbar`]: fixSiderbar,
      [`${baseClassName}-${propsLayout}`]: propsLayout,
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
  useDocumentTitle(pageTitleInfo, props.title || defaultSettings.title);


  return (
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
          hasFooter: !!footerDom,
          hasFooterToolbar,
          setHasFooterToolbar,
          pageTitleInfo,
          matchMenus,
          matchMenuKeys,
          currentMenu,
        }}
      >
        {props.pure ? (
          children
        ) : (
            <div className={className}>
              <Layout
                className={css(styleSheet.layoutCss)}
                style={{
                  minHeight: '100%',
                  ...style,
                }}
                hasSider={true}>
                {siderMenuDom}
                <Layout className={css(styleSheet.genLayoutStyle)}>
                  {headerDom}
                  <WrapContent
                    isChildrenLayout={isChildrenLayout}
                    {...rest}
                    className={contentClassName}
                    style={contentStyle}
                  >
                    {loading ? <PageLoading /> : children}
                  </WrapContent>
                  {/* {footerDom} */}
                </Layout>
              </Layout>
            </div>
          )}
      </RouteContext.Provider>
    </MenuCounter.Provider>
  );
};

BasicLayout.defaultProps = {
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg',
  ...defaultSettings,
  location: isBrowser() ? window.location : undefined,
};

export default BasicLayout;

const styleSheet: any = {
  minHeight: (props) => ({
    minHeight: '100vh',
  }),
  genLayoutStyle: (props) => ({
    position: 'relative',
  }),
  basicLayout: () => ({
    display: 'flex',
    'flex-direction': 'column',
    width: '100%',
    'min-height': '100%',
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
      zIndex: 111,
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
