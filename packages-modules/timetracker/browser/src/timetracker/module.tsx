import * as React from 'react';
import { Feature } from '@common-stack/client-react';
import { filteredRoutes } from './compute';
import { RegisterContribution } from './register-contribution';
import { ReportFill } from '@admin-layout/counter-module-browser';
import ReportsPage from './containers/ReportsPage';

const ReportProvider = (props: any) => {
  return (
      <>
        <ReportFill key="report" title={null} {...props}>
          <div>Report</div>
          {/*<ReportsPage/>*/}
        </ReportFill>
      </>
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
      name: 'report-provider',
      render: ReportProvider,
    },
  ],
  
});
