import React, { useState } from 'react';
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
import { ITimeRecord } from '@admin-layout/timetracker-module-core';
const { RangePicker } = TimePicker;
import CSS from 'csstype';
import {
  PlusCircleOutlined,
  TagOutlined,
  CalendarOutlined,
  CaretRightOutlined,
  MoreOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
const { Title } = Typography;
<<<<<<< HEAD
=======
import * as _ from 'lodash';
import debounce from '../../services/debouce';
import { formatDuration } from '../../services/timeRecordService';

>>>>>>> 00819a9571016ebe7ad0a3fd6d9ca0f36b7fc1f5
export interface ITaskList {
  timeRecord?: ITimeRecord;
  timeRecords: [ITimeRecord];
  removeTimeRecord: (recordId: string) => void;
}

export const TaskListItem: React.FC<ITaskList> = (props: ITaskList) => {
  const { removeTimeRecord } = props;
  const { css } = useFela(props);
  const { timeRecord } = props;
  const [selectedProject, setSelectedProject] = useState('');
  const projects = [
    { id: '1', name: 'Project1' },
    { id: '2', name: 'Project2' },
  ];
  const debounceTimeLimit = 800;

  const handleSelectProject = (projectId: string) => {
    setSelectedProject(projectId);
  };

<<<<<<< HEAD
  const projectPopRender = projects.map(project => {
    return (
      <div className={classNames({ selected: selectedProject === project.id })}>
        <a onClick={() => handleSelectProject(project.id)}>{project.name}</a>
      </div>
    );
  });

  const formatDuration = (seconds: number) => {
    const hour = Math.floor(seconds / 3600);
    const minute = Math.floor((seconds % 3600) / 60);
    const second = seconds % 60;
    const format = (num: number) => (num < 10 ? '0' + num : num.toString());
    return format(hour) + ':' + format(minute) + ':' + format(second);
  };

=======
>>>>>>> 00819a9571016ebe7ad0a3fd6d9ca0f36b7fc1f5
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

<<<<<<< HEAD
=======
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

>>>>>>> 00819a9571016ebe7ad0a3fd6d9ca0f36b7fc1f5
  return (
    <div className={css(styles.timeRecord)}>
      <Row>
        <Col sm={24} md={24} lg={12} className="input">
          <Input placeholder="What are you working on?" size="large" value={timeRecord.task} />
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
            <Checkbox checked={timeRecord.isBillable}>Billing</Checkbox>
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
      '& .total-time': {
        width: '100px',
      },
      '& .more': {
        padding: '0px',
        marginRight: '-10px',
        marginLeft: '-10px',
      },
    },
  }),
};
