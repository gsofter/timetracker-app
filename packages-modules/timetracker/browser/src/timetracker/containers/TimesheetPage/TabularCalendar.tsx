import React, { CSSProperties, ReactNode, useEffect, useState } from 'react';
import { Row, Col, Button, Spin, message, Dropdown, Menu, Popconfirm, Modal } from 'antd';
import moment, { Moment } from 'moment';
import { useFela } from 'react-fela';
import cls from 'classnames';
import { ITimeRecord, ITimeRecordRequest, IProject } from '@admin-layout/timetracker-module-core';
import { TimesheetInput } from '../../components/TimesheetInput';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import {
  useGetDurationTimeRecordsQuery,
  useRemoveDurationTimeRecordsMutation,
  useUpdateTimeRecordMutation,
  useCreateTimeRecordMutation,
} from '../../../generated-models';
import { formatDuration } from '../../services/timeRecordService';

interface ITabularCalendar {
  weekStart: Moment;
  setWeekStart: Function;
  records: ITimeRecord[];
  projects: Array<IProject>;
  handleRemoveDuration: Function;
  updateTimeRecord: Function;
  createTimeRecord: Function;
}

const TabularCalendar = ({
  weekStart,
  setWeekStart,
  records,
  projects,
  handleRemoveDuration,
  updateTimeRecord,
  createTimeRecord,
}: ITabularCalendar) => {
  const { css } = useFela();
  const [trackedProjects, setTrackedProjects] = useState<Array<IProject>>([]);
  const [newRows, setNewRows] = useState([]);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  useEffect(() => {
    const trackedProjects = projects.filter(
      p => records.findIndex(r => r.projectId === p.id) !== -1,
    );
    setTrackedProjects(trackedProjects);

    const rows = newRows.filter(pId => trackedProjects.findIndex(p => p.id === pId) === -1);
    setNewRows(rows);
  }, [weekStart, records]);

  const onClickBack = event => {
    const newWeekStart = moment(weekStart).add('-1', 'week');
    setWeekStart(newWeekStart);
  };

  const onClickNext = event => {
    const newWeekStart = moment(weekStart).add('1', 'week');
    setWeekStart(newWeekStart);
  };

  const onClickToday = event => {
    const newWeekStart = moment().startOf('week');
    setWeekStart(newWeekStart);
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
    const formatStr = 'YYYY-MM-DD';
    const dayStr = moment(curDay).format(formatStr);
    const dRecords = records
      .filter(r => moment(r.startTime).format(formatStr) === dayStr)
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
          <th> ProjectName </th>
          {Array(7)
            .fill(0)
            .map((val, index) => {
              const curDay = moment(weekStart).add(index, 'day');
              return (
                <th>
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
        </thead>
        <tbody>
          {trackedProjects.map(p => {
            return (
              <tr>
                <td> {p.name}</td>
                {Array(7)
                  .fill(0)
                  .map((val, index) => {
                    const curDay = moment(weekStart).add(index, 'day');
                    const curDayRecords = records.filter(
                      r =>
                        r.projectId === p.id &&
                        moment(r.startTime).format('YYYY-MM-DD') === curDay.format('YYYY-MM-DD'),
                    );
                    return (
                      <td key={curDay.format('YYYY-MM-DD')}>
                        <TimesheetInput
                          dateStr={curDay.format('YYYY-MM-DD')}
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
                <td> {formatDuration(getProjectTotalDuration(p.id))}</td>
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
          {newRows.map(pId => {
            const project = projects.find(p => p.id === pId);
            return (
              <tr>
                <td> {project.name}</td>
                {Array(7)
                  .fill(0)
                  .map((val, index) => {
                    const curDay = moment(weekStart).add(index, 'day');
                    return (
                      <td key={curDay.format('YYYY-MM-DD')}>
                        <TimesheetInput
                          dateStr={curDay.format('YYYY-MM-DD')}
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
                return <td>{formatDuration(getDayTotalDuration(curDay))} </td>;
              })}
            <td>{formatDuration(getTotalDuration())} </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <Row className="table-footer">
        <div className="spacer"></div>
        <Button type="primary" onClick={handleSubmitApproval}>
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
    return events.map(ev => ({
      ...ev,
      startTime: moment(ev.startTime).toDate(),
      endTime: moment(ev.endTime).toDate(),
    }));
  };
  const [weekStart, setWeekStart] = useState(moment().startOf('week'));
  const { data, loading, refetch, error } = useGetDurationTimeRecordsQuery({
    variables: {
      startTime: weekStart,
      endTime: moment(weekStart).add(1, 'week'),
    },
  });

  useEffect(() => {
    setWeekStart(moment().startOf('week'));
  }, []);

  useEffect(() => {
    refetch();
  }, [weekStart]);

  const [createMutation] = useCreateTimeRecordMutation();
  const [updateMutation] = useUpdateTimeRecordMutation();
  const [removeMutation] = useRemoveDurationTimeRecordsMutation();

  const handleRemoveDuration = pId => {
    console.log('handleRemoveDuration => ', weekStart);
    removeMutation({
      variables: {
        startTime: weekStart,
        endTime: moment(weekStart).add(1, 'week'),
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

  if (!data || loading) return null;
  return (
    <Spin spinning={!data || loading}>
      <TabularCalendar
        weekStart={weekStart}
        setWeekStart={setWeekStart}
        records={filterEvents(data?.getDurationTimeRecords)}
        projects={projects}
        handleRemoveDuration={handleRemoveDuration}
        createTimeRecord={createTimeRecord}
        updateTimeRecord={updateTimeRecord}
      />
    </Spin>
  );
};

const styles: { [property: string]: (props) => CSSProperties } = {
  root: props => ({
    display: 'block',
    '& .table-footer': {
      display: 'flex',
      flexDirection: 'row',
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
