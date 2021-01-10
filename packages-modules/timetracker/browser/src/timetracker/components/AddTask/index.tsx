import classNames from 'classnames';
import React, { useContext, useState, useEffect } from 'react';
import { ProjectsListPopup } from '../ProjectsListPopup';
import { Loading } from '../../components/Loading';
import { useFela } from 'react-fela';
import { stopTimerSocket, startTimerSocket, updateTimerSocket } from '../../configSocket';
import _ from 'lodash';
import { PlayCircleFilled, StopFilled } from '@ant-design/icons';
import { styleSheet } from './styles';

export interface IAddTask {
  onChange?: any;
  vocabulary: any;
  showNotificationAction?: any;
  currentTimer: any;
  timerTick?: any;
  setCurrentTimer: any;
  handleJiraSync: any;
  setIsActive: any;
  resetTimer: any;
  hour: any;
  minute: any;
  second: any;
  setTimeEntriesList: any;
  timeEntriesList: any[];
  issue: string;
  setIssue: any;
  currentDate: any;
  setCurrentDate: any;

}

export const AddTask: React.FC<IAddTask> = (props: any) => {
  const { css } = useFela(props);
  const [projectId, setProjectId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const {
    currentTimer,
    vocabulary,
    timerTick,
    isMobile,
    handleJiraSync,
    user,
    showNotificationAction,
    setCurrentTimer,
    setTimerTick,
    setIsActive,
    resetTimer,
    hour,
    minute,
    second,
    timeEntriesList,
    issue,
    setIssue,
    currentDate,
    setCurrentDate
  } = props;

  const { v_add_your_task_name, v_jira_synchronization } = vocabulary;

  const startTimer = () => {
    setCurrentDate(new Date());
    setIsActive(true);
    const { v_a_task_name_before, v_a_starting, v_a_time_tracking } = vocabulary;
    if (issue.trim()) {
      setIsUpdating(true);
      setCurrentTimer(timeEntriesList);
      startTimerSocket({
        issue,
        projectId,
      });
    } else {
      setIssue('');
      showNotificationAction({
        text: `${v_a_task_name_before} ${v_a_starting} ${v_a_time_tracking}`,
        type: 'warning',
      });
    }
  };

  const stopTimer = () => {
    const { v_a_task_name_before, v_a_stopping, v_a_time_tracking } = vocabulary;
    if (issue.trim()) {
      setIsUpdating(true);
      const randomId = Math.floor(Math.random() * 1000 + 1);
      const newValues = {
        start_datetime: currentDate,
        end_datetime: new Date(),
        sync_jira_status: false,
        id: randomId,
        issue: issue,
        project: {
          id: '03637823-d301-4ad5-a336-ea6af4b1d726',
          name: 'Project Name',
          project_color: { name: 'green' },
        },
      };

      setCurrentTimer(null), stopTimerSocket();
      let newTimerData: any[] = [...timeEntriesList];
      newTimerData.unshift(newValues);
      props.setTimeEntriesList(newTimerData);
      resetTimer();
      setIssue('');
    } else {
      setIssue('');
      showNotificationAction({
        text: `${v_a_task_name_before} ${v_a_stopping} ${v_a_time_tracking}`,
        type: 'warning',
      });
    }
  };

  const updateTaskIssueDebounced = _.debounce(() => {
    console.log('updateTaskIssueDebounced');
    // updateTimerSocket(
    //     issue
    //     );
  }, 1000);

  const onChangeInput = event => {
    const value = event.target.value;
    setIssue(value);

    if (currentTimer && value.trim() && currentTimer.issue !== value.trim()) {
      setIsUpdating(true);
    }
  };
  // useEffect(() => {
  //   if (isUpdating && currentTimer.issue !== issue.trim()) {
  //     updateTaskIssueDebounced();
  //   }
  // }, [isUpdating, issue]);

  const PlayIcon = props => {
    const { className, onClick } = props;
    return (
      <svg
        className={className}
        onClick={onClick}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle className={`${className}-circle`} cx="18" cy="18" r="18" fill="#27AE60" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24.3513 16.4372L14.9265 10.1482C14.6478 9.97256 14.3019 10.0018 14.0406 10.0018C12.9954 10.0018 13 10.8565 13 11.073V23.927C13 24.11 12.9954 24.9982 14.0406 24.9982C14.3019 24.9982 14.6479 25.0273 14.9265 24.8517L24.3513 18.5628C25.1248 18.0753 24.9912 17.5 24.9912 17.5C24.9912 17.5 25.1249 16.9247 24.3513 16.4372Z"
          fill="white"
        />
      </svg>
    );
  };

  const StopIcon = props => {
    const { className, onClick } = props;
    return (
      <svg
        className={className}
        onClick={onClick}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle className={`${className}-circle`} cx="18" cy="18" r="18" fill="#EB5757" />
        <rect x="12" y="12" width="12" height="12" rx="2" fill="white" />
      </svg>
    );
  };

  const SyncIcon = (props: any) => {
    const { className, onClick, name } = props;
    return (
      <svg
        className={className}
        onClick={onClick}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.833252 3.33334V8.33334H5.83325"
          stroke="#C1C0C0"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.1668 16.6667V11.6667H14.1667"
          stroke="#C1C0C0"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.0749 7.50001C16.6523 6.30567 15.934 5.23785 14.987 4.39619C14.0401 3.55454 12.8954 2.96648 11.6597 2.68689C10.424 2.4073 9.13762 2.4453 7.92059 2.79732C6.70356 3.14935 5.59554 3.80394 4.69992 4.70001L0.833252 8.33334M19.1666 11.6667L15.2999 15.3C14.4043 16.1961 13.2963 16.8507 12.0792 17.2027C10.8622 17.5547 9.57584 17.5927 8.34016 17.3131C7.10447 17.0335 5.95975 16.4455 5.01281 15.6038C4.06586 14.7622 3.34756 13.6944 2.92492 12.5"
          stroke="#C1C0C0"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <title>{name}</title>
      </svg>
    );
  };

  const onChangeProject = id => {
    if (currentTimer) {
      setIsUpdating(true);
      updateTimerSocket({
        projectId: id,
        issue,
      });
    } else {
      setProjectId(id);
    }
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
            value={issue}
            onChange={onChangeInput}
            placeholder={v_add_your_task_name}
            className="add-task__input"
          />
          {/* {user.tokenJira && (
            <SyncIcon
              className={classNames('add-task__sync')}
              onClick={handleJiraSync}
              name={v_jira_synchronization}
            />
          )} */}
          <ProjectsListPopup
            withFolder={true}
            disabled={isUpdating}
            onChange={onChangeProject}
            selectedProjectId={projectId}
          />
          <span className="add-task__duration">
            <span className="hours">{props.hour}</span>
            <span>:</span>
            <span className="minute">{props.minute}</span>
            <span>:</span>
            <span className="second">{props.second}</span>
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
