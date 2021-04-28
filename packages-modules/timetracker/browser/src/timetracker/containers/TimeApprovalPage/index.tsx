import React from 'react';
import { PageContainer } from '@admin-layout/components';
import { Tabs, message } from 'antd';
import { IPermissionType } from '@adminide-stack/core';
import {
  useGetTimesheetsQuery,
  useUpdateTimesheetMutation,
  useGetOrganizationMembersQuery,
} from '../../../generated-models';
import { ITimesheetState, ITimesheetCreateRequest } from '@admin-layout/timetracker-core';
import * as _ from 'lodash';
import CSS from 'csstype';
import TimeReportTable from './TimeReportTable';
import { useViewPermissions, useManagePermissions } from '../../hooks';
import { useSelector } from 'react-redux';

const { TabPane } = Tabs;

export enum VIEW_MODE {
  OPEN,
  SUBMITTED,
  APPROVED,
  DENYED,
  ALL,
}

const handleChangeTabView = (key) => {
  console.log(key);
};

const TimeReportWrapper = () => {
  const { data, loading, refetch } = useGetTimesheetsQuery({ variables: { withTotalHours: true } });
  const { data: membersData, loading: loadingMembers } = useGetOrganizationMembersQuery();
  const { others: viewOtherPermit, self: viewSelfPermit } = useViewPermissions();
  const [updateMutation] = useUpdateTimesheetMutation();
  const userId = useSelector<any>((state) => state.user.auth0UserId) as string;

  const updateTimesheet = (sheetId: string, request: ITimesheetCreateRequest) => {
    updateMutation({ variables: { sheetId, request } })
      .then(() => {
        refetch();
        message.success('Timesheet updated');
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const filteredMembers = () => {
    return _.get(membersData, 'getOrganizationMembers', []).filter((member) => {
      if (viewOtherPermit === IPermissionType.Allow && member.userId !== userId) return true;
      if (viewSelfPermit === IPermissionType.Allow && member.userId === userId) return true;
      return false;
    });
  };

  const filteredTimesheets = (state?: ITimesheetState) => {
    const memStrArr = filteredMembers().map((mem) => mem.userId);
    return _.get(data, 'getTimesheets', []).filter(
      (timesheet) =>
        timesheet.state === state || (state === undefined && memStrArr.includes(timesheet.userId)),
    );
  };

  if (loading) return <> Loading... </>;
  return (
    <PageContainer>
      <Tabs defaultActiveKey="1" onChange={handleChangeTabView}>
        <TabPane tab="Opened" key="1">
          <TimeReportTable
            timesheets={filteredTimesheets(ITimesheetState.OPEN)}
            viewMode={VIEW_MODE.OPEN}
            members={_.get(membersData, 'getOrganizationMembers', [])}
            updateTimesheet={updateTimesheet}
          />
        </TabPane>
        <TabPane tab="Submitted" key="2">
          <TimeReportTable
            timesheets={filteredTimesheets(ITimesheetState.SUBMITTED)}
            viewMode={VIEW_MODE.SUBMITTED}
            members={_.get(membersData, 'getOrganizationMembers', [])}
            updateTimesheet={updateTimesheet}
          />
        </TabPane>
        <TabPane tab="Approved" key="3">
          <TimeReportTable
            timesheets={filteredTimesheets(ITimesheetState.APPROVED)}
            viewMode={VIEW_MODE.APPROVED}
            members={_.get(membersData, 'getOrganizationMembers', [])}
            updateTimesheet={updateTimesheet}
          />
        </TabPane>
        <TabPane tab="Denied" key="4">
          <TimeReportTable
            timesheets={filteredTimesheets(ITimesheetState.DENYED)}
            viewMode={VIEW_MODE.DENYED}
            members={_.get(membersData, 'getOrganizationMembers', [])}
            updateTimesheet={updateTimesheet}
          />
        </TabPane>
        <TabPane tab="All" key="5">
          <TimeReportTable
            timesheets={filteredTimesheets()}
            viewMode={VIEW_MODE.ALL}
            members={_.get(membersData, 'getOrganizationMembers', [])}
            updateTimesheet={updateTimesheet}
          />
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

const styleSheet: { [key: string]: (props) => CSS.Properties } = {
  sheetRow: (props) => ({}),
};
export default TimeReportWrapper;
