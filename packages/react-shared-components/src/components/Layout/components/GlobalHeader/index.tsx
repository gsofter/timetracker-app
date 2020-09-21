import React from "react";
import classNames from "classnames";

import { HeaderViewProps } from "../Header";
import {
  defaultRenderLogo,
  SiderMenuProps,
  defaultRenderLogoAndTitle,
  defaultRenderCollapsedButton,
} from "../SubMenu3/SiderMenu";
import { PureSettings } from "../defaultSettings";
import TopNavHeader from "../TopNavHeader";
import { MenuDataItem } from "../index";
import { WithFalse } from "../typings";
import { useFela } from "react-fela";

export interface GlobalHeaderProps extends Partial<PureSettings> {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  isMobile?: boolean;
  logo?: React.ReactNode;
  menuRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  rightContentRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
  className?: string;
  prefixCls?: string;
  menuData?: MenuDataItem[];
  onMenuHeaderClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
  menuHeaderRender?: SiderMenuProps["menuHeaderRender"];
  collapsedButtonRender?: SiderMenuProps["collapsedButtonRender"];
  splitMenus?: boolean;
}

const renderLogo = (
  menuHeaderRender: SiderMenuProps["menuHeaderRender"],
  logoDom: React.ReactNode
) => {
  if (menuHeaderRender === false) {
    return null;
  }
  if (menuHeaderRender) {
    return menuHeaderRender(logoDom, null);
  }
  return logoDom;
};

const GlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
  const {
    isMobile,
    logo,
    collapsed,
    onCollapse,
    collapsedButtonRender = defaultRenderCollapsedButton,
    rightContentRender,
    menuHeaderRender,
    onMenuHeaderClick,
    className: propClassName,
    style,
    layout,
    children,
    splitMenus,
    menuData,
    prefixCls,
  } = props;

  const baseClassName = `${prefixCls}-global-header`;
  const className = classNames(propClassName, baseClassName, {
    [`${baseClassName}-layout-${layout}`]: layout,
  });

  if (layout === "mix" && !isMobile && splitMenus) {
    const noChildrenMenuData = (menuData || []).map((item) => ({
      ...item,
      children: undefined,
    }));
    return (
      <TopNavHeader
        mode="horizontal"
        {...props}
        splitMenus={true}
        menuData={noChildrenMenuData}
        navTheme="dark"
        theme="dark"
      />
    );
  }

  const logoDom = (
    <span className={`${baseClassName}-logo`} key="logo">
      <a>{defaultRenderLogo(logo)}</a>
    </span>
  );

  const { css } = useFela(props);

  return (
    <div className={css(styleSheet.heaaderStyles)}>
      <div className={className} style={{ ...style }}>
        {isMobile && renderLogo(menuHeaderRender, logoDom)}
        {isMobile && collapsedButtonRender && (
          <span
            className={`${baseClassName}-collapsed-button`}
            onClick={() => {
              if (onCollapse) {
                onCollapse(!collapsed);
              }
            }}
          >
            {collapsedButtonRender(collapsed)}
          </span>
        )}
        {layout === "mix" && !isMobile && (
          <>
            <div
              className={`${baseClassName}-logo`}
              onClick={onMenuHeaderClick}
            >
              {defaultRenderLogoAndTitle(
                { ...props, collapsed: false },
                "headerTitleRender"
              )}
            </div>
          </>
        )}
        <div style={{ flex: 1 }}>{children}</div>
        {rightContentRender && rightContentRender(props)}
      </div>
    </div>
  );
};

export default GlobalHeader;

const styleSheet: any = {
  heaaderStyles: (props) => ({
    "& .ant-pro-global-header": {
      position: "relative",
      display: "flex",
      alignItems: "center",
      height: "100%",
      padding: "0 16px",
    },
    boxShadow: "0 1px 4px rgba(0,21,41,0.08)",
    "& .ant-pro-global-header > *": {
      height: "100%",
    },
    "& .ant-pro-global-header-collapsed-button": {
      display: "flex",
      alignItems: "center",
      marginLeft: "16px",
      fontSize: "20px",
    },
    "& .ant-pro-global-header-layout-mix": {
      // backgroundColor: "red",
    },
    "& .ant-pro-global-header-layout-mix .ant-pro-global-header-logo h1": {
      color: "#fff",
    },
    "& .ant-pro-global-header-layout-mix .anticon": {
      // color: ;
    },
    "& .ant-pro-global-header-logo": {
      position: "relative",
      overflow: "hidden",
    },
    "& .ant-pro-global-header-logo a": {
      display: "flex",
      alignItems: "center",
      height: "100%",
    },
    "& .ant-pro-global-header-logo a img": {
      height: "28px",
    },
    "& .ant-pro-global-header-logo a h1": {
      height: "32px",
      margin: "0 0 0 8px",
      // margin: '0 0 0 12px',
      // color: ;
      fontWeight: 600,
      fontSize: "18px",
      lineHeight: "32px",
    },
    "& .ant-pro-global-header-menu .anticon": {
      marginRight: "8px",
    },
    "& .ant-pro-global-header-menu .ant-dropdown-menu-item": {
      minWidth: "160px",
    },
    "& .ant-pro-global-header .dark": {
      // height: ;
    },
    "& .ant-pro-global-header .dark .action": {
      color: "rgba(255,255,255,0.85)",
    },
    "& .ant-pro-global-header .dark .action > i": {
      color: "rgba(255,255,255,0.85)",
    },
    "& .ant-pro-global-header .dark .action:hover, & .ant-pro-global-header .dark .action.opened": {
      // background: ;
    },
    "& .ant-pro-global-header .dark .action .ant-badge": {
      color: "rgba(255,255,255,0.85)",
    },
  }),
};