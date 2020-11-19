import React, { Component } from 'react';
import classNames from 'classnames';
import { Layout } from 'antd';
import GlobalHeader, { GlobalHeaderProps } from './GlobalHeader/index';
import { PureSettings } from './defaultSettings';
import TopNavHeader from './TopNavHeader';
import { WithFalse } from './typings';
import AvatarDropdown from '../components/GlobalHeader/AvatarDropdown';
import BaseMenu from './SubMenu3/BaseMenu';
import { menuSeparation } from './SubMenu3/SiderMenu';

const { Header } = Layout;

export type HeaderViewProps = Partial<PureSettings> &
  GlobalHeaderProps & {
    isMobile?: boolean;
    collapsed?: boolean;
    logo?: React.ReactNode;
    menuContentRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
    >;
    headerRender?: WithFalse<
      (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
    >;
    headerTitleRender?: WithFalse<
      (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
    >;
    headerContentRender?: WithFalse<
      (props: HeaderViewProps) => React.ReactNode
    >;
    siderWidth?: number;
    hasSiderMenu?: boolean;
    style?: any;
    onOpenChange?: (openKeys: WithFalse<string[]>) => void;
  };

interface HeaderViewState {
  visible: boolean;
}

class HeaderView extends Component<HeaderViewProps, HeaderViewState> {
  renderContent = () => {
    const {
      isMobile,
      onCollapse,
      navTheme,
      layout,
      headerRender,
      headerContentRender,
      menuContentRender,
      onOpenChange,
      ...rest
    } = this.props;

    const { prefixCls } = rest;

    const baseClassName = `${prefixCls}-basicLayout`;
    console.log(baseClassName);

    const menuDom = (props, divider, mode) => menuContentRender !== false && (
      <BaseMenu
        {...props}
        mode={mode}
        handleOpenChange={onOpenChange}
        style={{
          width: '100%',
        }}
        className={`${baseClassName}-menu`}
      />
    );

    const isTop = layout === 'top';
    console.log(this.props  )
    let defaultDom = (
      <GlobalHeader onCollapse={onCollapse} {...this.props}>
        <div
          style={{
            float: 'right'
          }}
        >
          {!isTop && <AvatarDropdown />}
        </div>
        <div
          style={{
            float: 'right'
          }}
        >
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden'
            }}
            className='removeBoxShadow'
          >
            {menuContentRender ? menuContentRender(this.props, menuDom(menuSeparation(this.props, 'UPPER'), 'admin', 'inline')) : menuDom(menuSeparation(this.props, 'UPPER'), 'admin', 'inline')}
          </div>
        </div>
        {headerContentRender && headerContentRender(this.props)}
      </GlobalHeader>
    );
    if (isTop && !isMobile) {
      defaultDom = (
        <TopNavHeader
          theme={navTheme as 'light' | 'dark'}
          mode='horizontal'
          onCollapse={onCollapse}
          {...this.props}
        />
      );
    }
    if (headerRender && typeof headerRender === 'function') {
      return headerRender(this.props, defaultDom);
    }
    return defaultDom;
  };

  render(): React.ReactNode {
    const {
      fixedHeader,
      layout,
      className: propsClassName,
      style,
      collapsed,
      siderWidth = 208,
      hasSiderMenu,
      headerRender,
      isMobile,
      prefixCls,
      headerHeight
    } = this.props;
    const needFixedHeader = fixedHeader || layout === 'mix';
    const isTop = layout === 'top';

    const needSettingWidth =
      needFixedHeader && hasSiderMenu && !isTop && !isMobile;

    const className = classNames(propsClassName, {
      [`${prefixCls}-fixed-header`]: needFixedHeader,
      [`${prefixCls}-top-menu`]: isTop
    });

    if (headerRender === false) {
      return null;
    }

    const width =
      layout !== 'mix' && needSettingWidth
        ? `calc(100% - ${collapsed ? 48 : siderWidth}px)`
        : '100%';

    const right = needFixedHeader ? 0 : undefined;
    return (
      <div>
        {needFixedHeader && (
          <Header
            style={{
              height: headerHeight,
              lineHeight: `${headerHeight}px`,
              background: 'transparent'
            }}
          />
        )}
        <Header
          style={{
            padding: 0,
            height: headerHeight,
            lineHeight: `${headerHeight}px`,
            width,
            zIndex: layout === 'mix' ? 100 : 9,
            right,
            ...style
          }}
          className={className}
        >
          {this.renderContent()}
        </Header>
      </div>
    );
  }
}

const styleSheet: any = {
  proFixedHeader: () => ({
    zIndex: '9',
    width: '100%',
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
    }
  })
};

export default HeaderView;
