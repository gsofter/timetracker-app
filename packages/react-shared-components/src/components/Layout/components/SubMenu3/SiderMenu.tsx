import React from 'react';
import { Layout, Menu } from 'antd';
import classNames from 'classnames';
import { SiderProps } from 'antd/lib/layout/Sider';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useFela } from 'react-fela';

import { WithFalse } from '../typings';
import BaseMenu, { BaseMenuProps } from './BaseMenu';
import MenuCounter from './Counter';

const { Sider } = Layout;

export const defaultRenderLogo = (logo: React.ReactNode): React.ReactNode => {
  if (typeof logo === 'string') {
    return <img src={logo} alt="logo" />;
  }
  if (typeof logo === 'function') {
    return logo();
  }
  return logo;
};

export const defaultRenderLogoAndTitle = (
  props: SiderMenuProps,
  renderKey: string = 'menuHeaderRender',
): React.ReactNode => {
  const {
    logo = 'https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg',
    title,
    layout,
  } = props;
  const renderFunction = props[renderKey || ''];
  if (renderFunction === false) {
    return null;
  }
  const logoDom = defaultRenderLogo(logo);
  const titleDom = <h1>{title}</h1>;

  if (renderFunction) {
    // when collapsed, no render title
    return renderFunction(logoDom, props.collapsed ? null : titleDom, props);
  }

  if (layout === 'mix' && renderKey === 'menuHeaderRender') {
    return null;
  }

  return (
    <a>
      {logoDom}
      {props.collapsed ? null : titleDom}
    </a>
  );
};

