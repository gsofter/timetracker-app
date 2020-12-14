import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import { PageContainer } from '@admin-layout/components';

export const Dashboard = props => (
  <PageContainer>{renderRoutes(props.route.routes, { matchPath: props.route.path })}</PageContainer>
);
