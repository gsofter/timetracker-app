import * as React from 'react';
import { Feature, FeatureWithRouterFactory, renderRoutes2 } from '@common-stack/client-react';
import ProComponent, { WorkbenchTheme } from '@admin-layout/components';
import LayoutModule, { ProLayout } from '@admin-layout/react-shared-components';
import CounterModule from '@admin-layout/counter-module-browser';
import PlatformModule from '@admin-layout/platform-browser';
import ScheduleModule from '@admin-layout/schedule-module-browser';
import TimeTrackerModule from '@admin-layout/timetracker-module-browser';

const features = new Feature(
  FeatureWithRouterFactory,
  LayoutModule,
  PlatformModule,
  CounterModule,
  ScheduleModule,
  TimeTrackerModule,
);

const configuredRoutes =  features.getConfiguredRoutes();

const routes = renderRoutes2({ routes: configuredRoutes});
// console.log(sharedModule);
export const MainRoute = props => {
  return (
    <React.Suspense fallback={<span>Loading....</span>}>
      <WorkbenchTheme>
        {routes}
      </WorkbenchTheme>
    </React.Suspense>
  );
};
export default features;
