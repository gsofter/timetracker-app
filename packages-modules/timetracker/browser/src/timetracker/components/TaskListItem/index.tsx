import React, { useState, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { useFela } from 'react-fela';
import { Button, TimePicker, Row, Col, Input, Typography, Dropdown, Menu } from 'antd';
import { ITimeRecord, ITimeRecordRequest, IProjects as IProject } from '@admin-layout/timetracker-module-core';

const { RangePicker } = TimePicker;
import CSS from 'csstype';
import {
  PlusCircleOutlined,
  TagOutlined,
  CalendarOutlined,
  CaretRightOutlined,
  MoreOutlined,
  DeleteOutlined,
  BarsOutlined,
} from '@ant-design/icons';
const { Title } = Typography;
import * as _ from 'lodash';
import debounce from '../../services/debounce';
import { formatDuration } from '../../services/timeRecordService';
import BillableCheck from '../BillableCheck';

export interface ITaskList {
  timeRecord?: ITimeRecord;
  timeRecords: [ITimeRecord];
  projects: IProject[];
  removeTimeRecord: (recordId: string) => void;
  updateTimeRecord: (recordId: string, request: ITimeRecordRequest) => void;
  handlePlayTimer: (timeRecord: ITimeRecord) => void;
}

const calcTotalTime = (startTime: string, endTime: string): number => {
  return Math.floor((moment(endTime).valueOf() - moment(startTime).valueOf()) / 1000);
};

export const TaskListItem: React.FC<ITaskList> = (props: ITaskList) => {
  const { removeTimeRecord, timeRecord, updateTimeRecord, handlePlayTimer } = props;
  const { css } = useFela(props);
  const [selectedProject, setSelectedProject] = useState(timeRecord.projectId ?? '');
  const [taskName, setTaskName] = useState(timeRecord.taskName ?? '');
  const [isBillable, setIsBillable] = useState(timeRecord.isBillable);
  const { projects } = props;
  const debounceTimeLimit = 800;

  const handleSelectProject = (projectId: string) => {
    const request = { ..._.omit(timeRecord, ['__typename', 'id']), projectId };
    updateTimeRecord(timeRecord.id, request);
    setSelectedProject(projectId);
  };

  const handleRemove = () => {
    removeTimeRecord(timeRecord.id);
  };

  const menus = (
    <Menu>
      {/* <Menu.Item key="duplicate"> Duplicate </Menu.Item> */}
      <Menu.Item key="remove" icon={<DeleteOutlined />} onClick={handleRemove}>
        Remove
      </Menu.Item>
    </Menu>
  );

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

  const debouncedFunc = useMemo(
    () =>
      debounce(value => {
        const request = { ..._.omit(timeRecord, ['__typename', 'id']), taskName: value };
        updateTimeRecord(timeRecord.id, request);
      }, debounceTimeLimit),
    [],
  );
  const handleChangeTask = useCallback(
    e => {
      e.persist();
      setTaskName(e.target.value);
      debouncedFunc(e.target.value);
    },
    [debouncedFunc],
  );

  const handleChangeBillable = event => {
    setIsBillable(!isBillable);
    updateTimeRecord(timeRecord.id, {
      ..._.omit(timeRecord, ['__typename', 'id']),
      isBillable: !timeRecord.isBillable,
    });
  };

  return (
    <div className={css(styles.timeRecord)}>
      <Row>
        <Col span={24} xl={12} className="input">
          <Row style={{ width: '100%' }}>
            <Col span={18}>
              <Input
                placeholder="What are you working on?"
                size="large"
                value={taskName}
                onChange={handleChangeTask}
              />
            </Col>
            <Col span={6} className="flex-end project-selection">
              <Dropdown overlay={projectDropdownMenus} trigger={['click']}>
                <Button
                  icon={selectedProject === '' ? <PlusCircleOutlined /> : <BarsOutlined />}
                  style={
                    selectedProject === ''
                      ? { textAlign: 'left' }
                      : { textAlign: 'left', color: 'green' }
                  }
                >
                  {selectedProject === ''
                    ? 'Projects'
                    : projects.find(p => p.id === selectedProject)?.name}
                </Button>
              </Dropdown>
            </Col>
          </Row>
        </Col>
        <Col span={24} xl={12} className="control">
          <Row style={{ width: '100%' }}>
            <Col span={2} className="flex-center">
              <Button icon={<TagOutlined />} size="large"></Button>
            </Col>
            <Col span={2} className="flex-center">
              <BillableCheck checked={isBillable} onChange={handleChangeBillable} />
            </Col>
            <Col span={14} sm={6} className="flex-center">
              <Title level={5}>
                {moment(timeRecord.startTime).format('HH:mm A')} &nbsp;
                {moment(timeRecord.endTime).format('HH:mm A')}
              </Title>
            </Col>
            <Col span={6} className="duration">
              <Title level={5}>
                {formatDuration(calcTotalTime(timeRecord.startTime, timeRecord.endTime))}
              </Title>
            </Col>
            <Col span={4} className="flex-end">
              <Button
                type="primary"
                size="large"
                icon={<CaretRightOutlined />}
                onClick={() => handlePlayTimer(timeRecord)}
              ></Button>
              <Dropdown overlay={menus} trigger={['click']}>
                <Button icon={<MoreOutlined />} size="large"></Button>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const styles: { [key: string]: (props) => CSS.Properties } = {
  timeRecord: theme => ({
    padding: '5px 10px',
    border: '1px solid #eee',
    borderRadius: '5px',
    backgroundColor: 'white',
    '& .project-selection': {
      overflow: 'hidden',
    },
    '& .input': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'start',
    },
    '& .control': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      '@media (max-width: 1200px)': {
        justifyContent: 'space-between',
        marginTop: '10px',
        borderTop: '1px solid #eee',
      },
      '@media (max-width: 768px)': {
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
      alignItems: 'center',
      '& > div': {
        padding: '5px 5px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        '@media (max-width: 768px)': {
          width: '100%',
          justifyContent: 'space-around',
        },
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
      '& .total-time': {
        width: '100px',
      },
      '& .more': {
        padding: '0px',
        marginRight: '-10px',
        marginLeft: '-10px',
      },
      '& .duration': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '@media(max-width: 576px)': {
          display: 'none',
        },
      },
    },
    '& .flex-center': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '& .flex-end': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    '& h5': {
      marginBottom: '0px',
      textAlign: 'center',
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
