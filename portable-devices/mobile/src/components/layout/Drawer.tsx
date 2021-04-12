/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import { History } from 'history';
import SideBar from './SideBar';

export const DrawerRoute = (props: { history: History<any>; location: any; route: any }) => {
    console.log('---DrawerRoute', props.route);
  return (
    <SideBar
      history={props.history}
      route={props.route}
      defaultTitle="Test"
      initialRouteName="/org/calendar"
      screenOptions={{}}
    />
  );
};
