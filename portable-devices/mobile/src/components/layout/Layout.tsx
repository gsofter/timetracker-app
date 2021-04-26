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
import { View } from 'react-native';
import { Feature } from '@common-stack/client-react';
import { connect } from 'react-redux';
import MainHeader from '../../modules/Header';
import { DrawerRoute } from './Drawer';
import {TimerScreen, CalendarScreen} from "../../pages"

const Layout = (props: any, route: any) => {
  const drawerRef = useRef();
  return (
    <View style={{ flex: 1 }}>
      <MainHeader title="CDMBase LLC" drawerRef={drawerRef} />
      <DrawerRoute match={props.match} routes={route.routes} drawerRef={drawerRef}/>
    </View>
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
      '/org/timer': {
        exact: true,
        component: TimerScreen,
      } as any,
    },
    {
      '/org/timesheet': {
        exact: true,
        component: CalendarScreen,
      } as any,
    },
  ],
});
export default Layout;
