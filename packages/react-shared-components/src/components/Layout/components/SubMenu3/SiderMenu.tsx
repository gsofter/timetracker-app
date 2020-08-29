import { reduce, filter } from "lodash";
import * as React from "react";
import { Link } from "react-router-dom";
import * as H from "history";
import { urlToList } from "./utils";
import { Layout, Menu, Avatar, Spin } from "antd";
import { Icon } from "@ant-design/compatible";
import pathToRegexp from "path-to-regexp";
import { IMenuPosition } from "@common-stack/client-react";
import Identicon from "identicon.js";
import Base64 from "base-64";
import { FelaComponent } from "react-fela";
import { useAuth } from "../../../../context";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { isAbsolute } from "path";

const { Sider } = Layout;
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

export namespace ISiderMenu {
  export interface CompProps {
    menuData: any;
    segments?: any;
    loading?: boolean;
    onCollapse?: any;
    state?: boolean;
    isMobile?: boolean;
    renderer?: any;
    Authorized?: any;
    collapsed?: boolean;
    logo?: any;
    user?: any;
    styles?: {
      grow?: any;
      logo?: any;
      sider?: any;
      icon?: any;
    };
  }

  export interface StateProps {
    location?: H.Location;
  }

  export interface CompState {
    openKeys?: any;
    collapsed?: boolean;
  }

  export type Props = CompProps & StateProps;
  export type State = CompState;
}
export default class SiderMenu extends React.PureComponent<
  ISiderMenu.Props,
  ISiderMenu.State
> {
  private flatMenuKeys;

  constructor(props) {
    super(props);
    this.flatMenuKeys = getFlatMenuKeys(props.menuData);
    this.state = {
      collapsed: false,
      openKeys: this.getDefaultCollapsedSubMenus(props),
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  get menus() {
    return this.props.menuData;
  }

  public static defaultProps() {
    return {
      user: {},
      isMobile: false,
    };
  }

  public UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        openKeys: this.getDefaultCollapsedSubMenus(nextProps),
      });
    }
  }

  /**
   * Convert pathname to openKeys
   * /list/search/articles => ['list', '/list/search']
   * @param props
   */
  public getDefaultCollapsedSubMenus(props) {
    const {
      location: { pathname },
    } = props || this.props;
    return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
  }

  /**
   * Allow menu.js config icon as string or ReactNode
   * icon: 'setting',
   * icon: 'http://demo.com/icon.png',
   * icon: <Icon type="setting" />,
   * @param icon
   */
  private getIcon(icon) {
    const { styles } = this.props;
    if (typeof icon === "string" && icon.indexOf("http") === 0) {
      return <img src={icon} alt="icon" />;
    }
    if (typeof icon === "string") {
      return <Icon type={icon} />;
    }
    return icon;
  }

  private getAvatar(menu) {
    return <UserView collapsed={this.state.collapsed} />;
  }

  /**
   * Judge whether it is http link.return or a Link
   * @memberOf SiderMenu
   */
  private getMenuItemPath = (item) => {
    const { styles } = this.props;
    const itemPath = this.conversionPath(item.path);
    const icon = this.getIcon(item.icon);
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
        replace={itemPath === this.props.location.pathname}
        onClick={
          this.props.isMobile
            ? () => {
                this.props.onCollapse(true);
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
  private getSubMenuOrItem = (item) => {
    const { styles, user, loading } = this.props;

    if (item.children && item.children.some((child) => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);

      if (item.position === IMenuPosition.BOTTOM && (!user || user.mock)) {
        return loading ? null : (
          <Menu.Item id="sign_in" key="sign_in">
            <Link to="/login">Sign In</Link>
          </Menu.Item>
        );
      }

      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.position === IMenuPosition.BOTTOM ? (
                this.getAvatar(item)
              ) : item.icon ? (
                <span>
                  {this.getIcon(item.icon)}
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
          {this.getMenuItemPath(item)}
          <div className="bottom-navigation">
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              { className: "trigger", onClick: this.toggle }
            )}
          </div>
        </Menu.Item>
      );
    }
  };
  /**
   * @memberof SiderMenu
   */
  private getNavMenuItems = (menusData) => {
    if (!menusData) {
      return [];
    }
    return filter(menusData, (item) => item.name && !item.hideInMenu)
      .map((item) => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item);
        return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter((item) => item);
  };

  /**
   * Generates LOGO
   * @memberof SiderMenu
   */
  private getLogo(logo) {
    const { styles } = this.props;
    return (
      logo && (
        <div className={styles.logo} key="logo">
          <Link to="/">
            <img src={logo.icon} alt="logo" />
            <h1>{logo.name}</h1>
          </Link>
        </div>
      )
    );
  }

  // Get the currently selected menu
  private getSelectedMenuKeys = () => {
    const {
      location: { pathname },
    } = this.props;
    return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
  };
  // conversion Path
  private conversionPath = (path) => {
    if (path && path.indexOf("http") === 0) {
      return path;
    } else {
      return `/${path || ""}`.replace(/\/+/g, "/");
    }
  };
  // permission to check
  private checkPermissionItem = (authority, ItemDom) => {
    if (this.props.Authorized && this.props.Authorized.check) {
      const { check } = this.props.Authorized;
      return check(authority, ItemDom);
    }
    return ItemDom;
  };
  private isMainMenu = (key) => {
    return this.menus.some(
      (item) => key && (item.key === key || item.path === key)
    );
  };
  private handleOpenChange = (openKeys) => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const moreThanOne =
      filter(openKeys, (openKey) => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],
    });
  };

  private collapse = (state) => {
    this.props.onCollapse(state);
    this.setState({ collapsed: state });
  };

  public render() {
    const { logo, collapsed, segments = [], onCollapse, styles } = this.props;
    const { openKeys } = this.state;
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed ? {} : { openKeys };
    // If pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys();
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={256}
        collapsedWidth={65}
        className={"SiderMenu"}
      >
        {this.getLogo(
          (filter(this.menus, (menu) => menu.position === IMenuPosition.LOGO) ||
            [])[0]
        )}
        <div>
          <Menu
            key="Menu-Middle"
            theme="dark"
            mode="inline"
            {...menuProps}
            // className={styles.sider}
            onOpenChange={this.handleOpenChange}
            selectedKeys={selectedKeys}
            style={{ padding: "16px 0", width: "100%" }}
          >
            {this.getNavMenuItems(this.menus.filter(menu => menu.position === IMenuPosition.MIDDLE))}
          </Menu>
          <div className="bottom-navigation" style={btnNavigation}>
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              { className: "trigger", onClick: this.toggle }
            )}
          </div>
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
          {...menuProps}
          onOpenChange={this.handleOpenChange}
          selectedKeys={selectedKeys}
          style={{ padding: "16px 0", width: "100%" }}
        >
          {this.getNavMenuItems(
            filter(this.menus, (menu) => menu.position === IMenuPosition.BOTTOM)
          )}
        </Menu>
      </Sider>
    );
  }
}

const btnNavigation: {
  fontSize: string;
  padding: string;
  bottom: string;
  right: string;
  display: string;
  position: any;
} = {
  fontSize: "25px",
  padding: "12px",
  bottom: "5%",
  right: "5%",
  display: "flex",
  position: "absolute",
};