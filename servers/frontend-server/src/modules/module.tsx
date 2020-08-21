import * as React from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router';
import { Feature, FeatureWithRouterFactory } from '@common-stack/client-react';

import  { PageLayout } from '@admin-layout/react-shared-components';

const features = new Feature(FeatureWithRouterFactory);

// console.log(sharedModule);

export const MainRoute = props => (
    <Layout hasSider={true} style={{ minHeight: '100vh', display: 'flex' }}>
        <PageLayout/>

        {/* <SiderMenu
            collapsed={false}
            menuData={features.getMenus()}
            location={window.location as any}
            segments={features.sidebarSegments}
        /> */}
        <Layout>
            <Layout.Content style={{height: '100%'}}>
                <section className="flex-grow" style={{height: '100%'}}>
                    {features.getRoutes()}
                </section>
            </Layout.Content>
        </Layout>
    </Layout>
);

export default features;