export interface SiderMenuProps
  extends Pick<BaseMenuProps, Exclude<keyof BaseMenuProps, ['onCollapse']>> {
  logo?: React.ReactNode;
  siderWidth?: number;
  menuHeaderRender?: WithFalse<
    (
      logo: React.ReactNode,
      title: React.ReactNode,
      props?: SiderMenuProps,
    ) => React.ReactNode
  >;
  menuFooterRender?: WithFalse<(props?: SiderMenuProps) => React.ReactNode>;
  menuContentRender?: WithFalse<
    (props: SiderMenuProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  menuExtraRender?: WithFalse<(props: SiderMenuProps) => React.ReactNode>;
  collapsedButtonRender?: WithFalse<(collapsed?: boolean) => React.ReactNode>;
  breakpoint?: SiderProps['breakpoint'] | false;
  onMenuHeaderClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  hide?: boolean;
  className?: string;
  style?: any;
  links?: React.ReactNode[];
  onOpenChange?: (openKeys: WithFalse<string[]>) => void;
}

export const defaultRenderCollapsedButton = (collapsed?: boolean) =>
  collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />;

const SiderMenu: React.FC<SiderMenuProps> = (props) => {
  const {
    collapsed,
    fixSiderbar,
    menuFooterRender,
    onCollapse,
    theme,
    siderWidth = 208,
    isMobile,
    onMenuHeaderClick,
    breakpoint = 'lg',
    style,
    layout,
    menuExtraRender = false,
    collapsedButtonRender = defaultRenderCollapsedButton,
    links,
    menuContentRender,
    prefixCls = 'ant-pro',
    onOpenChange,
    headerHeight,
  } = props;
  const { css } = useFela(props);

  const baseClassName = `${prefixCls}-sider`;
  const { flatMenuKeys } = MenuCounter.useContainer();
  const siderClassName = classNames(`${baseClassName}`, {
    [`${baseClassName}-fixed`]: fixSiderbar,
    [`${baseClassName}-layout-${layout}`]: layout && !isMobile,
    [`${baseClassName}-light`]: theme === 'light',
  });
  const headerDom = defaultRenderLogoAndTitle(props);
  const extraDom = menuExtraRender && menuExtraRender(props);
  const menuDom = menuContentRender !== false && flatMenuKeys && (
    <BaseMenu
      {...props}
      mode="inline"
      handleOpenChange={onOpenChange}
      style={{
        width: '100%',
      }}
      className={`${baseClassName}-menu`}
    />
  );

  return (
    <>
      {fixSiderbar && (
        <div
          style={{
            width: collapsed ? 48 : siderWidth,
            overflow: 'hidden',
            flex: `0 0 ${collapsed ? 48 : siderWidth}px`,
            maxWidth: collapsed ? 48 : siderWidth,
            minWidth: collapsed ? 48 : siderWidth,
            ...style,
          }}
          className={css(styleSheet.siderMenuStyles)}
        />
      )}
      <Sider
        collapsible={true}
        trigger={null}
        collapsed={collapsed}
        breakpoint={breakpoint === false ? undefined : breakpoint}
        onCollapse={(collapse) => {
          if (!isMobile) {
            if (onCollapse) {
              onCollapse(collapse);
            }
          }
        }}
        collapsedWidth={65}
        style={{
                overflow: 'hidden',
                paddingTop:
                  layout === 'mix' && !isMobile ? headerHeight : undefined,
                ...style,
              }}
        width={siderWidth}
        theme={theme}
        className={`${siderClassName}`}
      >
        <div className={css(styleSheet.siderMenuStyles)}>
          {headerDom && (
            <div
              className={`${baseClassName}-logo`}
              onClick={layout !== 'mix' ? onMenuHeaderClick : undefined}
              id="logo"
            >
              {headerDom}
            </div>
          )}
          {extraDom && (
            <div
              className={`${baseClassName}-extra ${!headerDom &&
                `${baseClassName}-extra-no-logo`}`}
            >
              {extraDom}
            </div>
          )}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            {menuContentRender ? menuContentRender(props, menuDom) : menuDom}
          </div>
          <div className={`${baseClassName}-links`}>
            <Menu
              theme={theme}
              inlineIndent={16}
              className={`${baseClassName}-link-menu`}
              selectedKeys={[]}
              openKeys={[]}
              mode="inline"
            >
              {(links || []).map((node, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Menu.Item className={`${baseClassName}-link`} key={index}>
                  {node}
                </Menu.Item>
              ))}
              {collapsedButtonRender && !isMobile && (
                <Menu.Item
                  className={`${baseClassName}-collapsed-button`}
                  title={false}
                  onClick={() => {
                    if (onCollapse) {
                      onCollapse(!collapsed);
                    }
                  }}
                >
                  {collapsedButtonRender(collapsed)}
                </Menu.Item>
              )}
            </Menu>
          </div>
          {menuFooterRender && (
            <div className={`${baseClassName}-footer`}>
              {menuFooterRender(props)}
            </div>
          )}
        </div>
      </Sider>
    </>
  );
};

export default SiderMenu;

const styleSheet: any = {
  siderMenuStyles: ({ theme, primaryColor }) => ({
    position: 'relative',
    borderRight: '0',
    transition: 'background-color 0.3s',
    '& .ant-pro-sider.ant-menu-vertical .ant-menu-item:not(:last-child), .ant-pro-sider.ant-menu-vertical-left .ant-menu-item:not(:last-child), .ant-pro-sider.ant-menu-vertical-right .ant-menu-item:not(:last-child), .ant-pro-sider.ant-menu-inline .ant-menu-item:not(:last-child)': {
      marginBottom: '4px',
    },
    '& .ant-pro-sider.ant-layout-sider-light .ant-menu-item a, .ant-menu-submenu-selected, .ant-menu-submenu-title:hover, .ant-menu-submenu-title i:hover ': {
      color: primaryColor ? primaryColor : '#1890ff',
    },
    '& .ant-menu-submenu-inline > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before, .ant-menu-submenu-inline > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after': {
      background: `linear-gradient(to right, ${primaryColor ? primaryColor : '#1890ff'}, ${primaryColor ? primaryColor : '#1890ff'})`
    },
    '& .ant-pro-sider.ant-layout-sider-light, .ant-pro-sider.ant-layout-sider-light .ant-menu-item:not(.ant-menu-item-selected) a:hover, .ant-menu-item:hover': {
      color: primaryColor ? primaryColor : '#1890ff',
    },
    '& .ant-menu-item-selected a, .ant-menu-item-selected a:hover, .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected a:hover': {
      color: '#fff',
    },
    '& .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected': {
      background: primaryColor ? primaryColor : '#1890ff',
    },
    '& .ant-menu-inline .ant-menu-item::after': {
      borderRight: 'none',
    },
    '& .ant-pro-sider .ant-menu-inline-collapsed > .ant-menu-item .anticon + span, .ant-pro-sider .ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-item .anticon + span, .ant-pro-sider .ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-submenu > .ant-menu-submenu-title .anticon + span, .ant-pro-sider .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title .anticon + span': {
      display: 'none',
    },
    '& .ant-pro-sider ul.ant-menu-sub li.ant-menu-item .ant-pro-menu-item, .ant-pro-sider ul.ant-menu-sub li.ant-menu-submenu .ant-pro-menu-item': {
      paddingLeft: '8px',
    },
    '& .ant-pro-sider-logo': {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      padding: '16px 16px',
      lineHeight: '32px',
      cursor: 'pointer',
    },
    '& .ant-pro-sider-logo > a': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '32px',
    },
    '& .ant-pro-sider-logo img': {
      display: 'inline-block',
      height: '32px',
      verticalAlign: 'middle',
      transition: 'height 0.2s',
    },
    '& .ant-pro-sider-logo h1': {
      display: 'inline-block',
      height: '32px',
      margin: '0 0 0 12px',
      color: theme === 'light' ? primaryColor : '#fff',
      fontWeight: '600',
      fontSize: '18px',
      lineHeight: '32px',
      verticalAlign: 'middle',
      animation: 'fade-in',
      animationDuration: '0.2s',
    },
    '& .ant-pro-sider-extra': {
      marginBottom: '16px',
      padding: '0 16px',
    },
    '& .ant-pro-sider-extra-no-logo': {
      marginTop: '16px',
    },
    '& .ant-pro-sider-menu': {
      position: 'relative',
      zIndex: '10',
      minHeight: '100%',
      boxShadow: '2px 0 6px rgba(0,21,41,0.35)',
    },
    '& .ant-pro-sider .ant-layout-sider-children': {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    '& .ant-pro-sider .ant-layout-sider-children ::-webkit-scrollbar': {
      width: '6px',
      height: '6px',
    },
    '& .ant-pro-sider .ant-layout-sider-children ::-webkit-scrollbar-track': {
      background: 'rgba(255,255,255,0.15)',
      borderRadius: '3px',
      webkitBoxShadow: 'inset 0 0 5px rgba(37,37,37,0.05)',
    },
    '& .ant-pro-sider .ant-layout-sider-children ::-webkit-scrollbar-thumb': {
      background: 'rgba(255,255,255,0.2)',
      borderRadius: '3px',
      webkitBoxShadow: 'inset 0 0 5px rgba(255,255,255,0.05)',
    },
    '& .ant-pro-sider.ant-layout-sider-collapsed .ant-menu-inline-collapsed': {
      width: '48px',
    },
    '& .ant-pro-sider.ant-layout-sider-collapsed .ant-pro-sider-logo': {
      padding: '16px 8px',
    },
    '& .ant-pro-sider .ant-menu-inline-collapsed > .ant-menu-item .sider-menu-item-img + span, .ant-pro-sider .-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-item .sider-menu-item-img + span, .ant-pro-sider .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title .sider-menu-item-img + span': {
      display: 'inline-block',
      maxWidth: 0,
      opacity: 0,
    },
    '& .ant-pro-sider .ant-menu-inline-collapsed .ant-menu-item': {
      width: '48px',
      padding: '0 16px !important',
    },
    '& .ant-pro-sider .ant-menu-inline-collapsed .ant-pro-menu-item-title': {
      display: 'none',
    },
    '& .ant-pro-sider .ant-menu-inline-collapsed .ant-menu-submenu-title': {
      width: '48px',
      padding: '0 16px !important',
    },
    '& .ant-pro-sider .ant-menu-item .anticon, .ant-pro-sider .ant-menu-submenu-title .anticon': {
      transition: 'none',
    },
    '& .ant-pro-sider-fixed': {
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '99',
      height: '100%',
      overflow: 'auto',
      overflowx: 'hidden',
      boxShadow: '2px 0 8px 0 rgba(29,35,41,0.05)',
    },
    '& .ant-pro-sider-fixed > .ant-menu-root :not(.ant-pro-sider-link-menu)': {
      height: 'calc(100vh - 64px)',
      overflowY: 'auto',
    },
    '& .ant-pro-sider .ant-menu-inline .ant-menu-item, .ant-pro-sider .ant-menu-inline .ant-menu-submenu-title': {
      width: '100%',
    },
    '& .ant-pro-sider-light': {
      boxShadow: '2px 0 8px 0 rgba(29,35,41,0.05)',
    },
    '& .ant-pro-sider-light .ant-layout-sider-children ::-webkit-scrollbar-track': {
      background: 'rgba(0,0,0,0.06)',
      borderRadius: '3px',
      webkitBoxShadow: 'inset 0 0 5px rgba(0,21,41,0.05)',
    },
    '& .ant-pro-sider-light .ant-layout-sider-children ::-webkit-scrollbar-thumb': {
      background: 'rgba(0,0,0,0.12)',
      borderRadius: '3px',
      webkitBoxShadow: 'inset 0 0 5px rgba(0,21,41,0.05)',
    },
    '& .ant-pro-sider-light .ant-pro-sider-logo h1': {
      color: theme === 'light' ? primaryColor : '#fff',
    },
    '& .ant-pro-sider-light .ant-menu-light': {
      borderRightColor: 'transparent',
    },
    '& .ant-pro-sider-icon': {
      width: '14px',
      verticalAlign: 'baseline',
    },
    '& .ant-pro-sider-links': {
      width: '100%',
    },
    '&.ant-pro-sider-links ul.-menu-root': {
      height: 'auto',
    },
    '& .ant-pro-sider-collapsed-button': {
      borderTop: 'rgba(0,0,0,0.25)',
    },
    '& .ant-pro-sider-collapsed-button .anticon': {
      fontSize: '16px',
    },
    '& .ant-pro-sider .top-nav-menu li.ant-menu-item': {
      height: '100%',
      lineHeight: 1,
    },
    '& .ant-pro-sider .drawer .drawer-content': {
      //  background: ;
    },
    '& .ant-pro-sider .ant-menu-item .sider-menu-item-img + span, .ant-pro-sider .ant-menu-submenu-title .sider-menu-item-img + span': {
      opacity: 1,
      transition: 'opacity 0.3s , width 0.3s',
    },
    '& .ant-menu-inline-collapsed > .ant-menu-item, .ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-item, .ant-menu-inline-collapsed > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-submenu > .ant-menu-submenu-title, .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title': {
      padding: '0 24px',
    },
    '& .ant-pro-sider-menu.mobile-base-menu .ant-menu-submenu-title': {
      height: 'auto',
      lineHeight: '25px',
      whiteSpace: 'normal',
    },
    '& .ant-pro-sider-menu.mobile-base-menu .ant-menu-submenu-title .ant-pro-menu-item': {
      display: 'flex',
    },
    '& .ant-pro-sider-menu.mobile-base-menu .ant-menu-submenu-title .ant-pro-menu-item .anticon': {
      paddingTop: '5px',
    },
    '@keyframes fade-in': {
      '0%': {
        display: 'none',
        opacity: 0,
      },
      '99%': {
        display: 'none',
        opacity: 0,
      },
      '100%': {
        display: 'block',
        opacity: 1,
      },
    },
  }),
};
const styles: any = {
  btnNavigation: (props) => ({
    fontSize: '25px',
    padding: '12px',
    bottom: '5%',
    right: '5%',
    display: 'flex',
    position: 'absolute',
  }),
};
