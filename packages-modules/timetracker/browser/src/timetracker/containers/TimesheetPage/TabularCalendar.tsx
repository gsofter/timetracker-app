import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Spin, message, Dropdown, Menu, Popconfirm, Modal, Tag } from 'antd';
import moment, { Moment } from 'moment';
import { useFela } from 'react-fela';
import cls from 'classnames';
import {
  ITimeRecord,
  ITimeRecordRequest,
  ITimesheetCreateRequest,
  IProjects as IProject,
  ITimesheetState,
  ITimesheet,
} from '@admin-layout/timetracker-core';
import { TimesheetInput } from '../../components/TimesheetInput';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import {
  useGetDurationTimeRecordsQuery,
  useGetDurationTimesheetQuery,
  useRemoveDurationTimeRecordsMutation,
  useUpdateTimeRecordMutation,
  useCreateTimeRecordMutation,
  useCreateTimesheetMutation,
} from '../../../generated-models';
import { formatDuration } from '../../services/timeRecordService';
import CSS from 'csstype';
import * as _ from 'lodash';
import { useSelector } from 'react-redux';
import { withTimeformat } from '../../components/hoc';
import { useTimeformat, useLocationQuery, useFirstWeekDay } from '../../hooks';
import { useHistory, useLocation } from 'react-router';
import * as qs from 'query-string';
interface ITabularCalendar {
  weekStart: Moment;
  setWeekStart: Function;
  records: ITimeRecord[];
  projects: Array<IProject>;
  timesheet: ITimesheet | null;
  handleRemoveDuration: Function;
  updateTimeRecord: Function;
  createTimeRecord: Function;
  createTimesheet: Function;
}

