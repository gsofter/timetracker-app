import React from 'react';
import { PageContainer } from '@admin-layout/components';
import { Row, Col, Table, Tabs, Button, Dropdown, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { useGetTimesheetsQuery } from '../../../generated-models';
import { ITimesheet, ITimesheetState } from '@admin-layout/timetracker-module-core';
import * as _ from 'lodash';
import CSS from 'csstype';
import { useFela } from 'react-fela';
import moment from 'moment';

const { TabPane } = Tabs;

enum VIEW_MODE {
  OPEN,
  SUBMITTED,
  DENYED,
  ALL,
}

interface ITimesheetProps {
  timesheets: Array<ITimesheet>;
  viewMode: VIEW_MODE;
}

const TimeReport = ({ timesheets, viewMode }: ITimesheetProps) => {
  const { css } = useFela();
  const handleSubmit = (id: string) => {
    console.log('handleSubmit', id);
  };

  const handleUnSubmit = (id: string) => {
    console.log('handleUnSubmit', id);
  };

  const handleApprove = (id: string) => {
    console.log('handleApprove', id);
  };

  const columns = [
    {
      title: 'Member',
      dataIndex: 'member',
      key: 'member',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: value => <> {moment(value).format('YYYY-MM-DD')} </>,
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: value => <> {moment(value).format('YYYY-MM-DD')} </>,
    },
    {
      title: 'Submitted On',
      dataIndex: 'submittedOn',
      key: 'submittedOn',
      render: value => <> {moment(value).format('YYYY-MM-DD')} </>,
    },
    {
      title: 'state',
      dataIndex: 'state',
      key: 'state',
    },
    {
      action: 'action',
      key: 'action',
      render: (text, record) => {
        const actionMenu = () => {
          return (
            <Menu>
              <Menu.Item key="view"> View </Menu.Item>
              {viewMode === VIEW_MODE.OPEN && (
                <Menu.Item key="submite" onClick={() => handleSubmit(record.id)}>
                  Submit
                </Menu.Item>
              )}
              {viewMode === VIEW_MODE.SUBMITTED && (
                <Menu.Item key="unsubmit" onClick={() => handleUnSubmit(record.id)}>
                  Unsubmit
                </Menu.Item>
              )}
              {viewMode === VIEW_MODE.SUBMITTED && (
                <Menu.Item key="approve" onClick={() => handleApprove(record.id)}>
                  Approve
                </Menu.Item>
              )}
            </Menu>
          );
        };
        return (
          <Dropdown overlay={actionMenu} trigger={['click']}>
            <Button>
              <MoreOutlined />
            </Button>
          </Dropdown>
        );
      },
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
        <TabPane tab="Opened" key="1">
          <TimeReport timesheets={[]} viewMode={VIEW_MODE.OPEN} />
        </TabPane>
        <TabPane tab="Submitted" key="2">
          <TimeReport
            timesheets={_.get(data, 'getTimesheets', [])}
            viewMode={VIEW_MODE.SUBMITTED}
          />
        </TabPane>
        <TabPane tab="Approved" key="3">
          <TimeReport timesheets={[]} viewMode={VIEW_MODE.SUBMITTED} />
        </TabPane>
        <TabPane tab="Denied" key="4">
          <TimeReport timesheets={[]} viewMode={VIEW_MODE.DENYED} />
        </TabPane>
        <TabPane tab="All" key="5">
          <TimeReport timesheets={_.get(data, 'getTimesheets', [])} viewMode={VIEW_MODE.ALL} />
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

const styleSheet: { [key: string]: (props) => CSS.Properties } = {
  sheetRow: props => ({}),
};
export default TimeReportWrapper;
