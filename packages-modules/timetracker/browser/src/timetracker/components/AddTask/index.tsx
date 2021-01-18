import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { ProjectsListPopup } from '../ProjectsListPopup';
import { Loading } from '../../components/Loading';
import { useFela } from 'react-fela';
import _ from 'lodash';
import { PlusCircleOutlined, TagOutlined, StopFilled } from '@ant-design/icons';
import { ITimeRecord, ITimeRecordRequest } from '@admin-layout/timetracker-module-core';
import { Input, Button, Checkbox, Typography, Row, Col, Popover, List } from 'antd';
import CSS from 'csstype';
import Timer from 'react-compound-timer';
import moment from 'moment';
const { Title } = Typography;

export interface IAddTask {
  createTimeRecord: (ITimeRecordRequest) => void;
}

export const AddTask: React.FC<IAddTask> = (props: IAddTask) => {
  const { createTimeRecord } = props;
  const { css } = useFela(props);
  const [isStart, setIsStart] = useState(false);
  const [startTime, setStartTime] = useState(null);
  // const [endTime, setEndTime] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [isBilling, setIsBilling] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const projects = [
    { id: '1', name: 'Project1' },
    { id: '2', name: 'Project2' },
  ];

  const resetTimerValues = () => {
    setIsStart(false);
    setStartTime(null);
    setTaskName('');
    setIsBilling(false);
    setSelectedProject('');
  };

  const handleTaskChange = event => {
    event.preventDefault();
    setTaskName(event.target.value);
  };

  const handleStart = () => {
    console.log('timer started!');
    setStartTime(moment());
    setIsStart(true);
  };

  const handleStop = (resetFn: Function, stopFn) => {
    const endTime = moment();
    const newTimeRecord: ITimeRecordRequest = {
      start: startTime,
      end: endTime,
      task: taskName,
      projectId: selectedProject,
      totalTime: Math.floor((endTime.valueOf() - startTime.valueOf()) / 1000),
      isBillable: isBilling,
    };
    createTimeRecord(newTimeRecord);
    setIsStart(false);
    resetFn();
    resetTimerValues();
    stopFn();
  };

  const handleSelectProject = projectId => {
    setSelectedProject(projectId);
  };

  const handleChangeBilling = event => {
    setIsBilling(event.target.checked);
  };

  const projectPopRender = projects.map(project => {
    return (
      <div className={classNames({ selected: selectedProject === project.id })}>
        <a onClick={() => handleSelectProject(project.id)}>{project.name}</a>
      </div>
    );
  });

  return (
    <Timer startImmediately={false} onStart={handleStart}>
      {({ start, resume, pause, stop, reset, timerState }) => (
        <div className={css(styles.timeTracker)}>
          <Row>
            <Col sm={24} md={24} lg={12} className="input">
              <Input
                placeholder="What are you working on?"
                size="large"
                onChange={handleTaskChange}
              />
              <Popover
                content={() => {
                  return (
                    <div className={css(styles.projectPopup)}>
                      <div className="project-list">{projectPopRender}</div>
                    </div>
                  );
                }}
                trigger="click"
              >
                <Button icon={<PlusCircleOutlined />} size="large" style={{ marginLeft: '20px' }}>
                  Projects
                </Button>
              </Popover>
            </Col>
            <Col sm={24} md={24} lg={12} className="control">
              <div className="tag">
                <Button icon={<TagOutlined />} size="large"></Button>
              </div>
              <span className="divider" />
              <div className="billable">
                <Checkbox checked={isBilling} onChange={handleChangeBilling}>
                  Billing
                </Checkbox>
              </div>
              <span className="divider" />
              <div className="time-display">
                <Title level={5} style={{ marginBottom: '0px' }}>
                  <Timer.Hours />: <Timer.Minutes />: <Timer.Seconds />
                </Title>
              </div>
              <span className="divider" />
              <div className={classNames('start', { hidden: isStart })}>
                <Button type="primary" size="large" onClick={start}>
                  START
                </Button>
              </div>
              <div className={classNames('start', { hidden: !isStart })}>
                <Button type="primary" danger size="large" onClick={() => handleStop(reset, stop)}>
                  STOP
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Timer>
  );
};

const styles: { [key: string]: (obj) => CSS.Properties } = {
  timeTracker: ({ theme }) => ({
    padding: '5px 10px',
    border: '1px solid #eee',
    borderRadius: '5px',
    marginBottom: '5px',
    '& .input': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    '& .control': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      '& div': {
        padding: '5px 10px',
      },
      '& .divider': {
        // marginTop: '5px',
        // marginBottom: '5px',
        borderLeft: '1px dashed #eee',
        height: '75%',
      },
      '& .hidden': {
        display: 'none',
      },
      '& .project-list': {
        fontStyle: 'bold',
        color: 'red',
      },
    },
  }),
  projectPopup: ({ theme }) => ({
    display: 'block',
    '& .project-list .selected a': {
      fontStyle: 'bold',
      color: 'red',
    },
  }),
};
