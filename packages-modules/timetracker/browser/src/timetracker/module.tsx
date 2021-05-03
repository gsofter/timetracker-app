import * as React from 'react';
import { Feature } from '@common-stack/client-react';
import { filteredRoutes } from './compute';
import { RegisterContribution } from './register-contribution';
import Report from '../DashboardReport';
import { ReportFill } from '@admin-layout/react-shared-components';

const ReportProvider = () => {
  return (
      <ReportFill>
        <Report/>
      </ReportFill>
  );
};

export default new Feature({
  routeConfig: filteredRoutes,
  clientStateParams: {
    // resolvers,
    // defaults
  },
  componentFillPlugins: [
    {
      name: 'register-contribution',
      render: RegisterContribution,
    },
    {
      name: 'report-fill-component',
      render: ReportProvider,
    }
  ],
  stylesInsert: [
    'react-big-calendar/lib/addons/dragAndDrop/styles.css',
    'react-big-calendar/lib/css/react-big-calendar.css'
  ]
  
});