const TabularCalendar = ({
  weekStart,
  setWeekStart,
  records,
  projects,
  timesheet,
  handleRemoveDuration,
  updateTimeRecord,
  createTimeRecord,
  createTimesheet,
}: ITabularCalendar) => {
  const { css } = useFela();
  const [trackedProjects, setTrackedProjects] = useState<Array<IProject>>([]);
  const [showUnkownProject, setShowUnkownProject] = useState(false);
  const [newRows, setNewRows] = useState([]);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const { timeFormat, dateFormat } = useTimeformat();
  const history = useHistory();
  const userId = useSelector<any>(state => state.user.auth0UserId) as string;
  useEffect(() => {
    const trackedProjects = projects.filter(
      p => records.findIndex(r => r.projectId === p.id) !== -1,
    );
    setTrackedProjects(trackedProjects);

    if (records.findIndex(r => r.projectId === '') === -1) setShowUnkownProject(false);
    else setShowUnkownProject(true);
    const rows = newRows.filter(pId => trackedProjects.findIndex(p => p.id === pId) === -1);
    setNewRows(rows);
  }, [weekStart, records]);

  const setPathWeekStart = (newWeekStarts: Moment) => {
    const parsed = qs.parse(location.search);
    parsed.weekStart = moment(newWeekStarts).format('YYYY-MM-DD');
    history.push({
      pathname: location.pathname,
      search: qs.stringify(parsed)
    })
  }

  const onClickBack = event => {
    const newWeekStart = moment(weekStart).add('-1', 'week');
    setPathWeekStart(newWeekStart)
  };

  const onClickNext = event => {
    const newWeekStart = moment(weekStart).add('1', 'week');
    setPathWeekStart(newWeekStart)
  };

  const onClickToday = event => {
    const newWeekStart = moment().startOf('week');
    setPathWeekStart(newWeekStart)
  };

  const onClickAddNewRow = () => {
    // setNewRows()
  };

  const getProjectTotalDuration = projectId => {
    const pRecords = records
      .filter(r => r.projectId === projectId)
      .filter(
        r =>
          moment(r.startTime) >= moment(weekStart) &&
          moment(r.endTime) <= moment(weekStart).add(1, 'week'),
      );
    let totalDur = 0;
    pRecords.forEach(pr => {
      const dur = Math.floor(
        (moment(pr.endTime).valueOf() - moment(pr.startTime).valueOf()) / 1000,
      );
      totalDur = totalDur + dur;
    });
    return totalDur;
  };

  const getDayTotalDuration = curDay => {
    const dayStr = moment(curDay).format(dateFormat);
    const dRecords = records
      .filter(r => moment(r.startTime).format(dateFormat) === dayStr)
      .filter(r => projects.findIndex(p => p.id === r.projectId) !== -1);
    let totalDur = 0;
    dRecords.forEach(pr => {
      const dur = Math.floor(
        (moment(pr.endTime).valueOf() - moment(pr.startTime).valueOf()) / 1000,
      );
      totalDur = totalDur + dur;
    });
    return totalDur;
  };

  const getTotalDuration = () => {
    const dRecords = records
      .filter(
        r =>
          moment(r.startTime) >= moment(weekStart) &&
          moment(r.endTime) <= moment(weekStart).add(1, 'week'),
      )
      .filter(r => projects.findIndex(p => p.id === r.projectId) !== -1);
    let totalDur = 0;
    dRecords.forEach(pr => {
      const dur = Math.floor(
        (moment(pr.endTime).valueOf() - moment(pr.startTime).valueOf()) / 1000,
      );
      totalDur = totalDur + dur;
    });
    return totalDur;
  };

  const handleSelectNewProject = projectId => {
    setNewRows([...newRows, projectId]);
  };

  const handleRemoveNewRow = rowId => {
    setNewRows(newRows.filter(pId => pId !== rowId));
  };

  const handleSubmitApproval = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const approvalRequest: ITimesheetCreateRequest = {
      userId,
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

  const isProjectSelectable = () => {
    const selectables = projects.filter(
      p =>
        trackedProjects.findIndex(tp => tp.id === p.id) === -1 &&
        newRows.findIndex(pId => pId === p.id) === -1,
    );
    return selectables.length > 0 ? true : false;
  };
  const projectDropdownMenus = (
    <Menu className={css(styles.projectDown)}>
      {projects
        .filter(
          p =>
            trackedProjects.findIndex(tp => tp.id === p.id) === -1 &&
            newRows.findIndex(pId => pId === p.id) === -1,
        )
        .map(pr => {
          return (
            <Menu.Item key={pr.id} onClick={() => handleSelectNewProject(pr.id)}>
              {pr.name}
            </Menu.Item>
          );
        })}
    </Menu>
  );
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
          Ready to submit from {moment(weekStart).format('MMM DD')} -
          {moment(weekStart)
            .add(1, 'week')
            .format('MMM DD')}
          &nbsp; approval?
        </p>
      </Modal>
      <Row className="toolBar">
        <Col xs={24} md={6} className="control">
          <Button onClick={onClickToday}> Today </Button>
          <Button onClick={onClickBack}> Back </Button>
          <Button onClick={onClickNext}> Next </Button>
        </Col>
        <Col xs={24} md={12} style={{ textAlign: 'center' }}>
          <span className="duration-start"> {moment(weekStart).format('MMMM DD')}</span> -
          <span className="duration-end">
            {moment(weekStart).format('MM') ===
            moment(weekStart)
              .add(1, 'week')
              .format('MM')
              ? moment(weekStart)
                  .add(1, 'week')
                  .format('DD')
              : moment(weekStart)
                  .add(1, 'week')
                  .format('MMMM DD')}
          </span>
        </Col>
        <Col xs={24} md={6} className="control" style={{ textAlign: 'right' }}>
          <Button> Day </Button>
          <Button> Week </Button>
          <Button> Month </Button>
        </Col>
      </Row>

      <table className={css(styles.calendarTable)}>
        <thead>
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
        </thead>
        <tbody>
          {trackedProjects.map(p => {
            return (
              <tr key={p.id}>
                <td> {p.name}</td>
                {Array(7)
                  .fill(0)
                  .map((val, index) => {
                    const curDay = moment(weekStart).add(index, 'day');
                    const curDayRecords = records.filter(
                      r =>
                        r.projectId === p.id &&
                        moment(r.startTime).format(dateFormat) === curDay.format(dateFormat),
                    );
                    return (
                      <td key={curDay.format(dateFormat)}>
                        <TimesheetInput
                          dateStr={curDay.format(dateFormat)}
                          projectId={p.id}
                          records={curDayRecords}
                          createTimeRecord={createTimeRecord}
                          updateTimeRecord={updateTimeRecord}
                          projects={projects}
                          projectTitle={p.name}
                        />
                      </td>
                    );
                  })}
                <td> {formatDuration(getProjectTotalDuration(p.id), timeFormat)}</td>
                <td>
                  <Popconfirm
                    title="Are you sure to remove event"
                    okText="OK"
                    cancelText="Cancel"
                    onConfirm={() => handleRemoveDuration(p.id)}
                  >
                    <Button icon={<CloseOutlined />} />
                  </Popconfirm>
                </td>
              </tr>
            );
          })}

          {showUnkownProject ? (
            <tr>
              <td> Unknown </td>
              {Array(7)
                .fill(0)
                .map((val, index) => {
                  const curDay = moment(weekStart).add(index, 'day');
                  const curDayRecords = records.filter(
                    r =>
                      projects.findIndex(p => p.id === r.projectId) === -1 && // doesn't include in projects list
                      moment(r.startTime).format(dateFormat) === curDay.format(dateFormat), // cur day records
                  );
                  return (
                    <td key={curDay.format(dateFormat)}>
                      <TimesheetInput
                        dateStr={curDay.format(dateFormat)}
                        projectId={''}
                        records={curDayRecords}
                        createTimeRecord={createTimeRecord}
                        updateTimeRecord={updateTimeRecord}
                        projects={projects}
                        projectTitle={''}
                      />
                    </td>
                  );
                })}
              <td> {formatDuration(getProjectTotalDuration(''), timeFormat)}</td>
            </tr>
          ) : (
            <> </>
          )}

          {newRows.map(pId => {
            const project = projects.find(p => p.id === pId);
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
          })}
          <tr>
            <td>
              <Dropdown
                overlay={projectDropdownMenus}
                trigger={['click']}
                disabled={!isProjectSelectable()}
              >
                <Button icon={<PlusOutlined />} disabled={!isProjectSelectable()}>
                  Select Project
                </Button>
              </Dropdown>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
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
        </tbody>
      </table>
      <Row className="table-footer">
        {timesheet ? <Tag color="blue"> {timesheet.state} </Tag> : ''}
        <div className="spacer"></div>
        <Button type="primary" onClick={openSubmitApproval} disabled={timesheet !== null}>
          Submit For Approval
        </Button>
      </Row>
    </div>
  );
};

