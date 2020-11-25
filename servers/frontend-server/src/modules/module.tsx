import * as React from 'react';
import { Feature, FeatureWithRouterFactory } from '@common-stack/client-react';
import ProComponent, {  WorkbenchTheme } from '@admin-layout/components';
import UISettingsModule, { ProLayout } from '@admin-layout/react-shared-components';
import CounterModule from '@admin-layout/counter-module-browser';
import PlatformModule from '@admin-layout/platform-browser';
import ScheduleModule from '@admin-layout/schedule-module-browser';

const features = new Feature(
        FeatureWithRouterFactory,
        UISettingsModule,
        PlatformModule,
        CounterModule,
        ScheduleModule
);

// console.log(sharedModule);
export const MainRoute = props => (
        <React.Suspense fallback={<span>Loading....</span>}>
                <ProLayout
                        route={{ routes: features.getMenus(), authority: ['admin', 'user'] }}
                        breadcrumbNameMap={{}}
                >
                        <WorkbenchTheme children={features.getRoutes()} />
                </ProLayout>
        </React.Suspense>
);

export default features;
