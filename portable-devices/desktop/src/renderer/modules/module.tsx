import * as React from 'react';
import { Feature, FeatureWithRouterFactory, renderRoutes2 } from '@common-stack/client-react';
import { ThemeProvider } from '@admin-layout/components';
import LayoutModule from '@adminide-stack/react-shared-components';
import PlatformModule from '@adminide-stack/platform-browser';
import AccountsModule from "@adminide-stack/account-api-browser";
import AuthModule from "@adminide-stack/user-auth0-browser";
import ExtensionModule from '@adminide-stack/extension-module-browser';



const features = new Feature(
  FeatureWithRouterFactory,
  AuthModule,
  LayoutModule,
  AccountsModule,
  PlatformModule,
  ExtensionModule,
);

const configuredRoutes = features.getConfiguredRoutes();

const routes = renderRoutes2({ routes: configuredRoutes });

export const MainRoute = props => {
  return (
    <React.Suspense fallback={<span>Loading....</span>}>
      <ThemeProvider>
        {routes}
      </ThemeProvider>
    </React.Suspense>
  );
};


export default features;
