import React from 'react';
import { PageContainer } from '@admin-layout/components';
import { Row, Col, Table, Tabs } from 'antd';
import { useGetTimesheetsQuery } from '../../../generated-models';
import { ITimesheet } from '@admin-layout/timetracker-module-core';
import * as _ from 'lodash';
import CSS from 'csstype';
import { useFela } from 'react-fela';
const { TabPane } = Tabs;

interface ITimesheetProps {
  timesheets: Array<ITimesheet>;
}

const TimeReport = ({ timesheets }: ITimesheetProps) => {
  const { css } = useFela();

  const columns = [
    {
      title: 'Member',
      dataIndex: 'member',
    },
    {
      title: 'StartDate',
      dataIndex: 'startDate',
    },
    {
      title: 'EndDate',
      dataIndex: 'endDate',
    },
    {
      title: 'Submitted On',
      dataIndex: 'submittedOn',
    },
    {
      title: 'state',
      dataIndex: 'state',
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={timesheets} />
    </>
  );
};

const handleChangeTabView = key => {
  console.log(key);
};

const TimeReportWrapper = () => {
  const { data, loading } = useGetTimesheetsQuery();

  if (loading) return <> Loading... </>;
  return (
    <PageContainer>
      <Tabs defaultActiveKey="1" onChange={handleChangeTabView}>
        <TabPane tab="Opened" key="1"></TabPane>
        <TabPane tab="Submitted" key="2">
          <TimeReport timesheets={_.get(data, 'getTimesheets', [])} />
        </TabPane>
        <TabPane tab="Approved" key="3">
          <TimeReport timesheets={[]} />
        </TabPane>
        <TabPane tab="All" key="4">
          <TimeReport timesheets={[]} />
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

const styleSheet: { [key: string]: (props) => CSS.Properties } = {
  sheetRow: props => ({}),
};
export default TimeReportWrapper;
