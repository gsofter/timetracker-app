import * as React from 'react';
import { Layout } from 'antd';
import { ConnectedRouter } from 'connected-react-router';
import { Feature, FeatureWithRouterFactory } from '@common-stack/client-react';
import TimeTrayModule from '@admin-layout/timetracker-module-browser/lib/index.electron';

const features = new Feature(FeatureWithRouterFactory, TimeTrayModule);
export const MainRoute = ({ history }) => (
    <>
        {features.getWrappedRoot(
            <ConnectedRouter history={history}>
                <Layout>
                    <Layout.Content style={{ height: '100%' }}>
                        <section className="flex-grow" style={{ height: '100%' }}>
                            {features.getRoutes()}
                        </section>
                    </Layout.Content>
                </Layout>
            </ConnectedRouter>
        )}
    </>
);

export default features;
