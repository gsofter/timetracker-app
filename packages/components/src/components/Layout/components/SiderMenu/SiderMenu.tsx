import React from 'react';
import { Layout, Menu, Divider } from 'antd';
import classNames from 'classnames';
import { SiderProps } from 'antd/lib/layout/Sider';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import { WithFalse } from '../typings';
import BaseMenu, { BaseMenuProps } from './BaseMenu';
import MenuCounter from './Counter';
import { useFela } from 'react-fela';

const { Sider } = Layout;
import { styleSheet } from './styles';

export const defaultRenderLogo = (logo: React.ReactNode): React.ReactNode => {
  if (typeof logo === 'string') {
    return <img src={logo} alt="logo" />;
  }
  if (typeof logo === 'function') {
    return logo();
  }
  return logo;
};

/**
 * Custom Menu seperation.
 * @sri custom method
 * @param props
 * @param position
 */
export const menuSeparation = (props, position) => {
  if (props.separateMenus) {
    switch (position) {
      case 'UPPER':
        return { ...props, menuData: props.separateMenus.upperMenus };
      case 'MIDDLE':
        return { ...props, menuData: props.separateMenus.middleMenus };
      case 'LOWER':
        return { ...props, menuData: props.separateMenus.lowerMenus };
      case 'BOTTOM':
        return { ...props, menuData: props.separateMenus.bottomMenus };
      default:
        break;
    }
  } else {
    return null;
  }
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

// @sri custom type
export type SeparateMenusTypes = {
  upperMenus?: Object;
  middleMenus?: Object;
  lowerMenus?: Object;
  bottomMenus?: Object;
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
  separateMenus?: SeparateMenusTypes;
  onOpenChange?: (openKeys: WithFalse<string[]>) => void;
  getContainer?: false;
}

export const defaultRenderCollapsedButton = (collapsed?: boolean) =>
  collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />;

export type PrivateSiderMenuProps = {
  matchMenuKeys: string[];
};

const SiderMenu: React.FC<SiderMenuProps & PrivateSiderMenuProps> = props => {
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
    prefixCls,
    onOpenChange,
    headerHeight,
  } = props;
  // @sri custom addition
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
  const menuDom = (props, divider, mode) =>
    menuContentRender !== false &&
    flatMenuKeys && (
      <>
        {Boolean(divider) && props && props.menuData && props.menuData.length > 0 ? (
          <Divider plain>{divider}</Divider>
        ) : null}
        <BaseMenu
          {...props}
          mode={mode}
          handleOpenChange={onOpenChange}
          style={{
            width: '100%',
          }}
          className={`${baseClassName}-menu`}
        />
      </>
    );

  return (
    <div>
      {fixSiderbar && (
        <div
          style={{
            width: collapsed ? 48 : siderWidth,
            overflow: 'hidden',
            flex: `0 0 ${collapsed ? 48 : siderWidth}px`,
            maxWidth: collapsed ? 48 : siderWidth,
            minWidth: collapsed ? 48 : siderWidth,
            background: '#001529', //@sri, for sider menu background colorfixes
            ...style,
          }}
        />
      )}
      <Sider
        collapsible={true}
        trigger={null}
        collapsed={collapsed}
        breakpoint={breakpoint === false ? undefined : breakpoint}
        onCollapse={collapse => {
          if (!isMobile) {
            if (onCollapse) {
              onCollapse(collapse);
            }
          }
        }}
        collapsedWidth={65}
        style={{
          overflow: 'hidden',
          paddingTop: layout === 'mix' && !isMobile ? headerHeight : undefined,
          ...style,
        }}
        width={siderWidth}
        theme={theme}
        className={`${siderClassName}`}
      >
        <div>
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
              className={`${baseClassName}-extra ${!headerDom && `${baseClassName}-extra-no-logo`}`}
            >
              {extraDom}
            </div>
          )}
          {
            //@sri modified below section to group menus as `MIDDLE`, `LOWER`, `Buttom`
          }
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
            className="removeBoxShadow"
          >
            {menuContentRender
              ? menuContentRender(props, menuDom(menuSeparation(props, 'MIDDLE'), null, 'inline'))
              : menuDom(menuSeparation(props, 'MIDDLE'), null, 'inline')}
          </div>
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
            className="removeBoxShadow"
          >
            {menuContentRender
              ? menuContentRender(props, menuDom(menuSeparation(props, 'LOWER'), 'admin', 'inline'))
              : menuDom(menuSeparation(props, 'LOWER'), 'admin', 'inline')}
          </div>
          {menuFooterRender && (
            <div className={`${baseClassName}-footer`}>{menuFooterRender(props)}</div>
          )}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              position: 'fixed',
              bottom: '20px',
            }}
            className="removeBoxShadow"
          >
            {menuContentRender
              ? menuContentRender(props, menuDom(menuSeparation(props, 'BOTTOM'), null, 'vertical'))
              : menuDom(menuSeparation(props, 'BOTTOM'), null, 'vertical')}
          </div>
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
    </div>
  );
};
export default SiderMenu;
