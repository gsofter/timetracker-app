import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Dropdown, Menu, Popconfirm, Modal, Tag, Typography } from 'antd';
import { moment } from '../../TimesheetPage';
import { Moment } from 'moment';
import { useFela } from 'react-fela';
import cls from 'classnames';
import {
  ITimeRecord,
  ITimesheetCreateRequest,
  IProjects as IProject,
  ITimesheetState,
  ITimesheet,
  IOrgMember,
} from '@admin-layout/timetracker-core';
import { TimesheetInput } from '../../../components/TimesheetInput';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { formatDuration } from '../../../services/timeRecordService';
import CSS from 'csstype';
import * as _ from 'lodash';
import { useTimeformat } from '../../../hooks';

const { Title } = Typography;

const calcDuration = (records: Array<ITimeRecord>) => {
  return records.reduce(
    (duration, record) =>
      Math.floor(Math.abs(moment(record.endTime).valueOf() - moment(record.startTime).valueOf()) / 1000) + duration,
    0,
  );
};

interface IProjectsApproval {
  approvals: Array<string>;
  unApprovals: Array<string>;
}
interface ITabularCalendar {
  weekStart: Moment;
  records: ITimeRecord[];
  projects: Array<IProject>;
  timesheets: Array<ITimesheet> | null;
  selectedUser: string;
  projectsApproval: IProjectsApproval;
  projectsMap: Map<string, IProject>;
  loading?: boolean;
  members: Array<IOrgMember>;
  handleRemoveDuration: Function;
  updateTimeRecord: Function;
  createTimeRecord: Function;
  createTimesheet: Function;
}

const enum TIMESHEET_STATE {
  APPROVED = 'Approved',
  PENDING = 'Pending for approval',
}

