import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Router } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const WithRouter = Router as any;
import { createBrowserHistory } from 'history'
import 'antd/dist/antd.css';
import { TopBarCustom } from '../components/TopBarCustom';
import { SiderMenu } from '../components/SubMenu3';
import {sharedModule} from './compute'
import { Feature, FeatureWithRouterFactory } from '@common-stack/client-react';
const history = createBrowserHistory();
const features = new Feature(FeatureWithRouterFactory, sharedModule);

export const ApplicationMainLayout: React.FC = (props) => {
  const [collapsed, setCollapsed] = useState(false); 

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed)
  }
  return (
    <WithRouter history={history}>
        <Layout style={{ minHeight: '100vh' }}>
              
              <SiderMenu
                  collapsed={false}
                  menuData={features.getMenus()}
                  location={window.location as any}
                  segments={features.sidebarSegments}
                />
            <Layout>
                <Header style={headerBg}>
                    <TopBarCustom/>
                </Header>
                <Layout.Content>
                  { features.getRoutes() }
                </Layout.Content>
            </Layout>
              
      </Layout>
    </WithRouter>
        );
  }


const headerBg = {
  background: "#ffff"
}