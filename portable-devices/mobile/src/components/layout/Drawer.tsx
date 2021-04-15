/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import { Content, Drawer } from 'native-base';
import { Route } from 'react-router-native';
import SideBar from './SideBar';

export const DrawerRoute = ({ match, drawerRef, routes }: any) => {

  const onClose = () => {
    drawerRef.current._root.close()
  }

  const onOpen = () => {
    drawerRef.current._root.open();
  }

  return (
    <Drawer 
    ref={drawerRef} 
    content={
      <SideBar matchUrl={match.url} />
    }
    onClose={onClose}
    onOpen={onOpen}
    >
      <Content>
        {routes.map((route: any) => (
          <Route exact={route.exact} path={route.path} component={route.component} />
        ))}
      </Content>
    </Drawer>
  )
};
