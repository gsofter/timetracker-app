import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useFela } from 'react-fela';
import { PlusCircleOutlined, TagOutlined, CloseOutlined, ClockCircleOutlined, BarsOutlined } from '@ant-design/icons';
import { ITimeRecord, ITimeRecordRequest, IProjects as IProject } from '@admin-layout/timetracker-core';
import { Input, Button, Row, Col, Dropdown, Menu, Select, DatePicker, TimePicker } from 'antd';
import CSS from 'csstype';
import moment from 'moment';
import BillableCheck from '../BillableCheck';
import classNames from 'classnames';
import { TRACKER_MODE } from '../../constants';
import DurationInput from '../DurationInput';
import { Moment } from 'moment';
import { useSelector } from 'react-redux';
import { useTimeformat } from '../../hooks';
import { TimerComponent } from './TimerComponent';
import * as _ from 'lodash';
const { Option } = Select;
const { RangePicker } = TimePicker;

export interface ITimeTracker {
  currentTimeRecord: ITimeRecord;
  timer: any;
  isRecording: boolean;
  projects: IProject[];
  mode: TRACKER_MODE;
  weekStart: Moment;
  disable: boolean;
  setMode: Function;
  handleStart: (desc?: string) => void;
  handleStop: () => void;
  createTimeRecord: (ITimeRecordRequest) => void;
  removePlayingTimeRecord: Function;
  updatePlayingTimeRecord: (record: ITimeRecord, debounce?: boolean) => void;
  setCurrentTimeRecord: Function;
}

