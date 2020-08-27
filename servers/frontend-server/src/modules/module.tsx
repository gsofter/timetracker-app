import * as React from 'react';
import { Layout } from 'antd';
import { SmileOutlined, HeartOutlined } from '@ant-design/icons';
import { Route, Switch } from 'react-router';
import { Feature, FeatureWithRouterFactory } from '@common-stack/client-react';
import  { ApplicationMainLayout } from '@admin-layout/react-shared-components';

const features = new Feature(FeatureWithRouterFactory);
 
 



// console.log(sharedModule);
export const MainRoute = props => (
        <ApplicationMainLayout/>

);

export default features;
