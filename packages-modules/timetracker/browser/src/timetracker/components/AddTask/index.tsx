import React, { useContext, useEffect, useState } from 'react';
import { useFela } from 'react-fela';
import _, { parseInt, range } from 'lodash';
import {
  PlusCircleOutlined,
  TagOutlined,
  StopFilled,
  CloseOutlined,
  ClockCircleOutlined,
  BarsOutlined,
} from '@ant-design/icons';
import {
  ITimeRecord,
  ITimeRecordRequest,
  IProjects as IProject,
} from '@admin-layout/timetracker-core';
import {
  Input,
  Button,
  Typography,
  Row,
  Col,
  Dropdown,
  Menu,
  Select,
  DatePicker,
  TimePicker,
} from 'antd';
import CSS from 'csstype';
import Timer from 'react-compound-timer';
import moment from 'moment';
import BillableCheck from '../BillableCheck';
import classNames from 'classnames';
import { formatDuration } from '../../services/timeRecordService';
import { TRACKER_MODE } from '../../containers/MainPage';
import DurationInput from '../DurationInput';
import momentZ from 'moment-timezone';

const { RangePicker } = TimePicker;
const { Title } = Typography;

export interface IAddTask {
  currentTimeRecord: ITimeRecord;
  timer: any;
  isRecording: boolean;
  projects: IProject[];
  mode: TRACKER_MODE;
  setMode: Function;
  createTimeRecord: (ITimeRecordRequest) => void;
  handleStart: () => void;
  handleStop: () => void;
  setCurrentTimeRecord: Function;
  removePlayingTimeRecord: Function;
}

const formatDurationInput = (dur: string) => {
  let arr = dur.split(':').map(d => parseInt(d, 10));

  if (arr[2] > 59) arr[2] = 59;
  if (arr[1] > 59) arr[1] = 59;

  const totalSeconds = arr[0] * 3600 + arr[1] * 60 + arr[0];
  return formatDuration(totalSeconds);
};

