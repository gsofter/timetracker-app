import classNames from 'classnames';
import React, { useContext, useState, useEffect } from 'react';
import { ProjectsListPopup } from '../ProjectsListPopup';
import { Loading } from '../../components/Loading';
import { useFela } from 'react-fela';
import _ from 'lodash';
import { PlusCircleOutlined, TagOutlined, StopFilled, PlayCircleFilled } from '@ant-design/icons';
import { ITimeRecord, ITimeRecordRequest } from '@admin-layout/timetracker-core';
import { Input, Button, Checkbox, Typography, Row, Col } from 'antd';
import CSS from 'csstype';
import Timer from 'react-compound-timer';
import { styleSheet } from './styles';
const { Title } = Typography;
export interface IAddTask {
  onChange?: any;
  vocabulary: any;
  showNotificationAction?: any;
  currentTimer: any;
  timerTick?: any;
  setCurrentTimer: any;
  setIsActive: any;
  resetTimer: any;
  task: string;
  setTask: any;
  currentDate: any;
  setCurrentDate: any;
  hour: any;
  minute: any;
  second: any;
  createTimeRecord: (ITimeRecordRequest) => void;
  timeRecords: [ITimeRecord];
}

export const AddTask: React.FC<IAddTask> = (props: IAddTask) => {
  const { css } = useFela(props);
  const [projectId, setProjectId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const {
    currentTimer,
    vocabulary,
    timerTick,
    showNotificationAction,
    setCurrentTimer,
    setIsActive,
    resetTimer,
    task,
    setTask,
    currentDate,
    setCurrentDate,
    createTimeRecord,
    timeRecords,
    hour,
    minute,
    second,
  } = props;

  const { v_add_your_task_name, v_jira_synchronization } = vocabulary;

  const startTimer = () => {
    setCurrentDate(new Date());
    setIsActive(true);
    const { v_a_task_name_before, v_a_starting, v_a_time_tracking } = vocabulary;
    if (task.trim()) {
      setIsUpdating(true);
      setCurrentTimer(timeRecords);
    } else {
      setTask('');
      showNotificationAction({
        text: `${v_a_task_name_before} ${v_a_starting} ${v_a_time_tracking}`,
        type: 'warning',
      });
    }
  };

  const stopTimer = () => {
    const { v_a_task_name_before, v_a_stopping, v_a_time_tracking } = vocabulary;
    if (task.trim()) {
      setIsUpdating(true);
      const newTimeRecord = {
        start: currentDate,
        end: new Date(),
        projectId: '03637823-d301-4ad5-a336-ea6af4b1d726',
        task: task,
      };
      createTimeRecord(newTimeRecord);
      setCurrentTimer(null);
      resetTimer();
      setTask('');
    } else {
      setTask('');
      showNotificationAction({
        text: `${v_a_task_name_before} ${v_a_stopping} ${v_a_time_tracking}`,
        type: 'warning',
      });
    }
  };

  const onChangeInput = event => {
    const value = event.target.value;
    setTask(value);

    if (currentTimer && value.trim() && currentTimer.task !== value.trim()) {
      setIsUpdating(true);
    }
  };

  const onChangeProject = id => {
    if (currentTimer) {
      setIsUpdating(true);
    } else {
      setProjectId(id);
    }
  };

  const [isStart, setIsStart] = useState(false);
  const handleStart = () => {
    console.log('timer started!');
    setIsStart(true);
  };

  const handleStop = () => {
    console.log('timer stoped!');
    setIsStart(false);
  };

  return (
    <div className={css(styleSheet.addTaskStyles as any)}>
      <React.Fragment>
        <div className={classNames('add-task')}>
          <input
            onFocus={event => (event.target.placeholder = '')}
            onBlur={event => (event.target.placeholder = v_add_your_task_name)}
            onKeyDown={event =>
              event.keyCode === 13 && !currentTimer && !isUpdating && startTimer()
            }
            type="text"
            value={task}
            onChange={onChangeInput}
            placeholder={v_add_your_task_name}
            className="add-task__input"
          />
          <ProjectsListPopup
            withFolder={true}
            disabled={isUpdating}
            onChange={onChangeProject}
            selectedProjectId={projectId}
          />
          <span className="add-task__duration">
            <span className="hours">{hour}</span>
            <span>:</span>
            <span className="minute">{minute}</span>
            <span>:</span>
            <span className="second">{second}</span>
          </span>
          <div>
            {currentTimer ? (
              <StopFilled className={classNames('add-task__stop-icon')} onClick={stopTimer} />
            ) : (
              <PlayCircleFilled
                className={classNames('add-task__play-icon')}
                onClick={startTimer}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

// const styles: { [key: string]: (obj) => CSS.Properties } = {
//   timeTracker: ({ theme }) => ({
//     padding: '5px 10px',
//     border: '1px solid #eee',
//     borderRadius: '5px',
//     marginBottom: '5px',
//     '& .input': {
//       display: 'flex',
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//     },
//     '& .control': {
//       display: 'flex',
//       flexDirection: 'row',
//       justifyContent: 'flex-end',
//       alignItems: 'center',
//       '& div': {
//         padding: '5px 10px',
//       },
//       '& .divider': {
//         // marginTop: '5px',
//         // marginBottom: '5px',
//         borderLeft: '1px dashed #eee',
//         height: '75%',
//       },
//       '& .hidden': {
//         display: 'none',
//       },
//     },
//   }),
// };
