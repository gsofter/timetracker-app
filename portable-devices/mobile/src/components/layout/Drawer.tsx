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
import Body from "../../modules/Body"

export const DrawerRoute = ({ match, drawerRef }: any) => {

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
        <Route exact path={`${match.path}/:drawerId`} component={Body} />
      </Content>
    </Drawer>
  )
};
