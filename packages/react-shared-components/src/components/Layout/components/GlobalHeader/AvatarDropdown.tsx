import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, Spin } from "antd";
import React from "react";
import HeaderDropdown from "../HeaderDropdown";
import { relative } from "path";
import { useFela } from "react-fela";
export interface GlobalHeaderRightProps {
  //   currentUser?: CurrentUser;
  menu?: boolean;
}

const onMenuClick = (event: {
  key: React.Key;
  keyPath: React.Key[];
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement>;
}) => {
  const { key } = event;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = (props) => {
  const {
    //   menu,
  } = props;
  const menu = "menus";
  const { css } = useFela(props);
  const menuHeaderDropdown = (
    <div className={css(menuStyle.styles)}>
      <Menu
        selectedKeys={[]}
        className="ant-dropdown-menu ant-dropdown-menu-light antd-pro-components-global-header-index-menu ant-dropdown-menu-root ant-dropdown-menu-vertical"
        onClick={onMenuClick}
      >
        {menu && (
          <Menu.Item key="center" className="ant-dropdown-menu-item">
            <UserOutlined />
            Personal center
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings" className="ant-dropdown-menu-item">
            <SettingOutlined />
            Personal settings
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout" className="ant-dropdown-menu-item">
          <LogoutOutlined />
          sign out
        </Menu.Item>
      </Menu>
    </div>
  );
  return (
    <div className={css(menuStyle.styles)}>
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span
          className="antd-pro-components-global-header-index-action antd-pro-components-global-header-index-account"
          style={{ padding: "18px 0px" }}
        >
          <Avatar
            size="small"
            className="ant-avatar ant-avatar-sm ant-avatar-circle ant-avatar-image antd-pro-components-global-header-index-avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="avatar"
          />
          <span className="name anticon anticon-icon">Username</span>
        </span>
      </HeaderDropdown>
    </div>
  );
};

export default AvatarDropdown;

const menuStyle: any = {
  styles: (theme) => ({
    position: relative,
    "& .antd-pro-components-global-header-index-menu .ant-dropdown-menu-item": {
      minWidth: "160px",
    },
    "& .ant-dropdown-menu": {
      position: "relative",
      margin: "0",
      padding: "4px 0",
      textAlign: "left",
      listStyleType: "none",
      backgroundColor: "#fff",
      backgroundClip: "padding-box",
      borderRadius: "2px",
      outline: "none",
      boxShadow:
        "0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05)",
    },
    "& .ant-dropdown-menu-item, .ant-dropdown-menu-submenu-title": {
      clear: "both",
      margin: "0",
      padding: "5px 12px",
      color: "rgba(0,0,0,.85)",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "22px",
      whiteSpace: "nowrap",
      cursor: "pointer",
      transition: "all .3s",
    },
    "& .anticon": {
      display: "inline-block",
      color: theme === "light" ? "#000" : "#fff",
      fontStyle: "normal",
      lineHeight: 0,
      textAlign: "center",
      textTransform: "none",
      verticalAlign: "-.125em",
      textRendering: "optimizeLegibility",
    },
    '& .ant-menu-item svg': {
        color: '#000'
    },
    "& .antd-pro-components-global-header-index-right .antd-pro-components-global-header-index-account .antd-pro-components-global-header-index-avatar": {
      margin: "20px 8px 20px 0",
      color: "#1890ff",
      verticalAlign: "top",
      background: "hsla(0,0%,100%,.85)",
    },
    "& .ant-avatar-sm": {
      width: "24px",
      height: "24px",
      lineHeight: "24px",
      borderRadius: "50%",
    },
    "& .antd-pro-components-global-header-index-right .antd-pro-components-global-header-index-action": {
      display: "flex",
      alignItems: "center",
      height: "100%",
      padding: "0 12px",
      cursor: "pointer",
      transition: "all .3s",
    },
    "& .antd-pro-components-global-header-index-dark .antd-pro-components-global-header-index-action.opened, .antd-pro-components-global-header-index-dark .antd-pro-components-global-header-index-action:hover": {
      background: "#1890ff",
    },
  }),
};
