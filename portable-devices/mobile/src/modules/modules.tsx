import * as React from 'react';
import { Feature, FeatureWithRouterFactory } from '@common-stack/client-react';
import { StatusBar } from 'expo-status-bar';
import { enableScreens } from 'react-native-screens';
import { Route } from 'react-router-native';
import LayoutModule from '../components/layout/module';
import { renderRoutes2 } from './render';
import TimeModule from '@admin-layout/timetracker-module-mobile';

const features = new Feature(FeatureWithRouterFactory, LayoutModule, TimeModule);
const configuredRoutes = features.getConfiguredRoutes();
const routes = renderRoutes2({ routes: configuredRoutes }) || [];
enableScreens();

export const MainRoute = () => {
  return (
    <>
      {configuredRoutes.map((route: any) => {
        return (
          <Route
            key={route.path}
            exact={route.exact}
            path={route.path}
            component={(props: any) => route.component(props, route)}
          />
        )
      })}
    </>
  );
};

export default features;
