import React, { useState } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { useFela } from 'react-fela';

import { Loading } from '../../components/Loading';
import { ProjectsListPopup } from '../../components/ProjectsListPopup';
import ModalPortal from '../../components/ModalPortal';
import { StartEditTaskModal } from '../../components/StartEditTaskModal';
import { CalendarPopup } from '../../components/CalendarPopup';
import { PlayCircleOutlined, EditOutlined } from '@ant-design/icons';
import { styleSheet } from './styles';

// Services
import { getTimeDurationByGivenTimestamp } from '../../services/timeService';
import { encodeTimeEntryIssue } from '../../services/timeEntryService';
import { sleep } from '../../services/sleep';
import { startTimerSocket } from '../../configSocket';

import { CustomSwipe } from '../../components/CustomSwipe';
import DemoData from '../../demoData';
import { DatePicker, Space, Popconfirm, Button, TimePicker } from 'antd';
import { ITimeRecord } from '@admin-layout/timetracker-module-core';
const { RangePicker } = TimePicker;

export interface ITaskList {
  issue?: string;
  projectId?: any;
  timeFormat?: any;
  vocabulary?: any;
  timeRecord?: ITimeRecord;
  getTimeEntriesListAction?: any;
  setSwipedTaskAction?: any;
  isMobile?: any;
  swipedTask?: any;
  durationTimeFormat?: any;
  viewport?: any;
  start_dateTime?: any;
  end_dateTime?: any;
  start?: any;
  setCurrentTimer?: any;
  timeRecords: [ITimeRecord];
  setIsActive: any;
  resetTimer: any;
  hour: any;
  minute: any;
  second: any;
  setIssue: any;
  currentDate: any;
  setCurrentDate: any;
  updateTime: (id: any, start: any, end: any) => void;
  removeTimeRecord: (recordId: string) => void;
}

