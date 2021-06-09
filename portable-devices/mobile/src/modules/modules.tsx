import * as React from 'react';
import { Feature, FeatureWithRouterFactory } from '@common-stack/client-react';
import { enableScreens } from 'react-native-screens';
import { Route, Switch } from 'react-router-native';
import AuthModule from '@adminide-stack/user-auth0-mobile';
import PlatformModule from '@adminide-stack/platform-mobile';
import AccountApiModule from '@adminide-stack/account-api-mobile';
import TimeModule from '@admin-layout/timetracker-module-mobile';
import LayoutModule from '../components/layout/module';


const features = new Feature(
  FeatureWithRouterFactory,
  LayoutModule,
  AuthModule,
  PlatformModule,
  TimeModule,
  AccountApiModule
);

const configuredRoutes = features.getConfiguredRoutes();
console.log('--configured routes', configuredRoutes)
// const routes = renderRoutes2({ routes: configuredRoutes }) || [];
enableScreens();

export const MainRoute = () => {
  /**
   * when used renderRoutes2 opts.routes come as empty need to debug that
   * for now using switch directly inroder to render routes properly.
   */
  return (
    <>
      <Switch>
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
      </Switch>
    </>
  );
};

export default features;