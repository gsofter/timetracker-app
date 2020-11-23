import * as React from 'react';
import { Feature, FeatureWithRouterFactory } from '@common-stack/client-react';
import { BasicLayout, WorkbenchTheme } from '@admin-layout/components';
import CounterModule from '@admin-layout/counter-module-browser';
import PlatformModule from '@admin-layout/platform-browser';
import ScheduleModule from '@admin-layout/schedule-module-browser';

const features = new Feature(
        FeatureWithRouterFactory,
        PlatformModule,
        CounterModule,
        ScheduleModule
);

// console.log(sharedModule);
export const MainRoute = props => (
        <React.Suspense fallback={<span>Loading....</span>}>
                <BasicLayout
                        // sidebarSegments={features.sidebarSegments} 
                        route={features.getMenus()}
                >
                        <WorkbenchTheme children={features.getRoutes()} />
                </BasicLayout>
        </React.Suspense>
);

export default features;
