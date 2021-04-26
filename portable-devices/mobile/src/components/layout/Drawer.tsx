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
import { Drawer } from 'native-base';
import { Route } from 'react-router-native';
import SideBar from './SideBar';

export const DrawerRoute = ({ match, drawerRef, routes }: any) => {

  const onClose = () => {
    console.log("close")
    drawerRef.current._root.close()
  }

  return (
    <Drawer 
    ref={drawerRef} 
    content={
      <SideBar matchUrl={match.url} />
    }
    onClose={onClose}
    >
      {routes.map((route: any) => (
        <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />
      ))}
    </Drawer>
  )
};
