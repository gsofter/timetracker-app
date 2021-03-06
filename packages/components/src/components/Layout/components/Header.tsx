import React, { useRef, Component } from 'react';
import classNames from 'classnames';
import { Layout } from 'antd';
import GlobalHeader, { GlobalHeaderProps } from './GlobalHeader/index';
import TopNavHeader from './TopNavHeader';
import { WithFalse } from './typings';
import { PrivateSiderMenuProps } from './SiderMenu/SiderMenu';
import { clearMenuItem } from './utils/utils';
import { useFela, connect } from 'react-fela';
import { Property, Properties } from 'csstype';
import { styleSheet } from './HeaderStyles';

const { Header } = Layout;

export type HeaderViewProps = GlobalHeaderProps & {
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
  headerContentRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
  siderWidth?: number;
  hasSiderMenu?: boolean;
};

interface HeaderViewState {
  visible: boolean;
}

const HeaderView = (props: HeaderViewProps & PrivateSiderMenuProps) => {
  const renderContent = () => {
    const { isMobile, onCollapse, navTheme, layout, headerRender, headerContentRender } = props;
    const isTop = layout === 'top';
    const clearMenuData = clearMenuItem(props.menuData || []);
    let defaultDom = (
      <GlobalHeader onCollapse={onCollapse} {...props} menuData={clearMenuData}>
        {headerContentRender && headerContentRender(props)}
      </GlobalHeader>
    );
    if (isTop && !isMobile) {
      defaultDom = (
        <TopNavHeader
          theme={navTheme as 'light' | 'dark'}
          mode="horizontal"
          onCollapse={onCollapse}
          {...props}
          menuData={clearMenuData}
        />
      );
    }
    if (headerRender && typeof headerRender === 'function') {
      return headerRender(props, defaultDom);
    }
    return defaultDom;
  };

  const {
    fixedHeader,
    layout,
    className: propsClassName,
    style,
    collapsed,
    siderWidth,
    hasSiderMenu,
    isMobile,
    prefixCls,
    headerHeight,
  } = props;
  const needFixedHeader = fixedHeader || layout === 'mix';
  const isTop = layout === 'top';

  const needSettingWidth = needFixedHeader && hasSiderMenu && !isTop && !isMobile;

  const className = classNames(propsClassName, {
    [`${prefixCls}-fixed-header`]: needFixedHeader,
    [`${prefixCls}-top-menu`]: isTop,
  });

  /**
   * ??????????????????????????????????????????????????????????????????
   */
  const width =
    layout !== 'mix' && needSettingWidth ? `calc(100% - ${collapsed ? 48 : siderWidth}px)` : '100%';

  const right = needFixedHeader ? 0 : undefined;
  const { css } = useFela();
  return (
    <div className={classNames(css(styleSheet.headerStyle))}>
      {needFixedHeader && (
        <Header
          style={{
            height: headerHeight,
            lineHeight: `${headerHeight}px`,
            background: 'transparent',
          }}
        />
      )}
      <Header
        style={{
          padding: 0,
          height: headerHeight,
          lineHeight: `${headerHeight}px`,
          width,
          zIndex: layout === 'mix' ? 100 : 19,
          right,
          ...style,
        }}
        className={className}
      >
        {renderContent()}
      </Header>
    </div>
  );
};

export default HeaderView;
