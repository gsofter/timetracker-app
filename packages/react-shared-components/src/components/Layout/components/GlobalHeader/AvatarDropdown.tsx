import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import HeaderDropdown from '../HeaderDropdown';
import { FelaComponent } from 'react-fela';
import { relative } from 'path';
export interface GlobalHeaderRightProps {
//   currentUser?: CurrentUser;
  menu?: boolean;
}

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
  }) => {
    const { key } = event;
  };

  render(): React.ReactNode {
    const {
    //   menu,
    } = this.props;
    const menu = "menus"
    const menuHeaderDropdown = (
        <FelaComponent style={menuStyle}>

      <Menu  selectedKeys={[]} className="menu" onClick={this.onMenuClick}>
        {menu && (
            <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
        )}
        {menu && (
            <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
        </FelaComponent>
    );
    return(
        <FelaComponent style={styleSheet}>
        <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className='antd-pro-components-global-header-index-action antd-pro-components-global-header-index-account'>
          <Avatar size="small" className='ant-avatar ant-avatar-sm ant-avatar-circle ant-avatar-image antd-pro-components-global-header-index-avatar' src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' alt="avatar" />
          <span className='name anticon'>Username</span>
        </span>
      </HeaderDropdown>
      </FelaComponent>
        )
  }
}

export default AvatarDropdown

const menuStyle = (any) => (
    {
        position: relative,
        '& .menu :global(.anticon)': 
        {
            marginRight: '8px'
        },
        '& .menu :global(.ant-dropdown-menu-item)': 
        {
            minWidth: '160px'
        },
    }

)
const styleSheet = (any) => (
    {
        position: relative,
        '& .anticon': {
            display: 'inline-block',
            color: '#fff',
            fontStyle: 'normal',
            lineHeight: 0,
            textAlign: 'center',
            textTransform: 'none',
            verticalAlign: '-.125em',
            textRendering: 'optimizeLegibility'
        },
        '& .antd-pro-components-global-header-index-right .antd-pro-components-global-header-index-account .antd-pro-components-global-header-index-avatar': 
        {
            margin: '20px 8px 20px 0',
            color: '#1890ff',
            verticalAlign: 'top',
            background: 'hsla(0,0%,100%,.85)'
        },
        '& .ant-avatar-sm': 
        {
            width: '24px',
            height: '24px',
            lineHeight: '24px',
            borderRadius: '50%'
        },
        '& .antd-pro-components-global-header-index-right .antd-pro-components-global-header-index-action': 
        {
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            padding: '0 12px',
            cursor: 'pointer',
            transition: 'all .3s'
        },
        '& .antd-pro-components-global-header-index-dark .antd-pro-components-global-header-index-action.opened, .antd-pro-components-global-header-index-dark .antd-pro-components-global-header-index-action:hover': 
        {
            background: '#1890ff'
        }
    }
)