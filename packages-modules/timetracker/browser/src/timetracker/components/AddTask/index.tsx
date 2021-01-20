import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { ProjectsListPopup } from '../ProjectsListPopup';
import { Loading } from '../../components/Loading';
import { useFela } from 'react-fela';
import _ from 'lodash';
import { PlusCircleOutlined, TagOutlined, StopFilled, BarsOutlined } from '@ant-design/icons';
import { ITimeRecord, ITimeRecordRequest } from '@admin-layout/timetracker-module-core';
import {
  Input,
  Button,
  Checkbox,
  Typography,
  Row,
  Col,
  Popover,
  Dropdown,
  Menu,
  Select,
} from 'antd';
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
    { id: '1', name: 'AAA' },
    { id: '2', name: 'BBB' },
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
    console.log('handleSelectProject.projectId =>', projectId);
    setSelectedProject(projectId);
  };

  const handleChangeBilling = event => {
    setIsBilling(event.target.checked);
  };

  // Dropdown overlay for project select
  const projectDropdownMenus = (
    <Menu className={css(styles.projectDown)}>
      {projects.map(project => {
        return (
          <Menu.Item
            key={project.id}
            className={classNames({ selected: selectedProject === project.id })}
            onClick={() => handleSelectProject(project.id)}
          >
            {project.name}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const handleTagsChange = value => {
    console.log('handleTagsChange.value =>', value);
  };

  // Dropdown for tags
  const tagsOverlay = (
    <Menu>
      <Menu.Item key={1}>
        {' '}
        <Select
          mode="tags"
          style={{ width: '100%' }}
          onChange={handleTagsChange}
          tokenSeparators={[',']}
        >
          <Select.Option key="1" value="1">
            AAAA
          </Select.Option>
          <Select.Option key="2" value="2">
            BBBB
          </Select.Option>
        </Select>
      </Menu.Item>
    </Menu>
  );
  return (
    <Timer startImmediately={false} onStart={handleStart}>
      {({ start, resume, pause, stop, reset, timerState }) => (
        <div className={css(styles.timeTracker)}>
          <Row>
            <Col sm={24} md={24} xl={12} className="input">
              <Row style={{ width: '100%' }}>
                <Col xs={24} sm={18}>
                  <Input
                    placeholder="What are you working on?"
                    size="large"
                    onChange={handleTaskChange}
                  />
                </Col>
                <Col xs={24} sm={6}>
                  <Dropdown overlay={projectDropdownMenus} trigger={['click']}>
                    <Button
                      icon={selectedProject === '' ? <PlusCircleOutlined /> : <BarsOutlined />}
                      size="large"
                      style={
                        selectedProject === ''
                          ? { marginLeft: '20px' }
                          : { marginLeft: '20px', color: 'green' }
                      }
                    >
                      {selectedProject === ''
                        ? 'Projects'
                        : projects.find(p => p.id === selectedProject).name}
                    </Button>
                  </Dropdown>
                </Col>
              </Row>
            </Col>
            <Col sm={24} md={24} xl={12} className="control">
              <Row style={{ width: '100%' }}>
                <Col xs={12} sm={4} md={4}>
                  <Dropdown overlay={tagsOverlay} trigger={['click']}>
                    <Button icon={<TagOutlined />} size="large"></Button>
                  </Dropdown>
                </Col>
                <Col xs={12} sm={4} md={4}>
                  <Checkbox checked={isBilling} onChange={handleChangeBilling}>
                    Billing
                  </Checkbox>
                </Col>
                <Col xs={24} sm={10} md={10} style={{ textAlign: 'center' }}>
                  <Title level={5} style={{ marginBottom: '0px' }}>
                    <Timer.Hours formatValue={val => `${val < 10 ? `0${val}` : val}`} />:
                    <Timer.Minutes formatValue={val => `${val < 10 ? `0${val}` : val}`} />:
                    <Timer.Seconds formatValue={val => `${val < 10 ? `0${val}` : val}`} />
                  </Title>
                </Col>
                <Col xs={24} sm={6} md={6}>
                  <div className={classNames('start', { hidden: isStart })}>
                    <Button type="primary" size="large" onClick={start}>
                      START
                    </Button>
                  </div>
                  <div className={classNames('start', { hidden: !isStart })}>
                    <Button
                      type="primary"
                      danger
                      size="large"
                      onClick={() => handleStop(reset, stop)}
                    >
                      STOP
                    </Button>
                  </div>
                </Col>
              </Row>
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
      '@media (max-width: 1200px)': {
        justifyContent: 'space-between',
        marginTop: '10px',
        borderTop: '1px solid #eee',
      },
      '& div': {
        padding: '5px 10px',
      },
      '& .divider': {
        // marginTop: '5px',
        // marginBottom: '5px',
        borderLeft: '1px dashed #eee',
        height: '75%',
      },
      '& .start button': {
        width: '100%',
        '@media (max-width: 575px)': {
          width: '100%',
        },
      },
      '& .hidden': {
        display: 'none',
      },
      '& .project-list': {
        fontStyle: 'bold',
        color: 'red',
      },
      '& .flex-col': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      '& .flex-row': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  }),
  projectDown: ({ theme }) => ({
    display: 'block',
    '& .selected': {
      fontStyle: 'bold',
      color: 'red',
    },
  }),
};
