import * as React from 'react';
import { Feature } from '@common-stack/client-react';
import { filteredRoutes } from './compute';
import { RegisterContribution } from './register-contribution';
import Report from '../DashboardReport';
import { DashboardFill } from '@adminide-stack/platform-browser/lib/components';
import { dataIdFromObject } from '@admin-layout/timetracker-core';

const ReportProvider = () => {
  return (
      <DashboardFill>
        <Report/>
      </DashboardFill>
  );
};

export default new Feature({
  routeConfig: filteredRoutes,
  dataIdFromObject: dataIdFromObject,
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