export const AddTask: React.FC<IAddTask> = (props: IAddTask) => {
  const {
    isRecording,
    currentTimeRecord,
    projects,
    mode,
    setMode,
    handleStart,
    handleStop,
    setCurrentTimeRecord,
    removePlayingTimeRecord,
    createTimeRecord,
  } = props;
  const { css } = useFela(props);
  const [manualStart, setManualStart] = useState(moment());
  const [manualEnd, setManualEnd] = useState(moment());
  const [manualDur, setManualDur] = useState(moment().format('HH:mm:ss'));
  const handleTaskChange = event => {
    event.preventDefault();
    setCurrentTimeRecord({ ...currentTimeRecord, taskName: event.target.value });
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

  const handleDiscard = event => {
    removePlayingTimeRecord();
  };

  const handleChangeMode = m => {
    setMode(m);
  };

  const handleChangeRange = (range, str) => {
    const start = range[0];
    const end = range[1];
    setManualStart(start);
    setManualEnd(end);
    const timeDiff = (end.valueOf() - start.valueOf()) / 1000;
    setManualDur(formatDuration(timeDiff));
  };

  const handleChangeDurDate = date => {
    console.log('handleChangeDurDate.date =>', date);
  };

  const handleChangeDur = duration => {
    console.log();
    setManualEnd(moment(manualStart).add(duration, 'seconds'));
  };

  const handleAddManual = () => {
    const newRecordReq: ITimeRecordRequest = {
      startTime: manualStart,
      endTime: manualEnd,
      isBillable: currentTimeRecord.isBillable,
      taskName: currentTimeRecord.taskName,
      // totalTime: Math.floor((manualEnd.valueOf() - manualStart.valueOf()) / 1000),
      projectId: currentTimeRecord.projectId,
    };

    createTimeRecord(newRecordReq);
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
          {projects.map(p => (
            <Select.Option key={p.id} value={p.id}>
              {p.name}
            </Select.Option>
          ))}
        </Select>
      </Menu.Item>
    </Menu>
  );

  const discardConfirmOverlay = (
    <div>
      Are you sure to Discard?
      <Button type="primary" onClick={handleDiscard}>
        Discard
      </Button>
    </div>
  );
  return (
    <div className={css(styles.timeTracker)}>
      <Row>
        <Col span={24} xxl={12} className="input">
          <Row style={{ width: '100%' }}>
            <Col span={18} className="flex-center">
              <Input
                placeholder="What are you working on?"
                size="large"
                value={currentTimeRecord.taskName}
                onChange={handleTaskChange}
              />
            </Col>
            <Col span={6} className="flex-center project-selection">
              <Dropdown overlay={projectDropdownMenus} trigger={['click']}>
                <Button
                  icon={
                    currentTimeRecord.projectId === '' ? <PlusCircleOutlined /> : <BarsOutlined />
                  }
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
        <Col span={24} xxl={12} className="control">
          <Row style={{ width: '100%' }}>
            <Col span={2} sm={4} xxl={2} className="flex-center">
              <Dropdown overlay={tagsOverlay} trigger={['click']}>
                <Button icon={<TagOutlined />} size="large"></Button>
              </Dropdown>
            </Col>
            <Col span={2} sm={4} xxl={2} className={classNames(css(styles.billing), 'flex-center')}>
              <BillableCheck
                checked={currentTimeRecord.isBillable}
                onChange={handleChangeBillable}
              />
            </Col>

            {mode === TRACKER_MODE.TRACK ? (
              <>
                <Col span={14} sm={10} xxl={14} className="flex-center">
                  <Title level={5} style={{ marginBottom: '0px' }}>
                    <Timer.Hours formatValue={val => `${val < 10 ? `0${val}` : val}`} />:
                    <Timer.Minutes formatValue={val => `${val < 10 ? `0${val}` : val}`} />:
                    <Timer.Seconds formatValue={val => `${val < 10 ? `0${val}` : val}`} />
                  </Title>
                </Col>

                <Col span={5} sm={5}>
                  <div
                    className={classNames(
                      'start',
                      { hidden: isRecording },
                      { 'flex-end': !isRecording },
                    )}
                  >
                    <Button type="primary" onClick={handleStart}>
                      START
                    </Button>
                  </div>
                  <div
                    className={classNames(
                      'start',
                      { hidden: !isRecording },
                      { 'flex-end': isRecording },
                    )}
                  >
                    <Button type="primary" danger onClick={handleStop}>
                      STOP
                    </Button>
                  </div>
                </Col>

                <Col span={1} className={classNames({ hidden: !isRecording })}>
                  <Dropdown overlay={discardConfirmOverlay} trigger={['click']}>
                    <Button icon={<CloseOutlined />}></Button>
                  </Dropdown>
                </Col>
              </>
            ) : (
              <>
                <Col span={16} sm={6} xxl={10} className="flex-row flex-center">
                  <RangePicker
                    format="HH:mm"
                    defaultValue={[moment(), moment()]}
                    bordered={false}
                    onChange={handleChangeRange}
                    value={[manualStart, manualEnd]}
                  />
                  <DatePicker
                    defaultValue={moment()}
                    bordered={false}
                    onChange={handleChangeDurDate}
                    format="yyyy-MM-dd"
                  />
                </Col>
                <Col span={0} sm={6} className="duration">
                  <div className="flex-center">
                    {/* <TimeField
                      value={manualDur.format('HH:mm:ss')}
                      format="HH:mm:ss"
                      onChange={handleChangeDur}
                    ></TimeField> */}
                    <DurationInput
                      duration={Math.floor(
                        (moment(manualEnd).valueOf() - moment(manualStart).valueOf()) / 1000,
                      )}
                      onChange={handleChangeDur}
                    />
                  </div>
                </Col>
                <Col span={3} className="flex-center">
                  <Button type="primary" size="small" onClick={handleAddManual}>
                    ADD
                  </Button>
                </Col>
              </>
            )}
            <Col span={1}>
              <div className={classNames('mode', { hidden: isRecording }, 'flex-col')}>
                <ClockCircleOutlined
                  className={classNames({ selected: mode === TRACKER_MODE.TRACK })}
                  onClick={() => handleChangeMode(TRACKER_MODE.TRACK)}
                />
                <BarsOutlined
                  className={classNames({ selected: mode === TRACKER_MODE.MANUAL })}
                  onClick={() => handleChangeMode(TRACKER_MODE.MANUAL)}
                />
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
      '& .project-selection': {
        overflow: 'hidden',
      },
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
        padding: '5px 0px',
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
      '& .duration': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (max-width: 576px)': {
          display: 'none',
        },
      },
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
    '& .flex-center': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '& .flex-end': {
      display: 'flex',
      justifyContent: 'end',
      alignItems: 'center',
    },
    '& .mode': {
      width: '30px',
    },
    '& .mode .selected': {
      color: '#1890ff',
      border: '1px solid #1890ff',
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
