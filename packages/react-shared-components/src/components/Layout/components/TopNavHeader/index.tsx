import React, { useRef, useState } from "react";
import classNames from "classnames";
import ResizeObserver from "rc-resize-observer";
import { useFela } from "react-fela";
import AvatarDropdown from "../GlobalHeader/AvatarDropdown";

import {
  SiderMenuProps,
  defaultRenderLogoAndTitle,
} from "../SubMenu3/SiderMenu";

import BaseMenu from "../SubMenu3/BaseMenu";
import { HeaderViewProps } from "../Header";

export type TopNavHeaderProps = SiderMenuProps & {
  logo?: React.ReactNode;
  onCollapse?: (collapse: boolean) => void;
  rightContentRender?: HeaderViewProps["rightContentRender"];
};

/**
 * 抽离出来是为了防止 rightSize 经常改变导致菜单 render
 * @param param0
 */
const RightContent: React.FC<TopNavHeaderProps> = ({
  rightContentRender,
  ...props
}) => {
  const [rightSize, setRightSize] = useState<number | string>("auto");
  const { css } = useFela(props);

  return (
    <div className={css(styleSheet.widthRightSize)}>
      <div className={css(styleSheet.displayFlex)}>
        <ResizeObserver
          onResize={({ width }: { width: number }) => {
            if (!width) {
              return;
            }
            setRightSize(width);
          }}
        >
          {rightContentRender && (
            <div>
              {rightContentRender({
                ...props,
              })}
            </div>
          )}
        </ResizeObserver>
      </div>
    </div>
  );
};

const TopNavHeader: React.FC<TopNavHeaderProps> = (props) => {
  const ref = useRef(null);
  const {
    theme,
    onMenuHeaderClick,
    contentWidth,
    rightContentRender,
    className: propsClassName,
    style,
    layout,
    primaryColor
  } = props;

  
  const baseClassName = "ant-pro-top-nav-header";
  const headerDom = defaultRenderLogoAndTitle(
    { ...props, collapsed: false },
    layout === "mix" ? "headerTitleRender" : undefined
  );

  const className = classNames(baseClassName, propsClassName, {
    light: theme === "light",
  });

  const { css } = useFela({...props, primaryColor});
  return (
    <div className={css(styleSheet.topHeaderStyle)}>
      <div className={className}>
        <div
          ref={ref}
          className={`${baseClassName}-main ${
            contentWidth === "Fixed" ? "wide" : ""
          }`}
        >
          {headerDom && (
            <div
              className={`${baseClassName}-main-left`}
              onClick={onMenuHeaderClick}
            >
              <div className={`${baseClassName}-logo`} key="logo" id="logo">
                {headerDom}
              </div>
            </div>
          )}
          <div style={{ flex: 1 }} className={`${baseClassName}-menu`}>
            <BaseMenu {...props} {...props.menuProps} />
          </div>
          <AvatarDropdown/>
          {rightContentRender && (
            <RightContent rightContentRender={rightContentRender} {...props} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavHeader;

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