export const TimeTracker: React.FC<ITimeTracker> = (props: ITimeTracker) => {
  const {
    isRecording,
    currentTimeRecord,
    projects,
    mode,
    disable,
    setMode,
    handleStart,
    handleStop,
    removePlayingTimeRecord,
    createTimeRecord,
    updatePlayingTimeRecord,
    setCurrentTimeRecord,
  } = props;
  const { css } = useFela(props);
  const { timeFormat, dateFormat } = useTimeformat();
  const userId = useSelector<any>((state) => state.user.auth0UserId) as string;
  const [manualStart, setManualStart] = useState(moment());
  const [manualEnd, setManualEnd] = useState(moment());
  const [description, setDescription] = useState(currentTimeRecord.description ?? '');

  useEffect(() => {
    setDescription(currentTimeRecord.description);
  }, [currentTimeRecord.description]);

  const debouncedFunc = useMemo(
    () =>
      _.debounce((value) => {
        updatePlayingTimeRecord({ ...currentTimeRecord, taskName: value, description: value });
      }, 800),
    [currentTimeRecord],
  );

  const handleChangeDescription = useCallback(
    (e) => {
      e.persist();
      setDescription(e.target.value);
      debouncedFunc(e.target.value);
    },
    [debouncedFunc],
  );

  const handleSelectProject = (projectId) => {
    updatePlayingTimeRecord({ ...currentTimeRecord, projectId: projectId });
  };

  const handleChangeBillable = () => {
    updatePlayingTimeRecord({ ...currentTimeRecord, isBillable: !currentTimeRecord.isBillable });
  };

  const handleTagsChange = (value) => {
    updatePlayingTimeRecord({ ...currentTimeRecord, tags: value });
  };

  const handleDiscard = (event) => {
    removePlayingTimeRecord();
  };

  const handleChangeMode = (m) => {
    setMode(m);
  };

  const handleChangeRange = (range, str) => {
    const start = range[0];
    const end = range[1];
    setManualStart(start);
    setManualEnd(end);
  };

  const handleChangeDurDate = (date) => {
    console.log('handleChangeDurDate.date =>', date);
  };

  const handleChangeDur = (duration) => {
    setManualEnd(moment(manualStart).add(duration, 'seconds'));
  };

  const handleAddManual = () => {
    const newRecordReq: ITimeRecordRequest = {
      userId: userId,
      startTime: manualStart,
      endTime: manualEnd,
      isBillable: currentTimeRecord.isBillable,
      taskName: currentTimeRecord.taskName,
      description: currentTimeRecord.description,
      projectId: currentTimeRecord.projectId,
    };
    createTimeRecord(newRecordReq);
  };
  // Dropdown overlay for project select
  const projectDropdownMenus = (
    <Menu className={css(styles.projectDown)}>
      {projects.map((project) => {
        return (
          <Menu.Item
            key={project.id}
            className={classNames({ selected: currentTimeRecord.projectId === project.id })}
            onClick={() => handleSelectProject(project.id)}
          >
            {project.name}

            <Button onClick={(event) => event.stopPropagation()}> Create Task </Button>
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              onChange={() => { }}
              onClick={(event) => event.stopPropagation()}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  // Dropdown for tags
  const tagsOverlay = (
    <Menu>
      <Menu.Item key={1}>
        <Select mode="tags" style={{ width: '100%' }} onChange={handleTagsChange} tokenSeparators={[',']}>
          {projects.map((p) => (
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
                value={description}
                onChange={handleChangeDescription}
              />
            </Col>
            <Col span={6} className="flex-center project-selection">
              <Dropdown overlay={projectDropdownMenus} trigger={['click']}>
                <Button
                  icon={currentTimeRecord.projectId === '' ? <PlusCircleOutlined /> : <BarsOutlined />}
                  style={currentTimeRecord.projectId === '' ? {} : { color: 'green' }}
                >
                  {currentTimeRecord.projectId === ''
                    ? 'Projects'
                    : projects.find((p) => p.id === currentTimeRecord.projectId)?.name}
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
              <BillableCheck checked={currentTimeRecord.isBillable} onChange={handleChangeBillable} />
            </Col>

            {mode === TRACKER_MODE.TRACK ? (
              <>
                <Col span={14} sm={10} xxl={14} className="flex-center">
                  <TimerComponent />
                </Col>

                <Col span={5} sm={5}>
                  <div className={classNames('start', { hidden: isRecording }, { 'flex-end': !isRecording })}>
                    <Button type="primary" onClick={() => handleStart(description)} disabled={disable}>
                      START
                    </Button>
                  </div>
                  <div className={classNames('start', { hidden: !isRecording }, { 'flex-end': isRecording })}>
                    <Button type="primary" danger onClick={handleStop} disabled={disable}>
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
                      format={timeFormat}
                      defaultValue={[moment(), moment()]}
                      bordered={false}
                      onChange={handleChangeRange}
                      value={[manualStart, manualEnd]}
                    />
                    <DatePicker
                      defaultValue={moment()}
                      bordered={false}
                      onChange={handleChangeDurDate}
                      format={dateFormat}
                    />
                  </Col>
                  <Col span={0} sm={6} className="duration">
                    <div className="flex-center">
                      <DurationInput
                        duration={Math.floor((moment(manualEnd).valueOf() - moment(manualStart).valueOf()) / 1000)}
                        onChange={handleChangeDur}
                      />
                    </div>
                  </Col>
                  <Col span={3} className="flex-center">
                    <Button type="primary" size="small" onClick={handleAddManual} disabled={disable}>
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
interface IProjectDropdownMenuProps {
  projects?: IProject[];
  handleSelectProject: Function;
}
const ProjectDropdownMenu: React.FC<IProjectDropdownMenuProps> = ({ projects, handleSelectProject }) => {
  const { css } = useFela();
  return (
    <Menu className={css(styles.projectDown)}>
      {projects.map((project) => {
        return (
          <Menu.Item key={project.id} onClick={() => handleSelectProject(project.id)}>
            <Row>
              <Col xs={12}>{project.name}</Col>
              <Col xs={12}>
                <Button onClick={(event) => event.stopPropagation()}> Create Task </Button>
                <Select
                  defaultValue="lucy"
                  style={{ width: 120 }}
                  onChange={() => { }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Col>
            </Row>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

const styles: { [key: string]: (obj) => CSS.Properties } = {
  timeTracker: ({ theme }) => ({
    padding: '5px 10px',
    border: '1px solid #eee',
    backgroundColor: '#fff',
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
