import * as React from 'react';
import { Feature, FeatureWithRouterFactory } from '@common-stack/client-react';
import { MainLayout } from '@admin-layout/react-shared-components';
import CounterModule from '@admin-layout/counter-module-browser';

const features = new Feature(
        FeatureWithRouterFactory,
        CounterModule,
);





// console.log(sharedModule);
export const MainRoute = props => (
        <MainLayout sidebarSegments={features.sidebarSegments} route={features.getMenus()}>
                {features.getRoutes()}
        </MainLayout>
);

export default features;
