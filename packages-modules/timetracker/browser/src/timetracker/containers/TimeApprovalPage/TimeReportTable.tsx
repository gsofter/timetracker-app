import React from 'react';
import { Table, Button, Dropdown, Menu } from 'antd';
import { ITimesheetResponse, ITimesheetState } from '@admin-layout/timetracker-core';
import { MoreOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ITimesheetCreateRequest, IOrgMember } from '@admin-layout/timetracker-core';
import { useManagePermissions, useTimeformat, useViewPermissions } from '../../hooks';
import { useHistory } from 'react-router';
import { generatePath } from 'react-router-dom';
import { useGetOrgContextQuery } from '@adminide-stack/react-shared-components';
import { ROUTES } from '../../constants';
import * as qs from 'query-string';
import * as _ from 'lodash';
import { IPermissionType } from '@adminide-stack/core';
import { useSelector } from 'react-redux';
import { formatDuration } from '../../services/timeRecordService';

enum VIEW_MODE {
  OPEN,
  SUBMITTED,
  APPROVED,
  DENYED,
  ALL,
}
interface ITimesheetProps {
  timesheets: Array<ITimesheetResponse>;
  viewMode: VIEW_MODE;
  members: Array<IOrgMember>;
  updateTimesheet: (id: string, request: ITimesheetCreateRequest) => void;
}

const TimeReport = ({ timesheets, viewMode, members, updateTimesheet }: ITimesheetProps) => {
  const history = useHistory();
  const { dateFormat } = useTimeformat();
  const { data: contextData } = useGetOrgContextQuery();
  const managePermit = useManagePermissions();
  const viewPermit = useViewPermissions();
  const userId = useSelector<any>((state) => state.user.auth0UserId) as string;
  const handleView = (id: string, record: ITimesheetResponse) => {
    history.push({
      pathname: generatePath(ROUTES.Timesheet, { orgName: contextData.getOrgContext.orgName }),
      search: qs.stringify({
        view: 'tabular',
        weekStart: moment(record.startDate).format('YYYY-MM-DD'),
        username: record.userId,
        strict: 'true',
      }),
    });
  };

  const handleSubmit = (id: string, record: ITimesheetResponse) => {
    const request: ITimesheetCreateRequest = {
      ..._.omit(record, ['__typename', 'id', 'orgId', 'totalDuration']),
      submittedOn: moment(),
      state: ITimesheetState.SUBMITTED,
      updatedOn: moment(),
    };
    updateTimesheet(id, request);
  };

  const handleUnSubmit = (id: string, record: ITimesheetResponse) => {
    const request: ITimesheetCreateRequest = {
      ..._.omit(record, ['__typename', 'id', 'orgId', 'totalDuration']),
      approvedOn: null,
      submittedOn: null,
      state: ITimesheetState.OPEN,
      updatedOn: moment(),
    };
    updateTimesheet(id, request);
  };

  const handleApprove = (id: string, record: ITimesheetResponse) => {
    const request: ITimesheetCreateRequest = {
      ..._.omit(record, ['__typename', 'id', 'orgId', 'totalDuration']),
      approvedOn: moment(),
      approvedBy: userId,
      state: ITimesheetState.APPROVED,
      updatedOn: moment(),
    };
    updateTimesheet(id, request);
  };

  // for testing purpose
  const handleUnApprove = (id: string, record: ITimesheetResponse) => {
    const request: ITimesheetCreateRequest = {
      ..._.omit(record, ['__typename', 'id', 'orgId', 'totalDuration']),
      approvedOn: moment(),
      approvedBy: userId,
      state: ITimesheetState.SUBMITTED,
      updatedOn: moment(),
    };
    updateTimesheet(id, request);
  };

  const handleDeny = (id: string, record: ITimesheetResponse) => {
    const request: ITimesheetCreateRequest = {
      ..._.omit(record, ['__typename', 'id', 'orgId', 'totalDuration']),
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
      render: (value) => {
        const member = members.find((m) => m.userId === value);
        return <> {member !== undefined ? member.name : ''} </>;
      },
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (value) => <> {moment(value).format(dateFormat || 'YYYY-MM-DD')} </>,
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (value) => (
        <>
          {moment(value)
            .add(-1, 'day')
            .format(dateFormat || 'YYYY-MM-DD')}
        </>
      ),
    },
    {
      title: 'Duration',
      dataIndex: 'totalDuration',
      key: 'totalDuration',
      render: (value) => <> {formatDuration(value)} </>,
    },
    {
      title: 'Submitted On',
      dataIndex: 'submittedOn',
      key: 'submittedOn',
      render: (value) => <> {moment(value).format(dateFormat || 'YYYY-MM-DD')} </>,
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
        const disableView =
          (record.userId === userId && viewPermit.self !== IPermissionType.Allow) ||
          (record.userId !== userId && viewPermit.others !== IPermissionType.Allow);
        const disableManage =
          (record.userId === userId && managePermit.self !== IPermissionType.Allow) ||
          (record.userId !== userId && managePermit.others !== IPermissionType.Allow);
        const actionMenu = () => {
          return (
            <Menu>
              <Menu.Item key="view" onClick={() => handleView(record.id, record)} disabled={disableView}>
                View
              </Menu.Item>
              {viewMode === VIEW_MODE.OPEN && (
                <Menu.Item key="submit" onClick={() => handleSubmit(record.id, record)}>
                  Submit
                </Menu.Item>
              )}
              {viewMode === VIEW_MODE.SUBMITTED && (
                <Menu.Item key="unsubmit" onClick={() => handleUnSubmit(record.id, record)} disabled={disableManage}>
                  Unsubmit
                </Menu.Item>
              )}
              {viewMode === VIEW_MODE.SUBMITTED && (
                <Menu.Item key="approve" onClick={() => handleApprove(record.id, record)} disabled={disableManage}>
                  Approve
                </Menu.Item>
              )}
              {viewMode === VIEW_MODE.SUBMITTED && (
                <Menu.Item key="deny" onClick={() => handleDeny(record.id, record)} disabled={disableManage}>
                  Deny
                </Menu.Item>
              )}
              {viewMode === VIEW_MODE.APPROVED && (
                <Menu.Item key="submit" onClick={() => handleUnApprove(record.id, record)} disabled={disableManage}>
                  Unapprove
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

  return <Table columns={columns} dataSource={timesheets} />;
};

export default TimeReport;
