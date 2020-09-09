import { reduce, filter } from "lodash";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as H from "history";
import { urlToList } from "./utils";
import { Menu, Avatar, Spin } from "antd";
import { Icon } from "@ant-design/compatible";
import pathToRegexp from "path-to-regexp";
import { IMenuPosition } from "@common-stack/client-react";
import Identicon from "identicon.js";
import Base64 from "base-64";
import { useAuth } from "../../../../context";
import { MenuDataItem } from "./typings";

const { SubMenu } = Menu;

function UserView({ collapsed }) {
  const { user, loading }: any = useAuth();

  if (!user && loading) {
    return <Spin />;
  }

  if (!user || user.isTest || user.mock) {
    return null;
  }

  return (
    <span
      data-user={user.nickname}
      id={
        !user || user.isTest || user.mock ? `cde-user-placeholder` : "cde-user"
      }
    >
      <Avatar
        style={{ marginRight: !collapsed ? "7px" : 0 }}
        src={getImageUrl(user.picture)}
      >
        {user.nickname || "Guest"}
      </Avatar>{" "}
      {!collapsed && (
        <span className="cde-username"> {user.nickname || "Guest"}</span>
      )}
    </span>
  );
}

const getImageUrl = (picture) => {
  return (
    picture ||
    `data:image/png;base64,${new Identicon(
      Base64.encode("myawsomestringbebe"),
      420
    ).toString()}`
  );
};

/**
 * Recursively flatten  the data
 * [{path: string}, {path: string}] => {path, path2}
 * @param menu
 */
export const getFlatMenuKeys = (menu) =>
  reduce(
    menu,
    (keys, item) => {
      keys.push(item.path);
      if (item.children) {
        return keys.concat(getFlatMenuKeys(item.children));
      }
      return keys;
    },
    []
  );

/**
 * Find all matched menu keys based on paths
 * @param flatMenuKeys: [/abc, /abc/:id, /abc/:id/info]
 * @param paths: [/abc/ /abc/11, /abc/11/info]
 */
export const getMenuMatchKeys = (flatMenuKeys, paths) =>
  reduce(
    paths,
    (matchKeys, path) =>
      matchKeys.concat(
        filter(flatMenuKeys, (item) => pathToRegexp(item).test(path))
      ),
    []
  );

export namespace IBaseMenu {
  export interface CompProps {
    menuData?: MenuDataItem[];
    segments?: any;
    loading?: boolean;
    onCollapse?: (e) => void;
    isMobile?: boolean;
    Authorized?: any;
    user?: string;
    some?: () => void;
    filter?: () => void;
    title?: string;
  }

  export interface StateProps {
    location?: H.Location;
  }

  export interface CompState {
    collapsed: boolean;
  }

  export type Props = CompProps & StateProps;
  export type State = CompState;
}
export const BaseMenu: React.FC<IBaseMenu.Props> = (props) => {
  const {
    segments = [],
    menuData,
  } = props;

  const [collapsed]: any = useState(true);
  const [flatMenuKeys, setFloatMenuKeys]: any = useState(null);
  const [currentKey, setCurrentKey]: any = useState("");

  useEffect(() => {
    setFloatMenuKeys(getFlatMenuKeys(props.menuData));
    let df: any = props.location.pathname.split("/");
    if (df.length > 1) {
      df.splice(2, 1);
    }
    // setDefaultKey(df.join('/'))
    setCurrentKey(props.location.pathname);
  }, []);

  // Get the currently selected menu
  const getSelectedMenuKeys = () => {
    const {
      location: { pathname },
    } = props;
    return getMenuMatchKeys(flatMenuKeys, urlToList(pathname));
  };

  // Don't show popup menu when it is been collapsed
  const menuProps = collapsed ? {} : { currentKey };
  // If pathname can't match, use the nearest parent's key
  let selectedKeys = getSelectedMenuKeys();
  if (!selectedKeys.length) {
    selectedKeys = [currentKey[currentKey.length - 1]];
  }

  const getIcon = (icon) => {
    if (typeof icon === "string" && icon.indexOf("http") === 0) {
      return <img src={icon} alt="icon" />;
    }
    if (typeof icon === "string") {
      return <Icon type={icon} />;
    }
    return icon;
  };

  const getAvatar = (menu) => {
    return <UserView collapsed={collapsed} />;
  };

  /**
   * Judge whether it is http link.return or a Link
   * @memberOf SiderMenu
   */
  const getMenuItemPath = (item) => {
    const itemPath = conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target, name } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === props.location.pathname}
        onClick={
          props.isMobile
            ? () => {
                props.onCollapse(true);
              }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  /**
   * get SubMenu or Item
   */
  const getSubMenuOrItem = (item) => {

    if (item.children && item.children.some((child) => child.name)) {
      const childrenItems = getNavMenuItems(item.children);

      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.position === IMenuPosition.BOTTOM ? (
                getAvatar(item)
              ) : item.icon ? (
                <span>
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return (
        <Menu.Item key={item.path}>
          {getMenuItemPath(item)}
        </Menu.Item>
      );
    }
  };
  /**
   * @memberof SiderMenu
   */
  const getNavMenuItems = (menusData: any) => {
    if (!menusData) {
      return [];
    }
    return filter(menusData, (item) => item.name && !item.hideInMenu)
      .map((item) => {
        // make dom
        const ItemDom = getSubMenuOrItem(item);
        return checkPermissionItem(item.authority, ItemDom);
      })
      .filter((item) => item);
  };

  // conversion Path
  const conversionPath = (path) => {
    if (path && path.indexOf("http") === 0) {
      return path;
    } else {
      return `/${path || ""}`.replace(/\/+/g, "/");
    }
  };
  // permission to check
  const checkPermissionItem = (authority, ItemDom) => {
    if (props.Authorized && props.Authorized.check) {
      const { check } = props.Authorized;
      return check(authority, ItemDom);
    }
    return ItemDom;
  };
  const handleClick = ({ key }) => {
    setCurrentKey(key);
  };
  return (
    <>
      <div>
        <Menu
          key="Menu-Middle"
          theme="dark"
          mode="inline"
          {...menuProps}
          onClick={handleClick}
          selectedKeys={[currentKey]}
          style={{ padding: "16px 0", width: "100%" }}
        >
          {getNavMenuItems(
            menuData.filter((menu) => menu.position === IMenuPosition.MIDDLE)
          )}
        </Menu>
        
        {segments.map((segment, segmentIndex) => (
          <div key={segmentIndex}>
            {React.cloneElement(segment, { collapsed })}
          </div>
        ))}
      </div>
      <Menu
        key="Menu-Bottom"
        theme="dark"
        mode="inline"
        onClick={handleClick}
        {...menuProps}
        selectedKeys={[currentKey]}
        style={{ padding: "16px 0", width: "100%" }}
      >
        {getNavMenuItems(
          filter(menuData, (menu) => menu.position === IMenuPosition.BOTTOM)
        )}
      </Menu>
    </>
  );
};