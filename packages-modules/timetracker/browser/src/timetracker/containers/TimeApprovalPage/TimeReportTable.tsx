import React from 'react';
import { Table, Button, Dropdown, Menu } from 'antd';
import { ITimesheetResponse, ITimesheetState } from '@admin-layout/timetracker-core';
import { MoreOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useFela } from 'react-fela';
import { ITimesheetCreateRequest, IOrgMember } from '@admin-layout/timetracker-core';
import * as _ from 'lodash';
import { VIEW_MODE } from './index';
import { useTimeformat } from '../../hooks'
import { useHistory } from 'react-router'
import { generatePath } from 'react-router-dom'
import { useGetOrgContextQuery } from '@adminide-stack/react-shared-components'
import { ROUTES } from '../../constants'
import * as qs from 'query-string'
interface ITimesheetProps {
  timesheets: Array<ITimesheetResponse>;
  viewMode: VIEW_MODE;
  members: Array<IOrgMember>;    
  updateTimesheet: (id: string, request: ITimesheetCreateRequest) => void;
}

const TimeReport = ({
  timesheets,
  viewMode,
  members,
  updateTimesheet,
}: ITimesheetProps) => {
  const { css } = useFela();
  const history = useHistory();
  const { dateFormat, timeFormat } = useTimeformat();
  const { data: contextData } = useGetOrgContextQuery();
  const handleView = (id: string, record: ITimesheetResponse) => {
    history.push({
      pathname: generatePath(ROUTES.Timesheet, { orgName: contextData.getOrgContext.orgName }),
      search: qs.stringify({ view: 'tabular', weekStart: moment(record.startDate).format('YYYY-MM-DD')})
    })
  };

  const handleSubmit = (id: string, record: ITimesheetResponse) => {
    const request: ITimesheetCreateRequest = {
      ..._.omit(record, ['__typename', 'id', 'orgId']),
      submittedOn: moment(),
      state: ITimesheetState.SUBMITTED,
      updatedOn: moment(),
    };
    updateTimesheet(id, request);
  };

  const handleUnSubmit = (id: string, record: ITimesheetResponse) => {
    const request: ITimesheetCreateRequest = {
      ..._.omit(record, ['__typename', 'id', 'orgId']),
      approvedOn: null,
      submittedOn: null,
      state: ITimesheetState.OPEN,
      updatedOn: moment(),
    };
    updateTimesheet(id, request);
  };

  const handleApprove = (id: string, record: ITimesheetResponse) => {
    const request: ITimesheetCreateRequest = {
      ..._.omit(record, ['__typename', 'id', 'orgId']),
      approvedOn: moment(),
      state: ITimesheetState.APPROVED,
      updatedOn: moment(),
    };
    updateTimesheet(id, request);
  };

  const handleDeny = (id: string, record: ITimesheetResponse) => {
    const request: ITimesheetCreateRequest = {
      ..._.omit(record, ['__typename', 'id', 'orgId']),
      state: ITimesheetState.DENYED,
      updatedOn: moment(),
    };
    updateTimesheet(id, request);
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'userId',
      key: 'userId',
      render: value => {
        console.log('value =>', value);
        const member = members.find(m => m.userId === value);
        return <> {member !== undefined ? member.name : ''} </>;
      },
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: value => <> {moment(value).format(dateFormat || 'YYYY-MM-DD')} </>,
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: value => <> {moment(value).format(dateFormat || 'YYYY-MM-DD')} </>,
    },
    {
      title: 'Submitted On',
      dataIndex: 'submittedOn',
      key: 'submittedOn',
      render: value => <> {moment(value).format(dateFormat || 'YYYY-MM-DD')} </>,
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
              <Menu.Item key="view" onClick={() => handleView(record.id, record)}> View </Menu.Item>
              {viewMode === VIEW_MODE.OPEN && (
                <Menu.Item key="submit" onClick={() => handleSubmit(record.id, record)}>
                  Submit
                </Menu.Item>
              )}
              {viewMode === VIEW_MODE.SUBMITTED && (
                <Menu.Item key="unsubmit" onClick={() => handleUnSubmit(record.id, record)}>
                  Unsubmit
                </Menu.Item>
              )}
              {viewMode === VIEW_MODE.SUBMITTED && (
                <Menu.Item key="approve" onClick={() => handleApprove(record.id, record)}>
                  Approve
                </Menu.Item>
              )}
              {viewMode === VIEW_MODE.SUBMITTED && (
                <Menu.Item key="deny" onClick={() => handleDeny(record.id, record)}>
                  Deny
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

export default TimeReport;
