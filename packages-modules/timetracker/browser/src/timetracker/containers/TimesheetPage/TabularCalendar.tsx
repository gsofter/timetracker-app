import React, { CSSProperties, ReactNode, useEffect, useState } from 'react';
import { Table, Row, Col, Button, Input } from 'antd';
import moment, { Moment } from 'moment';
import { useFela } from 'react-fela';
import cls from 'classnames';
import { ITimeRecord } from '@admin-layout/timetracker-module-core';
import { TimesheetInput } from '../../components/TimesheetInput';

interface IProject {
  projectId: string;
  projectTitle: string;
}

interface ITabularCalendar {
  events: [ITimeRecord];
  projects: Array<IProject>;
}

const generateWeekHeaderColumnItem = (date: Moment, clsName) => {
  const isToday = date.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');
  return {
    title: (
      <div className={clsName}>
        <div className={cls('day', { today: isToday })}>
          <span>{date.format('DD')}</span>
        </div>
        <div className="extra">
          <div className="week">
            <span>{date.format('ddd')}</span>
          </div>
          <div className="month">
            <span>{date.format('MMM')}</span>
          </div>
        </div>
      </div>
    ),
    dataIndex: date.format('YYYY-MM-DD'),
    key: date.format('YYYY-MM-DD'),
    align: 'center',
    render: (workDur, record, index) => {
      return workDur === 0 && record.key !== 'all' ? (
        <TimesheetInput />
      ) : record.key === 'all' ? (
        <span style={{ fontWeight: 'bold' }}>
          {moment.duration(workDur).hours()}:{moment.duration(workDur).minutes()}:
          {moment.duration(workDur).seconds()}
        </span>
      ) : (
        <TimesheetInput workDur={workDur} />
      );
    },
    // render: ({ text }) => <div> {text} </div>,
  };
};

const TabularCalendar = ({ events, projects }: ITabularCalendar) => {
  const [weekStart, setWeekStart] = useState(
    moment()
      .startOf('week')
      .add(1, 'day')
      .valueOf(),
  );
  const [headerColumns, setHeaderColumns] = useState([]);
  const { css } = useFela();
  const [data, setData] = useState([]);
  useEffect(() => {
    // add date header columns
    const newHeaderColumns: Array<{
      title: ReactNode;
      key: string;
      dataIndex: string;
      render?: Function;
      align: string;
      fixed?: string;
    }> = Array(7)
      .fill(0)
      .map((value, index) => {
        return generateWeekHeaderColumnItem(
          moment(weekStart).add(index, 'day'),
          css(styles.dateHeader),
        );
      });

    let demoData = projects.map(p => {
      let res = {
        key: p.projectId,
        projectTitle: p.projectTitle,
        total: 0,
      };
      for (let weekDay of [0, 1, 2, 3, 4, 5, 6]) {
        const weekDayStr = moment(weekStart)
          .add(weekDay, 'day')
          .format('YYYY-MM-DD');
        res[weekDayStr] = 0;
      }
      return res;
    });

    const weekEnd = moment(weekStart)
      .add(7, 'day')
      .valueOf();
    for (let ev of events) {
      // skip for the event outside of current week
      if (ev.startTime > moment(weekEnd) || ev.endTime < moment(weekStart)) continue;
      const evStartVal = ev.startTime.valueOf();
      const evEndVal = ev.endTime.valueOf();

      for (let h of newHeaderColumns) {
        const dayStartVal = moment(h.dataIndex).valueOf();
        const dayEndVal = moment(h.dataIndex)
          .add(1, 'day')
          .valueOf();
        // skip for the event outside of current day
        if (evStartVal > dayEndVal || evEndVal < dayStartVal) continue;

        const workStart = Math.max(dayStartVal, evStartVal);
        const workEnd = Math.min(dayEndVal, evEndVal);
        const workDur = workEnd - workStart;
        const demoDataId = demoData.findIndex(d => d.key === ev.projectId);
        demoData[demoDataId][h.dataIndex] += workDur;
        demoData[demoDataId].total += workDur;
      }
    }

    // add row for 'All'
    let allRowData = {
      key: 'all',
      projectTitle: 'All',
      total: 0,
    };
    for (let h of newHeaderColumns) {
      let hSumWorkHours = 0;
      for (let i = 0; i < demoData.length; i++) {
        hSumWorkHours += demoData[i][h.dataIndex];
      }
      allRowData[h.dataIndex] = hSumWorkHours;
      allRowData.total += hSumWorkHours;
    }

    demoData.unshift(allRowData);

    // add column for 'ProjectTitle'
    newHeaderColumns.unshift({
      title: <div> &nbsp; </div>,
      dataIndex: 'projectTitle',
      key: 'projectTitle',
      align: 'center',
    });

    // add column for 'total'
    newHeaderColumns.push({
      title: <div> Total </div>,
      dataIndex: 'total',
      key: 'total',
      align: 'center',
      render: (workDur, record, index) => {
        return (
          <span
            style={
              record.key === 'all' ? { fontWeight: 'bold', color: 'green' } : { fontWeight: 'bold' }
            }
          >
            {moment.duration(workDur).hours()}:{moment.duration(workDur).minutes()}:
            {moment.duration(workDur).seconds()}
          </span>
        );
      },
    });
    setHeaderColumns(newHeaderColumns);
    setData(demoData);
  }, [weekStart]);

  const onClickBack = event => {
    const newWeekStart = moment(weekStart)
      .add('-1', 'week')
      .valueOf();
    setWeekStart(newWeekStart);
  };

  const onClickNext = event => {
    const newWeekStart = moment(weekStart)
      .add('1', 'week')
      .valueOf();
    setWeekStart(newWeekStart);
  };

  const onClickToday = event => {
    const newWeekStart = moment()
      .startOf('week')
      .add(1, 'day')
      .valueOf();
    setWeekStart(newWeekStart);
  };

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
      <Table
        columns={headerColumns}
        dataSource={data}
        bordered
        pagination={false}
        scroll={{ x: '100%' }}
      ></Table>
    </div>
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
};

export default TabularCalendar;
