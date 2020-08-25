import * as React from 'react';
import { Layout } from 'antd';
import { SmileOutlined, HeartOutlined } from '@ant-design/icons';
import { Route, Switch } from 'react-router';
import { Feature, FeatureWithRouterFactory } from '@common-stack/client-react';
import  { ApplicationMainLayout } from '@admin-layout/react-shared-components';

const features = new Feature(FeatureWithRouterFactory);
 
 export interface MenuDataItem {
    Authority?: string[] | string;
    children?: MenuDataItem[];
    hideChildrenInMenu?: boolean;
    hideInMenu?: boolean;
    Icon?: string;
    Locale?: string;
    Name?: string;
    Path: string;
    menuDataRender: () => void;
  

  const IconMap = {
    smile: <SmileOutlined />,
    heart: <HeartOutlined />,
  };

  const defaultMenus = [
    {
      path: '/',
      name: 'Home',
      icon: 'smile',
      children: [
        {
          path: '/home',
          name: 'one',
          icon: 'smile',
        //   children: [
        //     {
        //       path: '/welcome/welcome',
        //       name: 'two',
        //       icon: 'smile',
        //       exact: true,
        //     },
        //   ],
        },
      ],
    },
    {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        children: [
          {
            path: '/welcome',
            name: 'one',
            icon: 'smile',
          },
        ],
      },
    {
      path: '/demo',
      name: 'demo',
      icon: 'heart',
    },
  ];

  const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
  menus.map(({ icon, children, ...item }) => ({
    ...item,    
    icon: icon && IconMap[icon as string],
    children: children && loopMenuItem(children),
  }));




// console.log(sharedModule);
export const MainRoute = props => (
        <div style={{
            transform: 'rotate(0)',
            overflowX: 'hidden',
          }}>
        <ApplicationMainLayout
      location={{
        pathname: '/welcome',
      }}
      menuDataRender={() => loopMenuItem(defaultMenus)}
      />
        {/* <SiderMenu
            collapsed={false}
            menuData={features.getMenus()}
            location={window.location as any}
            segments={features.sidebarSegments}
        /> */}
        {/* <Layout>
            <Layout.Content style={{height: '100%'}}>
                <section className="flex-grow" style={{height: '100%'}}>
                    {features.getRoutes()}
                </section>
            </Layout.Content> 
         </Layout> */}
    </div>
);

export default features;
