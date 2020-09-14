import React, { CSSProperties } from 'react';
import { Layout, Menu } from 'antd';
import classNames from 'classnames';
import { SiderProps } from 'antd/lib/layout/Sider';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import {useFela} from 'react-fela';

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
    (logo: React.ReactNode, title: React.ReactNode, props?: SiderMenuProps) => React.ReactNode
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
    // style,
    layout,
    menuExtraRender = false,
    collapsedButtonRender = defaultRenderCollapsedButton,
    links,
    menuContentRender,
    prefixCls = 'ant-pro',
    onOpenChange,
    headerHeight,
    
  } = props;
  
  const {css} = useFela(props);

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
    className={`${css(styleSheet.baseMenu)} ${baseClassName}-menu`}
    />
    );
    return (
      <>
      {fixSiderbar && (
        <div
          className={css(styleSheet.menuLayoutStyle)}
        />
        )}
      <Sider
        collapsible
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
        className={css(styleSheet.siderMenuStyle)} {...siderClassName}
        width={siderWidth}
        theme={theme}
        >
        {headerDom && (
          <div
          className={css(styles.antProSiderLogo)}
          onClick={layout !== 'mix' ? onMenuHeaderClick : undefined}
          id="logo"
          >
            {headerDom}
          </div>
        )}
        {extraDom && (
          <div
          className={`${baseClassName}-extra ${!headerDom && `${baseClassName}-extra-no-logo`}`}
          >
            {extraDom}
          </div>
        )}
        <div
          className={css(styleSheet.menuContentStyle)}
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
          <div className={`${baseClassName}-footer`}>{menuFooterRender(props)}</div>
          )}
      </Sider>
    </>
  );
};

export default SiderMenu;

const styleSheet:any = {
  menuContentStyle: (props) => (
    {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
    }
    ),
    siderMenuStyle: (props) => (
    {
      overflow: 'hidden',
      paddingTop: props.layout === 'mix' ? props.headerHeight : undefined,
    }
  ),
  menuLayoutStyle: props => (
    {
      width: props.collapsed ? 48 : props.siderWidth,
      overflow: 'hidden',
      flex: `0 0 ${props.collapsed ? 48 : props.siderWidth}px`,
      maxWidth: props.collapsed ? 48 : props.siderWidth,
      minWidth: props.collapsed ? 48 : props.siderWidth,
    }
  )
}
const styles: any = {
  baseMenu: props => (
    {
      width: "100%"
    }
  ),
  antProSiderLogo: props => (
    {
      position: "relative",
      display: "flex",
      alignItems: "center",
      padding: "16px",
      lineHeight: "32px",
      cursor: "pointer",
      '> a > img': {
        display: "inline-block",
        height: "32px",
        verticalAlign: "middle",
        transition: "height .2s",
      },
      '> a > h1': {
        display: "inline-block",
        height: "32px",
        margin: "0 0 0 12px",
        color: "#fff",
        fontWeight: "600",
        fontSize: "18px",
        lineHeight: "32px",
        verticalAlign: "middle",
        animation: "fade-in",
        animationDuration: ".2s",
      },
    }
  ),
  btnNavigation: props => ({
    fontSize: "25px",
    padding: "12px",
    bottom: "5%",
    right: "5%",
    display: "flex",
    position: "absolute",
  }),
};