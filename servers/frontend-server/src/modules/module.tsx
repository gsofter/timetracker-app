import * as React from 'react';
import { Feature, FeatureWithRouterFactory } from '@common-stack/client-react';
import { MainLayout, WorkbenchTheme } from '@admin-layout/react-shared-components';
import CounterModule from '@admin-layout/counter-module-browser';
import ScheduleModule from '@admin-layout/schedule-module-browser';

const features = new Feature(
        FeatureWithRouterFactory,
        CounterModule,
        ScheduleModule
);

// console.log(sharedModule);
export const MainRoute = props => (
        <MainLayout 
                // sidebarSegments={features.sidebarSegments} 
                route={features.getMenus()}
                >
                <WorkbenchTheme children={features.getRoutes()} />
        </MainLayout>
);

export default features;
