import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Router } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
import 'antd/dist/antd.css';
import { TopBarCustom } from '../components/TopBarCustom';
import { SiderMenu } from '../components/SubMenu3';


export interface IMainLayoutProps {
  sidebarSegments?: any;
  sideBarMenus?: any;
  children?: any;
}
export const MainLayout: React.FC<IMainLayoutProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>

      <SiderMenu
        collapsed={false}
        menuData={props.sideBarMenus}
        location={window.location as any}
        segments={props.sidebarSegments}
      />
      <Layout>
        <Header style={headerBg}>
          <TopBarCustom />
        </Header>
        <Layout.Content>
          {props.children}
        </Layout.Content>
      </Layout>

    </Layout>
  );
}


const headerBg = {
  background: "#ffff"
}