export const TaskListItem: React.FC<ITaskList> = (props: ITaskList) => {
  const { css } = useFela(props);
  const [isUpdatingTask, setIsUpdatingTask] = useState(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [isOpenProjectsListPopup, setIsOpenProjectsListPopup] = useState(null);
  const [newIssue, setNewIssue] = useState('');
  const [isStartingTask, setIsStartingTask] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isUpdatingIssue, setIsUpdatingIssue] = useState(false);
  const [popupEditTask, setPopupEditTask] = useState<any>([]);
  const [cursorPosition, SetCursorPosition] = useState([]);
  const [changeTask, setChangeTask] = useState(DemoData.timer_v2);
  const [timePicker, setTimePicker] = useState(null);
  const [datePicker, setDatePicker] = useState(null);
  const [updateTimer, setUpdateTimer] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const {
    timeRecord,
    isMobile,
    vocabulary,
    swipedTask,
    timeFormat,
    durationTimeFormat,
    setSwipedTaskAction,
    viewport,
    getTimeEntriesListAction,
    setCurrentTimer,
    timeRecords,
    setIsActive,
    setIssue,
    currentDate,
    setCurrentDate,
    updateTime,
    removeTimeRecord,
  } = props;

  interface IUpdateTask {
    issue?: any;
    projectId: number;
    start_dateTime?: any;
    end_dateTime?: any;
    durationTimeFormat: any;
    timeFormat: any;
    setIssue: any;
  }

  const { v_edit_task, v_delete_task } = vocabulary;
  const [recordState, setRecordState] = useState(timeRecord);
  const { id, projectId, start, end, task } = recordState;
  const formatPeriodTime = time => {
    const formattedTime = moment(time).format(`${timeFormat === '12' ? 'h:mm a' : 'HH:mm'}`);
    return formattedTime;
  };

  const formatDurationTime = (startTime, endTime) => {
    const formattedTime = getTimeDurationByGivenTimestamp(
      +moment(endTime) - +moment(startTime),
      durationTimeFormat,
    );
    return formattedTime;
  };

  const deleteRecord = async event => {
    removeTimeRecord(id);
  };

  const updateTask = async ({
    // issue,
    projectId,
    start_dateTime,
    end_dateTime,
  }: IUpdateTask) => {
    setIsUpdatingTask(true);
    const { task: originalTask } = timeRecord;
    const data: ITimeRecord = {
      task: task ? encodeTimeEntryIssue(task) : encodeTimeEntryIssue(originalTask),
      projectId: projectId.toString(),
      start: null,
      end: null,
    };
    if (start_dateTime && end_dateTime) {
      data.start = start_dateTime.utc().toISOString();
      data.end = end_dateTime.utc().toISOString();
    }

    await getTimeEntriesListAction();
    setIsUpdatingTask(false);
  };

  const onChangeProject = projectId => {
    updateTask(projectId);
  };

  const closeCalendar = event => {
    setIsOpenCalendar(false);
    // if (!popupEditTask.current.contains(event.target)) {
    //     document.removeEventListener('mousedown', closeCalendar);
    //   }
  };
  const openCalendar = (startTime, endTime) => {
    setIsEdit(true);
    setIsOpenCalendar(!isOpenCalendar);
    const newList = timeRecords.filter(item => item.id === id);
    setUpdateTimer([timeRecords, ...newList]);
    //  document.addEventListener('mousedown', closeCalendar);
  };

  const updateTimeTracker = () => {
    if (!timePicker && !timePicker.length) {
      return;
    }
    const start = timePicker[0];
    const end = timePicker[1];
    if (start && end) {
      updateTime(id, start, end);
      setRecordState({
        ...recordState,
        start: start,
        end: end,
      });
      setIsOpenCalendar(false);
    }
  };

  // Date Picker Functions
  const handleDatePicker = (value, dateString) => {
    setDatePicker(dateString);
  };

  const handleTimePicker = time => {
    setIsEdit(false);
    setTimePicker(time);
  };

  const createRefCallback = ref => {
    setPopupEditTask(ref);
  };

  const startEditIssue = event => {
    if (isMobile) {
      return;
    }
    setIsUpdatingIssue(true);
    setNewIssue('');
  };

  const endEditIssue = async event => {
    if (isMobile) {
      return;
    }
    //   const { newIssue } = state;
    if (newIssue.trim() && newIssue.trim() !== timeRecord.task) {
      //   await updateTask({ issue: newIssue.trim() });
    } else {
      event.target.textContent = timeRecord.task;
    }
    setIsUpdatingIssue(false);
  };

  const setCaretPosition = (elem, position) => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(elem.childNodes[0], position);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const setCaretPositionToState = event => {
    if (isMobile) {
      return;
    }
    const sel = window.getSelection();
    SetCursorPosition([sel.anchorOffset, sel.focusOffset]);
  };

  const handlePaste = event => {
    //   const { cursorPosition } = state;
    const elem = event.target;
    const initialCursorPosition = cursorPosition;
    let data =
      event.clipboardData.getData('text/html') || event.clipboardData.getData('text/plain');
    const currentValue = elem.textContent;
    let tempDiv = document.createElement('DIV');
    tempDiv.innerHTML = data;
    const splitted = currentValue.split('');
    const lengthOfSelected = cursorPosition[1] - cursorPosition[0];
    splitted.splice(cursorPosition[0], lengthOfSelected, tempDiv.innerText);
    elem.textContent = splitted.join('');
    const newCursorPosition = initialCursorPosition[0] + tempDiv.innerText.length;
    setCaretPosition(elem, newCursorPosition);
    setCaretPositionToState(event);
    setNewIssue(event.target.textContent);
    event.preventDefault();
  };

  const handleStartTimer = event => {
    setCurrentDate(new Date());
    setIsActive(true);
    if (task.trim()) {
      setIssue(task);
      setIsStartingTask(true);
      setCurrentTimer(timeRecords);
      // startTimerSocket({ issue, projectId: project.id });
    }
    setIsStartingTask(true);
  };

  const handleSwipeMove = ({ x, y }, event) => {
    if (y <= 20 || x >= -20) {
      if (x <= -(viewport.width / 15) && swipedTask !== timeRecord.id) {
        setSwipedTaskAction(timeRecord.id);
      } else if (x >= viewport.width / 15 && swipedTask === timeRecord.id) {
        setSwipedTaskAction(null);
      }
    }
  };

  const openEditTaskModal = event => {
    setShowEditModal(true);
    setSwipedTaskAction(null);
  };

  const closeEditTaskModal = event => {
    setShowEditModal(false);
  };

  const EditIcon = ({ className, onClick = null }) => (
    <svg
      className={className}
      onClick={onClick}
      viewBox="0 0 19 19"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.8147 3.20179L15.6797 7.06678L5.89624 16.8502L2.0334 12.9852L11.8147 3.20179ZM18.6125 2.26964L16.8889 0.545986C16.2227 -0.120146 15.1411 -0.120146 14.4727 0.545986L12.8216 2.19707L16.6866 6.0621L18.6125 4.1362C19.1292 3.61951 19.1292 2.7863 18.6125 2.26964ZM0.0107555 18.4178C-0.0595831 18.7344 0.226226 19.018 0.542821 18.941L4.84975 17.8968L0.98691 14.0318L0.0107555 18.4178Z" />
    </svg>
  );

  const DeleteIcon = ({ className }) => (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.28273 7.50004L14.6308 2.15198C15.1231 1.65968 15.1231 0.861516 14.6308 0.369292C14.1385 -0.123003 13.3404 -0.123003 12.8481 0.369292L7.49997 5.71742L2.15185 0.369221C1.65956 -0.123074 0.861463 -0.123074 0.369168 0.369221C-0.123056 0.861516 -0.123056 1.65968 0.369168 2.15191L5.71729 7.49996L0.369168 12.8481C-0.123056 13.3404 -0.123056 14.1386 0.369168 14.6308C0.861463 15.1231 1.65956 15.1231 2.15185 14.6308L7.49997 9.28265L12.8481 14.6308C13.3403 15.1231 14.1385 15.1231 14.6308 14.6308C15.1231 14.1385 15.1231 13.3404 14.6308 12.8481L9.28273 7.50004Z"
        fill="#EB5757"
      />
    </svg>
  );

  const TrashIcon = ({ className, onClick = null }) => (
    <svg
      className={className}
      onClick={onClick}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.11286 19.4171C3.11286 19.4171 3.4922 20.831 5.44478 20.831H14.2735C16.226 20.831 16.6053 19.4171 16.6053 19.4171L18.3483 5.55496H1.37001L3.11286 19.4171ZM13.2548 7.63809C13.2548 7.25456 13.6348 6.94374 14.1037 6.94374C14.5726 6.94374 14.9527 7.25456 14.9527 7.63809L14.1037 18.0536C14.1037 18.4371 13.7236 18.7479 13.2548 18.7479C12.786 18.7479 12.4059 18.437 12.4059 18.0536L13.2548 7.63809ZM9.01025 7.63809C9.01025 7.25456 9.39035 6.94374 9.85915 6.94374C10.328 6.94374 10.708 7.25456 10.708 7.63809V18.0536C10.708 18.4371 10.328 18.7479 9.85915 18.7479C9.39026 18.7479 9.01025 18.437 9.01025 18.0536V7.63809ZM5.61458 6.94366C6.08347 6.94366 6.46347 7.25449 6.46347 7.63801L7.31246 18.0535C7.31246 18.437 6.93236 18.7479 6.46347 18.7479C5.99468 18.7479 5.61458 18.437 5.61458 18.0535L4.76568 7.63809C4.76568 7.25456 5.14578 6.94366 5.61458 6.94366ZM17.8389 2.77857H14.1037V1.38878C14.1037 0.335343 13.6872 0 12.4059 0H7.31237C6.13716 0 5.61458 0.465616 5.61458 1.38878V2.77864H1.87941C1.12869 2.77864 0.521118 3.24473 0.521118 3.82067C0.521118 4.3967 1.12869 4.86278 1.87941 4.86278H17.8389C18.5896 4.86278 19.1972 4.3967 19.1972 3.82067C19.1972 3.24473 18.5896 2.77857 17.8389 2.77857ZM12.4059 2.77857H7.31246L7.31256 1.3887H12.406V2.77857H12.4059Z"
        fill="white"
      />
    </svg>
  );

  return (
    <div className={css(styleSheet.TaskListItem as any)}>
      <CustomSwipe
        className={classNames('task-item-swipe', {
          'task-item-swipe--swiped': swipedTask === id,
        })}
        onSwipeMove={handleSwipeMove}
      >
        <div
          className={classNames('task-item', {
            'task-item--mobile': isMobile,
            'task-item--disabled': isUpdatingTask,
            'task-item--selected':
              isOpenCalendar || isOpenProjectsListPopup || isUpdatingIssue || isStartingTask,
          })}
        >
          <div className={'issue_width'}>
            {/* <JiraIcon
                            task={task}
                            isSync={syncJiraStatus}
                            disableClick={isOpenCalendar || isUpdatingIssue}
                        /> */}
            <p
              className={classNames('task-item__issue', {
                'task-item__issue--editing': isUpdatingIssue,
              })}
              spellCheck={false}
              contentEditable={!isMobile}
              suppressContentEditableWarning={true}
              onKeyUp={setCaretPositionToState}
              onClick={setCaretPositionToState}
              onKeyDown={event => {
                setCaretPositionToState(null);
                // event.keyCode === 13 && event.target.blur();
              }}
              onFocus={startEditIssue}
              onBlur={endEditIssue}
              onInput={event => {
                // setNewIssue(event.target.textContent);
              }}
              onPaste={handlePaste}
            >
              {isUpdatingTask && newIssue ? newIssue : task}
            </p>
            <ProjectsListPopup
              disabled={isMobile}
              onChangeVisibility={setIsOpenProjectsListPopup}
              listItem={true}
              onChange={onChangeProject}
              selectedProjectId={timeRecord.id}
            />
            <p className="task-item__period-time">
              <span className="task-item__start-time">{formatPeriodTime(start)}</span>
              {' - '}
              <span className="task-item__end-time">{formatPeriodTime(end)}</span>
            </p>
            {!isMobile && (
              <p className="task-item__duration-time">{formatDurationTime(start, end)}</p>
            )}
            <div className="task-item__edit-wrapper">
              {isMobile && (
                <p className="task-item__duration-time-mobile">{formatDurationTime(start, end)}</p>
              )}
              <PlayCircleOutlined className="task-item__play-icon" onClick={handleStartTimer} />
              <EditOutlined
                className="task-item__edit-icon"
                onClick={() => openCalendar(start, end)}
              />
              <Popconfirm
                title="Are you sure?"
                placement="top"
                okText="OK"
                cancelText="Cancel"
                onConfirm={deleteRecord}
              >
                <Button>
                  <DeleteIcon className="task-item__delete-icon" />
                </Button>
              </Popconfirm>
              {isOpenCalendar && (
                <div className="site-calendar-card">
                  <RangePicker
                    format="HH:mm"
                    value={isEdit ? [moment(start), moment(end)] : timePicker}
                    onCalendarChange={handleTimePicker}
                  />
                  <br />
                  <DatePicker onChange={handleDatePicker} value={moment(start)} />
                  <br />
                  <div className="dataPicker--button">
                    <Button className="theme-primary" onClick={updateTimeTracker} type="primary">
                      Update
                    </Button>
                    <Button className="theme-primary" onClick={closeCalendar} type="primary">
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {isMobile && (
          <div className="task-item__bottom-layer">
            <div className="task-item__bottom-layer-edit-button" onClick={openEditTaskModal}>
              <EditIcon className="task-item__bottom-layer-edit-button-icon" />
              <span className="task-item__bottom-layer-edit-button-text">{v_edit_task}</span>
            </div>
            <div className="task-item__bottom-layer-delete-button" onClick={deleteRecord}>
              <TrashIcon className="task-item__bottom-layer-delete-button-icon" />
              <span className="task-item__bottom-layer-delete-button-text">{v_delete_task}</span>
            </div>
          </div>
        )}
        {showEditModal && (
          <ModalPortal>
            <StartEditTaskModal editMode={true} task={task} disableShowModal={closeEditTaskModal} />
          </ModalPortal>
        )}
      </CustomSwipe>
    </div>
  );
};
