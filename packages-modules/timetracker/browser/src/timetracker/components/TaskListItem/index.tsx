import React, { useState, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { useFela } from 'react-fela';
import {
  DatePicker,
  Space,
  Popconfirm,
  Button,
  TimePicker,
  Row,
  Col,
  Input,
  Popover,
  Checkbox,
  Typography,
  Dropdown,
  Menu,
} from 'antd';
import { ITimeRecord, ITimeRecordRequest } from '@admin-layout/timetracker-module-core';
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

export interface ITaskList {
  timeRecord?: ITimeRecord;
  timeRecords: [ITimeRecord];
  removeTimeRecord: (recordId: string) => void;
  updateTimeRecord: (recordId: string, request: ITimeRecordRequest) => void;
}

export const TaskListItem: React.FC<ITaskList> = (props: ITaskList) => {
  const { removeTimeRecord, timeRecord, updateTimeRecord } = props;
  const { css } = useFela(props);
  const [selectedProject, setSelectedProject] = useState(timeRecord.projectId ?? '');
  const [taskName, setTaskName] = useState(timeRecord.task ?? '');
  const [isBillable, setIsBillable] = useState(timeRecord.isBillable);
  const projects = [
    { id: '1', name: 'AAA' },
    { id: '2', name: 'BBB' },
  ];
  const debounceTimeLimit = 800;

  const handleSelectProject = (projectId: string) => {
    const request = { projectId };
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
        const request = { task: value };
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
    setIsBillable(event.target.checked);
    updateTimeRecord(timeRecord.id, { isBillable: event.target.checked });
  };

  return (
    <div className={css(styles.timeRecord)}>
      <Row>
        <Col sm={24} md={24} lg={12} className="input">
          <Input
            placeholder="What are you working on?"
            size="large"
            value={taskName}
            onChange={handleChangeTask}
            style={{ width: '80%' }}
          />
          <Dropdown overlay={projectDropdownMenus} trigger={['click']}>
            <Button
              icon={selectedProject === '' ? <PlusCircleOutlined /> : <BarsOutlined />}
              size="large"
              style={
                selectedProject === ''
                  ? { marginLeft: '20px', width: '20%', textAlign: 'left' }
                  : { marginLeft: '20px', width: '20%', textAlign: 'left', color: 'green' }
              }
            >
              {selectedProject === ''
                ? 'Projects'
                : projects.find(p => p.id === selectedProject)?.name}
            </Button>
          </Dropdown>
        </Col>
        <Col sm={24} md={24} lg={12} className="control">
          <div className="tag">
            <Button icon={<TagOutlined />} size="large"></Button>
          </div>
          <span className="divider" />
          <div className="billable">
            <Checkbox checked={isBillable} onChange={handleChangeBillable}>
              Billing
            </Checkbox>
          </div>
          <span className="divider" />
          <div className="time-display">
            <Title level={5}>
              {moment(timeRecord.start).format('HH:mm A')} -
              {moment(timeRecord.end).format('HH:mm A')}
            </Title>
          </div>
          <span className="divider" />
          <div className="total-time">
            <Title level={5}>{formatDuration(timeRecord.totalTime)}</Title>
          </div>
          <span className="divider" />
          <div>
            <Button type="primary" size="large" icon={<CaretRightOutlined />}></Button>
          </div>
          <div className="more">
            <Dropdown overlay={menus} trigger={['click']}>
              <Button icon={<MoreOutlined />} size="large"></Button>
            </Dropdown>
          </div>
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
    marginBottom: '5px',
    backgroundColor: 'white',
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
      '& .total-time': {
        width: '100px',
      },
      '& .more': {
        padding: '0px',
        marginRight: '-10px',
        marginLeft: '-10px',
      },
    },
    projectDown: ({ theme }) => ({
      display: 'block',
      '& .selected': {
        fontStyle: 'bold',
        color: 'red',
      },
    }),
  }),
};
