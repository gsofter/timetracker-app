import React, { useState } from 'react';
import * as H from "history";
import { Layout } from "antd";
import {useFela} from 'react-fela';
import { MenuDataItem, WithFalse } from "./typings";
import { BaseMenu } from "../SubMenu3/BaseMenu";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";

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

export interface SiderMenuProps {
  logo?: React.ReactNode;
  onMenuHeaderClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  menuExtraRender?: WithFalse<(props: SiderMenuProps) => React.ReactNode>;
  hide?: boolean;
  title?: string; 
  collapsed?: boolean; 
  className?: string;
  links?: React.ReactNode[];
  layout?: any;
}

export namespace ISiderMenu {
  export interface CompProps {
    menuExtraRender?: any;
    menuData?: MenuDataItem[];
    segments:any;
    title?: string;
    collapsed: boolean;
  }

  export interface StateProps {
    location?: H.Location;
  }

  export interface CompState {
    collapsed?: boolean;
  }

  export type Props = CompProps & StateProps;
  export type State = CompState;
}
export const SiderMenu: React.FC<ISiderMenu.Props> = (props) => {

  const { menuExtraRender = false } = props;
  const [collapsed, setCollapsed]: any = useState(false);

  const headerDom = defaultRenderLogoAndTitle(props);

  const extraDom = menuExtraRender && menuExtraRender(props);

  const {css} = useFela(props);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        width={256}
        collapsedWidth={65}
        className={"SiderMenu"} 
      >
        {headerDom && collapsed && (
          <div className={css(styles.antProSiderTitleHide)} id="logo">
            {headerDom}
          </div>
        )}
        {headerDom && !collapsed && (
          <div className={css(styles.antProSiderLogo)} id="logo">
            {headerDom}
          </div>
        )}
        {extraDom && (
          <div
          className={`css(styles.antProSiderLogo) ${!headerDom && css(styles.antProSiderLogo)}`}
          >
            {extraDom}
          </div>
        )}
        <BaseMenu {...props } />
          <div className={css(styles.btnNavigation)}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              { className: "trigger", onClick: toggle }
            )}
          </div>
      </Sider>
  );
}

export default SiderMenu;

const styles: any = {
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
  antProSiderTitleHide: props => (
    {
      position: "relative",
      '> a > img': {
        display: "inline-block",
        height: "32px",
        verticalAlign: "middle",
        paddingLeft: "24px",
        marginTop: "15px",
        transition: "height .2s",
      },
      '> a > h1': {
        display: "none",
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