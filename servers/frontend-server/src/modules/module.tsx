import * as React from 'react';
import { Feature, FeatureWithRouterFactory } from '@common-stack/client-react';
import {  WorkbenchTheme } from '@admin-layout/components';
import { BasicLayout } from '@admin-layout/react-shared-components';
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
                        route={{ routes: features.getMenus(), authority: [] }}
                        settings={{title: 'test'}}
                        breadcrumbNameMap={{}}
                >
                        <WorkbenchTheme children={features.getRoutes()} />
                </BasicLayout>
        </React.Suspense>
);

export default features;
