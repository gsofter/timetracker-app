/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import { Feature } from '@common-stack/client-react';
import { connect } from 'react-redux';
import MainHeader from '../../modules/Header';
import { DrawerRoute } from './Drawer';
import Body from '../../modules/Body';

const Layout = (props: any, route: any) => {
  const drawerRef = useRef();
  return (
    <>
      <MainHeader title="Time Tracker" drawerRef={drawerRef} />
      <DrawerRoute match={props.match} routes={route.routes} drawerRef={drawerRef}/>
    </>
  );
};

export const ProLayout = connect((state: any) => {
  return {
    settings: state.settings,
    location: state.router.location,
  };
})(Layout);

export const drawer =  new Feature({
  routeConfig: [
    {
      '/org/:drawerId': {
        exact: true,
        component: Body,
      } as any,
    },
  ],
});
export default Layout;
