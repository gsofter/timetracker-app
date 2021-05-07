import React, { useState, useRef } from 'react';
import { History } from 'history';
import { Feature, FeatureWithRouterFactory } from '@common-stack/client-react';
import TimeModule from '@admin-layout/timetracker-module-mobile';
import { StatusBar } from 'expo-status-bar';
import { enableScreens } from 'react-native-screens';
import { NativeRouter, Route } from 'react-router-native';
import LayoutModule from '../components/layout/module';
import { renderRoutes2 } from './render';

const features = new Feature(FeatureWithRouterFactory, LayoutModule, TimeModule);
const configuredRoutes = features.getConfiguredRoutes();
console.log('--GET CONFIGURED', TimeModule);
const routes = renderRoutes2({ routes: configuredRoutes }) || [];
enableScreens();

export const MainRoute = () => {
  return (
    <>
      {configuredRoutes.map((route: any) => (
        <Route
          key={route.path}
          exact={route.exact}
          path={route.path}
          component={(props: any) => route.component(props, route)}
        />
      ))}
      <StatusBar style="auto" />
    </>
  );
};

export default features;
