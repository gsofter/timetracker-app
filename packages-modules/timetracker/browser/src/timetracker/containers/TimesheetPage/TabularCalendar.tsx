import React, { CSSProperties, ReactNode, useEffect, useState } from 'react';
import { Table, Row, Col, Button, Input, Spin, Select, message, Dropdown, Menu } from 'antd';
import moment, { Moment } from 'moment';
import { useFela } from 'react-fela';
import cls from 'classnames';
import { ITimeRecord, ITimeRecordRequest } from '@admin-layout/timetracker-module-core';
import { TimesheetInput } from '../../components/TimesheetInput';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import {
  useGetDurationTimeRecordsQuery,
  useRemoveDurationTimeRecordsMutation,
  useUpdateTimeRecordMutation,
  useCreateTimeRecordMutation,
} from '../../../generated-models';
import { formatDuration } from '../../services/timeRecordService';

interface IProject {
  projectId: string;
  projectTitle: string;
}

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
  const [headerColumns, setHeaderColumns] = useState([]);
  const { css } = useFela();
  const [data, setData] = useState([]);
  const [trackedProjects, setTrackedProjects] = useState([]);
  const [newRows, setNewRows] = useState([]);
  useEffect(() => {
    const trackedProjects = projects.filter(
      p => records.findIndex(e => e.projectId === p.projectId) !== -1,
    );
    setTrackedProjects(trackedProjects);

    const rows = newRows.filter(pId => trackedProjects.findIndex(p => p.projectId === pId) === -1);
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
    const pRecords = records.filter(r => r.projectId === projectId);
    let totalDur = 0;
    pRecords.forEach(pr => {
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

  const projectDropdownMenus = (
    <Menu className={css(styles.projectDown)}>
      {projects
        .filter(
          p =>
            trackedProjects.findIndex(tp => tp.projectId === p.projectId) === -1 &&
            newRows.findIndex(pId => pId === p.projectId) === -1,
        )
        .map(pr => {
          return (
            <Menu.Item key={pr.projectId} onClick={() => handleSelectNewProject(pr.projectId)}>
              {pr.projectTitle}
            </Menu.Item>
          );
        })}
    </Menu>
  );
  return (
    <div>
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
                <td> {p.projectTitle}</td>
                {Array(7)
                  .fill(0)
                  .map((val, index) => {
                    const curDay = moment(weekStart).add(index, 'day');
                    const curDayRecords = records.filter(
                      r =>
                        r.projectId === p.projectId &&
                        moment(r.startTime).format('YYYY-MM-DD') === curDay.format('YYYY-MM-DD'),
                    );
                    return (
                      <td key={curDay.format('YYYY-MM-DD')}>
                        <TimesheetInput
                          dateStr={curDay.format('YYYY-MM-DD')}
                          projectId={p.projectId}
                          records={curDayRecords}
                          createTimeRecord={createTimeRecord}
                          updateTimeRecord={updateTimeRecord}
                        />
                      </td>
                    );
                  })}
                <td> {formatDuration(getProjectTotalDuration(p.projectId))}</td>
                <td>
                  <Button
                    icon={<CloseOutlined />}
                    onClick={() => handleRemoveDuration(p.projectId)}
                  />
                </td>
              </tr>
            );
          })}
          {newRows.map(pId => {
            const project = projects.find(p => p.projectId === pId);
            return (
              <tr>
                <td> {project.projectTitle}</td>
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
                        />
                      </td>
                    );
                  })}
                <td>
                  <Button icon={<CloseOutlined />} onClick={event => handleRemoveNewRow(pId)} />
                </td>
              </tr>
            );
          })}
          <tr>
            <td>
              <Dropdown overlay={projectDropdownMenus} trigger={['click']}>
                <Button icon={<PlusOutlined />}> Select Project</Button>
              </Dropdown>
            </td>
          </tr>
          <tr>
            <td> Total </td>
            <td> 00:00 </td>
            <td> 00:00 </td>
            <td> 00:00 </td>
            <td> 00:00 </td>
            <td> 00:00 </td>
            <td> 00:00 </td>
            <td> 00:00 </td>
            <td> 00:00 </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const TabularCalendarWrapper = ({ projects }) => {
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
  }),
};

export default TabularCalendarWrapper;
