import * as React from 'react';
import { Feature, FeatureWithRouterFactory } from '@common-stack/client-react';
import { MainLayout, WorkbenchTheme } from '@admin-layout/react-shared-components';
import CounterModule from '@admin-layout/counter-module-browser';
import PlatformModule from '@admin-layout/platform-browser';
import ScheduleModule from '@admin-layout/schedule-module-browser';
import TimeTrackerModule from '@admin-layout/timetracker-module-browser';

const features = new Feature(
        FeatureWithRouterFactory,
        PlatformModule,
        CounterModule,
        ScheduleModule,
        TimeTrackerModule,
);

// console.log(sharedModule);
export const MainRoute = props => (
        <React.Suspense fallback={<span>Loading....</span>}>
                <MainLayout
                        // sidebarSegments={features.sidebarSegments} 
                        route={features.getMenus()}
                >
                        <WorkbenchTheme children={features.getRoutes()} />
                </MainLayout>
        </React.Suspense>
);

export default features;
