import * as React from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router';
import { Feature, FeatureWithRouterFactory } from '@common-stack/client-react';
import LayoutModule, { ProLayout } from '@admin-layout/react-shared-components';
import CounterModule from '@admin-layout/counter-module-browser';
import PlatformModule from '@admin-layout/platform-browser';
import ScheduleModule from '@admin-layout/schedule-module-browser';
import ActivityModule from '@admin-layout/activity-module-browser';
import TimeTrackerModule from '@admin-layout/timetracker-module-browser';
import { SiderMenu } from './layout';

const features = new Feature(
    FeatureWithRouterFactory,
    LayoutModule,
    PlatformModule,
    CounterModule,
    ScheduleModule,
    TimeTrackerModule,
    ActivityModule,
);

console.log(features.getMenus());

export const MainRoute = props => (
    <Layout hasSider={true} style={{ minHeight: '100vh', display: 'flex' }}>
        <SiderMenu
            collapsed={false}
            menuData={features.getMenus()}
            location={window.location as any}
            segments={features.sidebarSegments}
        />
        <Layout>
            <Layout.Content style={{ height: '100%' }}>
                <section className="flex-grow" style={{ height: '100%' }}>
                    {features.getRoutes()}
                </section>
            </Layout.Content>
        </Layout>
    </Layout>
);

export default features;
