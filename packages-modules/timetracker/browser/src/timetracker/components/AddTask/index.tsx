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
import BillableCheck from '../BillableCheck';

const { Title } = Typography;

export interface IAddTask {
  createTimeRecord: (ITimeRecordRequest) => void;
  currentTimeRecord: ITimeRecord;
  handleStart: () => void;
  handleStop: () => void;
  setCurrentTimeRecord: Function;
  timer: any;
  isRecording: boolean;
}

export const AddTask: React.FC<IAddTask> = (props: IAddTask) => {
  const {
    timer,
    isRecording,
    currentTimeRecord,
    handleStart,
    handleStop,
    setCurrentTimeRecord,
  } = props;
  const { css } = useFela(props);
  const projects = [
    { id: '1', name: 'AAA' },
    { id: '2', name: 'BBB' },
  ];
  const { getTime } = timer;

  const handleTaskChange = event => {
    event.preventDefault();
    setCurrentTimeRecord({ ...currentTimeRecord, task: event.target.value });
  };

  const handleSelectProject = projectId => {
    setCurrentTimeRecord({ ...currentTimeRecord, projectId: projectId });
  };

  const handleChangeBillable = event => {
    setCurrentTimeRecord({ ...currentTimeRecord, isBillable: !currentTimeRecord.isBillable });
  };

  const handleTagsChange = value => {
    console.log('handleTagsChange.value =>', value);
  };

  // Dropdown overlay for project select
  const projectDropdownMenus = (
    <Menu className={css(styles.projectDown)}>
      {projects.map(project => {
        return (
          <Menu.Item
            key={project.id}
            className={classNames({ selected: currentTimeRecord.projectId === project.id })}
            onClick={() => handleSelectProject(project.id)}
          >
            {project.name}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  // Dropdown for tags
  const tagsOverlay = (
    <Menu>
      <Menu.Item key={1}>
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
    <div className={css(styles.timeTracker)}>
      <Row>
        <Col span={24} xl={12} className="input">
          <Row style={{ width: '100%' }}>
            <Col span={18} className="flex-center">
              <Input
                placeholder="What are you working on?"
                size="large"
                value={currentTimeRecord.task}
                onChange={handleTaskChange}
              />
            </Col>
            <Col span={6} className="flex-center">
              <Dropdown overlay={projectDropdownMenus} trigger={['click']}>
                <Button
                  icon={
                    currentTimeRecord.projectId === '' ? <PlusCircleOutlined /> : <BarsOutlined />
                  }
                  size="large"
                  style={currentTimeRecord.projectId === '' ? {} : { color: 'green' }}
                >
                  {currentTimeRecord.projectId === ''
                    ? 'Projects'
                    : projects.find(p => p.id === currentTimeRecord.projectId)?.name}
                </Button>
              </Dropdown>
            </Col>
          </Row>
        </Col>
        <Col span={24} xl={12} className="control">
          <Row style={{ width: '100%' }}>
            <Col span={4} className="flex-center">
              <Dropdown overlay={tagsOverlay} trigger={['click']}>
                <Button icon={<TagOutlined />} size="large"></Button>
              </Dropdown>
            </Col>
            <Col span={4} className={classNames(css(styles.billing), 'flex-center')}>
              <BillableCheck
                checked={currentTimeRecord.isBillable}
                onChange={handleChangeBillable}
              />
            </Col>
            <Col span={10} className="flex-center">
              <Title level={5} style={{ marginBottom: '0px' }}>
                <Timer.Hours formatValue={val => `${val < 10 ? `0${val}` : val}`} />:
                <Timer.Minutes formatValue={val => `${val < 10 ? `0${val}` : val}`} />:
                <Timer.Seconds formatValue={val => `${val < 10 ? `0${val}` : val}`} />
              </Title>
            </Col>
            <Col span={6}>
              <div
                className={classNames(
                  'start',
                  { hidden: isRecording },
                  { 'flex-center': !isRecording },
                )}
              >
                <Button type="primary" size="large" onClick={handleStart}>
                  START
                </Button>
              </div>
              <div
                className={classNames(
                  'start',
                  { hidden: !isRecording },
                  { 'flex-center': isRecording },
                )}
              >
                <Button type="primary" danger size="large" onClick={handleStop}>
                  STOP
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
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
      '& > div': {
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
    '& .flex-center': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