export const TabularCalendar = ({
  weekStart,
  records,
  projects,
  timesheets,
  selectedUser,
  projectsApproval,
  projectsMap,
  members,
  handleRemoveDuration,
  updateTimeRecord,
  createTimeRecord,
  createTimesheet,
}: ITabularCalendar) => {
  const { css } = useFela();
  const [newRows, setNewRows] = useState([]);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const { timeFormat, dateFormat } = useTimeformat();
  const { approvals, unApprovals } = projectsApproval;

  useEffect(() => {
    const rows = newRows.filter((pId) => unApprovals.findIndex((upId) => upId === pId) === -1);
    setNewRows(rows);
  }, [unApprovals]);

  const getProjectTotalDuration = (projectId, approved: boolean) => {
    return calcDuration(
      records.filter(
        (r) =>
          r.projectId === projectId &&
          (approved ? !!r.timesheetId : !r.timesheetId) &&
          moment(r.startTime) >= moment(weekStart) &&
          moment(r.endTime) <= moment(weekStart).add(1, 'week'),
      ),
    );
  };

  const getDayTotalDuration = (curDay) => {
    const dayStr = moment(curDay).format(dateFormat);
    return calcDuration(
      records
        .filter((r) => moment(r.startTime).format(dateFormat) === dayStr)
        .filter((r) => projects.findIndex((p) => p.id === r.projectId) !== -1),
    );
  };

  const getTotalDuration = () => {
    return calcDuration(
      records.filter(
        (r) => moment(r.startTime) >= moment(weekStart) && moment(r.endTime) <= moment(weekStart).add(1, 'week'),
      ),
    );
  };

  const handleSelectNewProject = (projectId) => {
    setNewRows([...newRows, projectId]);
  };

  const handleRemoveNewRow = (rowId) => {
    setNewRows(newRows.filter((pId) => pId !== rowId));
  };

  const handleSubmitApproval = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const approvalRequest: ITimesheetCreateRequest = {
      userId: selectedUser,
      startDate: moment(weekStart),
      endDate: moment(weekStart).add(1, 'week'),
      state: ITimesheetState.SUBMITTED,
      submittedOn: moment(),
    };
    createTimesheet(approvalRequest);
    setShowApprovalModal(false);
  };

  const openSubmitApproval = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowApprovalModal(true);
  };

  const handleCloseApproval = () => {
    setShowApprovalModal(false);
  };

  const selectableProjects = () => {
    // selectable projects should not be involved to unApprovedProjects() or newRows
    return projects.filter(
      (p) => unApprovals.findIndex((upId) => upId === p.id) === -1 && newRows.findIndex((pId) => pId === p.id) === -1,
    );
  };

  const projectDropdownMenus = (
    <Menu className={css(styles.projectDown)}>
      {selectableProjects().map((pr) => {
        return (
          <Menu.Item key={pr.id} onClick={() => handleSelectNewProject(pr.id)}>
            {pr.name}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const HeaderRows = () => {
    return (
      <tr>
        <th> ProjectName </th>
        {Array(7)
          .fill(0)
          .map((val, index) => {
            const curDay = moment(weekStart).add(index, 'day');
            return (
              <th key={index}>
                <div className={css(styles.dateHeader)}>
                  <div className={cls('day')}>
                    <span>{curDay.format('DD')}</span>
                  </div>
                  <div className="extra">
                    <div className="week">
                      <span>{curDay.format('ddd')}</span>
                    </div>
                    <div className="month">
                      <span>{curDay.format('MMM')}</span>
                    </div>
                  </div>
                </div>
              </th>
            );
          })}
        <th> Total </th>
        <th> Action </th>
      </tr>
    );
  };

  const UnApprovedRows = () => {
    return unApprovals.map((pId) => {
      const project = projectsMap.get(pId);
      return (
        <tr key={project.id}>
          <td> {project.name}</td>
          {Array(7)
            .fill(0)
            .map((val, index) => {
              const curDay = moment(weekStart).add(index, 'day');
              const curDayRecords = records.filter(
                (r) =>
                  r.projectId === project.id &&
                  moment(r.startTime).format(dateFormat) === curDay.format(dateFormat) &&
                  !r.timesheetId,
              );
              return (
                <td key={curDay.format(dateFormat)}>
                  <TimesheetInput
                    dateStr={curDay.format(dateFormat)}
                    projectId={project.id}
                    records={curDayRecords}
                    userId={selectedUser}
                    createTimeRecord={createTimeRecord}
                    updateTimeRecord={updateTimeRecord}
                    projects={projects}
                    projectTitle={project.name}
                  />
                </td>
              );
            })}
          <td> {formatDuration(getProjectTotalDuration(project.id, false), timeFormat)}</td>
          <td>
            <Popconfirm
              title="Are you sure to remove event"
              okText="OK"
              cancelText="Cancel"
              onConfirm={() => handleRemoveDuration(project.id)}
            >
              <Button icon={<CloseOutlined />} />
            </Popconfirm>
          </td>
        </tr>
      );
    });
  };

  const ApprovedRows = () => {
    return approvals.map((pId) => {
      const project = projectsMap.get(pId);
      return (
        <tr key={project.id}>
          <td> {project.name}</td>
          {Array(7)
            .fill(0)
            .map((val, index) => {
              const curDay = moment(weekStart).add(index, 'day');
              const curDayRecords = records.filter(
                (r) =>
                  r.projectId === project.id &&
                  moment(r.startTime).format(dateFormat) === curDay.format(dateFormat) &&
                  !!r.timesheetId,
              );
              return (
                <td key={curDay.format(dateFormat)}>
                  <TimesheetInput
                    dateStr={curDay.format(dateFormat)}
                    projectId={project.id}
                    userId={selectedUser}
                    records={curDayRecords}
                    createTimeRecord={createTimeRecord}
                    updateTimeRecord={updateTimeRecord}
                    projects={projects}
                    projectTitle={project.name}
                    disabled={true}
                  />
                </td>
              );
            })}
          <td> {formatDuration(getProjectTotalDuration(project.id, true), timeFormat)}</td>
          <td>
            <Popconfirm
              title="Are you sure to remove event"
              okText="OK"
              cancelText="Cancel"
              onConfirm={() => handleRemoveDuration(project.id)}
              disabled
            >
              <Button icon={<CloseOutlined />} disabled />
            </Popconfirm>
          </td>
        </tr>
      );
    });
  };

  const NewRows = () => {
    return newRows.map((pId) => {
      const project = projects.find((p) => p.id === pId);
      return (
        <tr key={pId}>
          <td> {project.name}</td>
          {Array(7)
            .fill(0)
            .map((val, index) => {
              const curDay = moment(weekStart).add(index, 'day');
              return (
                <td key={curDay.format(dateFormat)}>
                  <TimesheetInput
                    dateStr={curDay.format(dateFormat)}
                    projectId={pId}
                    userId={selectedUser}
                    createTimeRecord={createTimeRecord}
                    updateTimeRecord={updateTimeRecord}
                    projects={projects}
                  />
                </td>
              );
            })}
          <td>00:00:00</td>
          <td>
            <Popconfirm
              title="Are you sure to remove event"
              okText="OK"
              cancelText="Cancel"
              onConfirm={() => handleRemoveNewRow(pId)}
            >
              <Button icon={<CloseOutlined />} />
            </Popconfirm>
          </td>
        </tr>
      );
    });
  };

  const ProjectSelectionRow = () => {
    return (
      <tr>
        <td>
          <Dropdown overlay={projectDropdownMenus} trigger={['click']} disabled={projects.length === 0}>
            <Button icon={<PlusOutlined />} disabled={projects.length === 0}>
              Select Project
            </Button>
          </Dropdown>
        </td>
        {Array(9)
          .fill(0)
          .map((val) => (
            <EmptyCell />
          ))}
      </tr>
    );
  };

  const TotalReportRow = () => {
    return (
      <tr className="total">
        <td> Total </td>
        {Array(7)
          .fill(0)
          .map((val, index) => {
            const curDay = moment(weekStart).add(index, 'day');
            return <td>{formatDuration(getDayTotalDuration(curDay), timeFormat)} </td>;
          })}
        <td>{formatDuration(getTotalDuration(), timeFormat)} </td>
        <td></td>
      </tr>
    );
  };

  const getUsername = () => {
    const member = members.find((mem) => mem.userId === selectedUser);
    if (member) return member.name;
    return '';
  };

  const getTimesheetState = (): ITimesheetState | undefined => {
    if (timesheets.some((sheet) => sheet.state === ITimesheetState.SUBMITTED)) return ITimesheetState.SUBMITTED;
    if (timesheets.some((sheet) => sheet.state === ITimesheetState.APPROVED) && unApprovals.length === 0)
      return ITimesheetState.APPROVED;
    else return undefined;
  };
  return (
    <div className={css(styles.root)}>
      <Modal
        title="Submit Week for Approval"
        visible={showApprovalModal}
        onCancel={handleCloseApproval}
        className={css(styles.modal)}
        footer={[
          <Button key="back" onClick={handleCloseApproval}>
            Close
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmitApproval}>
            Submit
          </Button>,
        ]}
      >
        <p>
          Ready to submit from {moment(weekStart).format('MMM DD')} -{moment(weekStart).add(6, 'day').format('MMM DD')}
          &nbsp; approval?
        </p>
      </Modal>
      <Row className="table-header">
        <Col xs={24} md={8}>
          <Title level={5}>{getUsername()}</Title>
        </Col>
        {getTimesheetState() ? (
          <Col xs={24} md={8}>
            <Tag color={getTimesheetState() === ITimesheetState.SUBMITTED ? 'orange' : 'green'}>
              {getTimesheetState() === ITimesheetState.SUBMITTED ? 'Pending for approval' : 'Approved'}
            </Tag>
          </Col>
        ) : null}
      </Row>
      <table className={css(styles.calendarTable)}>
        <thead>{HeaderRows()}</thead>
        <tbody>
          {ApprovedRows()}
          {UnApprovedRows()}
          {NewRows()}
          {ProjectSelectionRow()}
          {TotalReportRow()}
        </tbody>
      </table>
      <Row className="table-footer">
        {getTimesheetState() === ITimesheetState.SUBMITTED ? (
          <p>
            You can still add time while time sheet is <b> Pending for approval</b>
          </p>
        ) : null}
        <div className="spacer"></div>
        {getTimesheetState() === undefined ? (
          <Button type="primary" onClick={openSubmitApproval}>
            Submit For Approval
          </Button>
        ) : null}
      </Row>
    </div>
  );
};

const styles: { [property: string]: (props) => CSS.Properties } = {
  root: (props) => ({
    display: 'block',
    '& .table-footer': {
      display: 'flex',
      flexDirection: 'row',
      paddingTop: '10px',
      paddingBottom: '10px',
    },
    '& .spacer': {
      flexGrow: '1',
    },
    '& .flex-row': {
      display: 'flex',
      flexDirection: 'row',
    },
  }),
  modal: (props) => ({
    display: 'inherited',
    '& .flex-row': {
      display: 'flex',
      flexDirection: 'row',
    },
    '& .spacer': {
      flexGrow: 1,
    },
  }),
  dateHeader: (props) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
    '& .day': {
      fontSize: '3em',
      fontWeight: '500',
      '@media (max-width: 768px)': {
        fontSize: '14px',
      },
    },
    '& .extra': {
      display: 'flex',
      flexDirection: 'column',
      '& .week': {
        fontSize: '1em',
        '@media (max-width: 768px)': {
          fontSize: '12px',
        },
      },

      '& .month': {
        fontSize: '1em',
        '@media (max-width: 768px)': {
          fontSize: '12px',
        },
        color: '#bbb',
      },
    },
    '& .today': {
      color: '#1890ff',
    },
  }),

  calendarTable: (props) => ({
    width: '100%',
    background: 'white',
    border: '1px solid #bbb',
    '& .spacer': {
      flexGrow: 1,
    },
    '& thead': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },

    '& tbody > tr > td:first-child': {
      paddingLeft: '10px',
      paddingRight: '10px',
    },
    '& .total': {
      background: 'rgba(0,0,0,.1)',
      fontWeight: 'bold',
    },
    '& .total > td': {
      paddingTop: '20px',
      paddingBottom: '20px',
    },
  }),
};

const EmptyCell = () => {
  return <td></td>;
};
