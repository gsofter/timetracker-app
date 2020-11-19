import React, { useRef, Component } from 'react';
import classNames from 'classnames';
import { Layout } from 'antd';
import { useFela } from "react-fela";
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

export const renderContent = (props) => {
  const {
    isMobile,
    onCollapse,
    navTheme,
    layout,
    headerRender,
    contentWidth,
    headerContentRender,
    primaryColor
  } = props;

  // const ref = useRef(null);

  const baseClassName = "ant-pro-top-nav-header";

  const isTop = layout === 'top';
  // const { css } = useFela({...props, primaryColor});

  let defaultDom = (
    <GlobalHeader onCollapse={onCollapse} {...props}>
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
          // className={css(styleSheet.topHeaderStyle)}
        >
          <div>
            <div
              // ref={ref}
              className={`${baseClassName}-main ${
                contentWidth === "Fixed" ? "wide" : ""
              }`}
            >
              <BaseMenu {...menuSeparation(props, 'UPPER')} {...menuSeparation(props, 'UPPER').menuProps} />
            </div>
          </div>
        </div>
      </div>
      {headerContentRender && headerContentRender(props)}
    </GlobalHeader>
  );
  if (isTop && !isMobile) {
    defaultDom = (
      <TopNavHeader
        theme={navTheme as 'light' | 'dark'}
        mode='horizontal'
        onCollapse={onCollapse}
        {...props}
      />
    );
  }
  if (headerRender && typeof headerRender === 'function') {
    return headerRender(props, defaultDom);
  }
  return defaultDom;
};

class HeaderView extends Component<HeaderViewProps, HeaderViewState> {

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
          {renderContent(this.props)}
        </Header>
      </div>
    );
  }
}

const styleSheet: any = {
  topHeaderStyle: ({theme, primaryColor}) => ({
    "& .ant-pro-top-nav-header": {
      position: "relative",
      width: "100%",
      height: "100%",
      boxShadow: "0 1px 4px 0 rgba(0,21,41,0.12)",
      transition: "background 0.3s, width 0.2s",
    },
    "& .ant-menu-dark.ant-menu-horizontal > .ant-menu-item:hover, .ant-menu.ant-menu-dark .ant-menu-item-selected": {
      background: primaryColor ? primaryColor : '#1890ff'
    },
    "& .ant-pro-top-nav-header .ant-menu-submenu.ant-menu-submenu-horizontal": {
      height: "100%",
    },
    "& .ant-pro-top-nav-header .ant-menu-submenu.ant-menu-submenu-horizontal .ant-menu-submenu-title": {
      height: "100%",
    },
    "& .ant-pro-top-nav-header.light": {
      backgroundColor: "#fff",
    },
    "& .ant-menu-submenu .ant-menu-submenu-horizontal .ant-menu-submenu-selected": {
      backgroundColor: primaryColor ? primaryColor : '#1890ff'
    },
    "& .ant-menu-submenu .ant-menu-submenu-horizontal .ant-menu-submenu-open .ant-menu-submenu-active, .ant-menu-item:hover, .ant-menu-item-active, .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open, .ant-menu-submenu-active, .ant-menu-submenu-title:hover, .ant-menu-submenu-selected, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover, ant-menu-item a:hover, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover, .ant-menu-light .ant-menu-item:hover > a, .ant-menu-light .ant-menu-item-active > a, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected a, .ant-menu-item-selected a, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item a:hover, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected": {
      color: primaryColor ? primaryColor : '#1890ff'
    },
    "& .ant-pro-top-nav-header.light .anticon": {
      color: 'inherit',
    },
    "& .ant-pro-top-nav-header-main": {
      display: "flex",
      height: "100%",
      paddingLeft: "16px",
    },
    "& .ant-pro-top-nav-header-main-left": {
      display: "flex",
      minWidth: "192px",
    },
    "& .ant-pro-top-nav-header .anticon": {
      color: 'inherit',
    },
    "& .ant-pro-top-nav-header-logo": {
      position: "relative",
      minWidth: "165px",
      height: "100%",
      overflow: "hidden",
      transition: "all 0.3s",
    },
    "& .ant-pro-top-nav-header-logo img": {
      display: "inline-block",
      height: "32px",
      verticalAlign: "middle",
    },
    "& .ant-pro-top-nav-header-logo h1": {
      display: "inline-block",
      margin: "0 0 0 12px",
      color: theme === "light" ? primaryColor : '#fff',
      fontWeight: "400",
      fontSize: "16px",
    },
    "& .ant-pro-top-nav-header-menu": {
      minWidth: 0,
    },
    "& .ant-pro-top-nav-header-menu .ant-menu.ant-menu-horizontal": {
      height: "100%",
      border: "none",
    },
  }),
  widthRightSize: (rightSize) => ({
    minWidth: rightSize,
  }),

  displayFlex: (props) => ({
    flex: "1",
  }),
};

export default HeaderView;