interface ITabularCalendarWrapperProps {
  projects: IProject[];
  tags: any;
  members: any;
}

const TabularCalendarWrapper = ({ projects }: ITabularCalendarWrapperProps) => {
  const filterEvents = events => {
    if(!events) return []
    return events.map(ev => ({
      ...ev,
      startTime: moment(ev.startTime).toDate(),
      endTime: moment(ev.endTime).toDate(),
    }));
  };

  

  const location = useLocation();
  const history = useHistory();
  const queryParsed = qs.parse(location.search);
  const { day, value: dowValue } = useFirstWeekDay();
  // moment.locale("es-es");
  console.log('dowValue => ', dowValue)
  const weekStart = () => {
    return (queryParsed.weekStart ? moment(queryParsed.weekStart) : moment().startOf('week').add(dowValue, 'day'));
  }
  
  useEffect(() => {
    const queryParsed = qs.parse(location.search)
    if(queryParsed.strict === undefined || !queryParsed.strict)
    { 
      queryParsed.weekStart = moment().startOf('week').add(dowValue, 'day').format('YYYY-MM-DD');
      history.push({
        pathname: location.pathname,
        search: qs.stringify(queryParsed)
      })
    }
  }, [dowValue])

  const { data, loading, refetch, error } = useGetDurationTimeRecordsQuery({
    variables: {
      startTime: weekStart(),
      endTime: moment(weekStart()).add(1, 'week'),
    },
  });

  const {
    data: approvalData,
    loading: loadingApproval,
    refetch: refetchApproval,
  } = useGetDurationTimesheetQuery({
    variables: {
      start: moment(weekStart()),
      end: moment(weekStart()).add(1, 'week'),
    },
  });

  const reloadData = () => {
    refetch();
    refetchApproval();
  };

  useEffect(() => {
    reloadData();
  }, [weekStart]);

  const [createMutation] = useCreateTimeRecordMutation();
  const [updateMutation] = useUpdateTimeRecordMutation();
  const [removeMutation] = useRemoveDurationTimeRecordsMutation();
  const [createTimesheetMutation] = useCreateTimesheetMutation();
  const handleRemoveDuration = pId => {
    removeMutation({
      variables: {
        startTime: weekStart(),
        endTime: moment(weekStart()).add(1, 'week'),
        projectId: pId,
      },
    })
      .then(() => {
        message.success('Removed');
        refetch();
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  // create time record
  const createTimeRecord = (request: ITimeRecordRequest) => {
    createMutation({ variables: { request } })
      .then(() => {
        message.success('TimeRecord created');
        refetch();
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  // update time record
  const updateTimeRecord = (recordId: string, request: ITimeRecordRequest) => {
    updateMutation({ variables: { recordId, request } })
      .then(() => {
        message.success('TimeRecord Updated');
        refetch();
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  // create timeSheet
  const createTimesheet = (request: ITimesheetCreateRequest) => {
    createTimesheetMutation({ variables: { request } })
      .then(() => {
        refetchApproval();
        message.success('Timesheet Created');
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  // if (!data || loading) return null;
  return (
    <Spin spinning={!data || loading}>
      <TabularCalendar
        weekStart={weekStart()}
        setWeekStart={() => {}}
        records={filterEvents(data?.getDurationTimeRecords)}
        projects={projects}
        timesheet={_.get(approvalData, 'getDurationTimesheet', null)}
        handleRemoveDuration={handleRemoveDuration}
        createTimeRecord={createTimeRecord}
        updateTimeRecord={updateTimeRecord}
        createTimesheet={createTimesheet}
      />
    </Spin>
  );
};

const styles: { [property: string]: (props) => CSS.Properties } = {
  root: props => ({
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
  modal: props => ({
    display: 'inherited',
    '& .flex-row': {
      display: 'flex',
      flexDirection: 'row',
    },
    '& .spacer': {
      flexGrow: 1,
    },
  }),
  dateHeader: props => ({
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
  greenText: props => ({
    color: 'green',
  }),
  boldText: props => ({
    fontWeight: 'bold',
  }),

  calendarTable: props => ({
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

export default TabularCalendarWrapper;
