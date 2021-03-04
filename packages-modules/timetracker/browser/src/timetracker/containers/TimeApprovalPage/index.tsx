import React from 'react';
import { PageContainer } from '@admin-layout/components';
import { Tabs, message } from 'antd';
import { useGetTimesheetsQuery, useUpdateTimesheetMutation } from '../../../generated-models';
import {
  ITimesheet,
  ITimesheetState,
  ITimesheetCreateRequest,
} from '@admin-layout/timetracker-core';
import * as _ from 'lodash';
import CSS from 'csstype';
import TimeReportTable from './TimeReportTable';

const { TabPane } = Tabs;

export enum VIEW_MODE {
  OPEN,
  SUBMITTED,
  APPROVED,
  DENYED,
  ALL,
}

const handleChangeTabView = key => {
  console.log(key);
};

const TimeReportWrapper = () => {
  const { data, loading, refetch } = useGetTimesheetsQuery();

  const [updateMutation] = useUpdateTimesheetMutation();
  const updateTimesheet = (sheetId: string, request: ITimesheetCreateRequest) => {
    updateMutation({ variables: { sheetId, request } })
      .then(() => {
        refetch();
        message.success('Timesheet updated');
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  if (loading) return <> Loading... </>;
  return (
    <PageContainer>
      <Tabs defaultActiveKey="1" onChange={handleChangeTabView}>
        <TabPane tab="Opened" key="1">
          <TimeReportTable
            timesheets={[]}
            viewMode={VIEW_MODE.OPEN}
            updateTimesheet={updateTimesheet}
          />
        </TabPane>
        <TabPane tab="Submitted" key="2">
          <TimeReportTable
            timesheets={_.get(data, 'getTimesheets', []).filter(
              timesheet => timesheet.state === ITimesheetState.SUBMITTED,
            )}
            viewMode={VIEW_MODE.SUBMITTED}
            updateTimesheet={updateTimesheet}
          />
        </TabPane>
        <TabPane tab="Approved" key="3">
          <TimeReportTable
            timesheets={_.get(data, 'getTimesheets', []).filter(
              timesheet => timesheet.state === ITimesheetState.APPROVED,
            )}
            viewMode={VIEW_MODE.APPROVED}
            updateTimesheet={updateTimesheet}
          />
        </TabPane>
        <TabPane tab="Denied" key="4">
          <TimeReportTable
            timesheets={_.get(data, 'getTimesheets', []).filter(
              timesheet => timesheet.state === ITimesheetState.DENYED,
            )}
            viewMode={VIEW_MODE.DENYED}
            updateTimesheet={updateTimesheet}
          />
        </TabPane>
        <TabPane tab="All" key="5">
          <TimeReportTable
            timesheets={_.get(data, 'getTimesheets', [])}
            viewMode={VIEW_MODE.ALL}
            updateTimesheet={updateTimesheet}
          />
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

const styleSheet: { [key: string]: (props) => CSS.Properties } = {
  sheetRow: props => ({}),
};
export default TimeReportWrapper;
