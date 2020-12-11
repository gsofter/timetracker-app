import React, { useState } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { useFela } from 'react-fela';

import { Loading } from '../../components/Loading';
import { ProjectsListPopup } from '../../components/ProjectsListPopup';
import ModalPortal from '../../components/ModalPortal';
import { StartEditTaskModal } from '../../components/StartEditTaskModal';
import { CalendarPopup } from '../../components/CalendarPopup';

// Services
import { getTimeDurationByGivenTimestamp } from '../../services/timeService';
import { encodeTimeEntryIssue } from '../../services/timeEntryService';
import { sleep } from '../../services/sleep';

import { CustomSwipe } from '../../components/CustomSwipe';

export interface ITaskList {
  issue?: string;
  projectId?: any;
  timeFormat?: any;
  vocabulary?: any;
  task?: any;
  getTimeEntriesListAction?: any;
  setSwipedTaskAction?: any;
  isMobile?: any;
  swipedTask?: any;
  durationTimeFormat?: any;
  viewport?: any;
  startDateTime?: any;
  endDateTime?: any;
  startDatetime?: any;
}

export const TaskListItem: React.FC<ITaskList> = (props: any) => {
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

  const { task, isMobile, vocabulary, swipedTask } = props;
  // const { v_edit_task, v_delete_task } = vocabulary;
  const {
    issue,
    project,
    syncJiraStatus,
    startDatetime,
    endDatetime,
    id,
  } = task;

  const formatPeriodTime = (time) => {
    const { timeFormat } = props;
    const formattedTime = moment(time).format(
      `${timeFormat === '12' ? 'h:mm a' : 'HH:mm'}`
    );
    return formattedTime;
  };

  const formatDurationTime = (startTime, endTime) => {
    const { durationTimeFormat } = props;
    const formattedTime = getTimeDurationByGivenTimestamp(
      +moment(endTime) - +moment(startTime),
      durationTimeFormat
    );
    return formattedTime;
  };

  const deleteTask = async (event) => {
    const {
      vocabulary,
      task,
      getTimeEntriesListAction,
      setSwipedTaskAction,
      isMobile,
    } = props;
    // const { v_a_task_delete } = vocabulary;
    let check = window.confirm('Do you really want to delete this time entry?');
    if (check) {
      if (isMobile) {
        setSwipedTaskAction(null);
        await sleep(1000);
      }
      setIsUpdatingTask(true);
      await deleteTask(task.id);
      // getTimeEntriesListAction();
    }
  };

  const updateTask = async ({
    issue,
    projectId,
    startDateTime,
    endDateTime,
  }) => {
    setIsUpdatingTask(true);
    const { task, getTimeEntriesListAction } = props;
    const { id, project, issue: initialIssue } = task;
    const data = {
      issue: issue
        ? encodeTimeEntryIssue(issue)
        : encodeTimeEntryIssue(initialIssue),
      projectId: projectId || project.id,
      startDatetime: null,
      endDatetime: null,
    };
    if (startDateTime && endDateTime) {
      data.startDatetime = startDateTime.utc().toISOString();
      data.endDatetime = endDateTime.utc().toISOString();
    }
    // await changeTask(id, data);
    await getTimeEntriesListAction();
    setIsUpdatingTask(false);
  };

  const onChangeProject = (projectId) => {
    // updateTask({ projectId });
  };

  const openCalendar = (event) => {
    setIsOpenCalendar(true);
    document.addEventListener('mousedown', closeCalendar);
  };

  const closeCalendar = (event) => {
    setIsOpenCalendar(false);
    // if (!popupEditTask.current.contains(event.target)) {
    //   document.removeEventListener('mousedown', closeCalendar);
    // }
  };

  // const setIsOpenProjectsListPopup = key => {
  //     setState({
  //         isOpenProjectsListPopup: key,
  //     });
  // };

  const createRefCallback = (ref) => {
    setPopupEditTask(ref);
  };

  const startEditIssue = (event) => {
    const { isMobile } = props;
    if (isMobile) return;
    setIsUpdatingIssue(true);
    setNewIssue('');
  };

  const endEditIssue = async (event) => {
    const { isMobile, task } = props;
    if (isMobile) return;
    //   const { newIssue } = state;
    if (newIssue.trim() && newIssue.trim() !== task.issue) {
      //   await updateTask({ issue: newIssue.trim() });
    } else {
      event.target.textContent = task.issue;
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

  const setCaretPositionToState = (event) => {
    // const { isMobile } = props;
    if (isMobile) return;
    const sel = window.getSelection();
    SetCursorPosition([sel.anchorOffset, sel.focusOffset]);
  };

  const handlePaste = (event) => {
    //   const { cursorPosition } = state;
    const elem = event.target;
    const initialCursorPosition = cursorPosition;
    let data =
      event.clipboardData.getData('text/html') ||
      event.clipboardData.getData('text/plain');
    const currentValue = elem.textContent;
    let tempDiv = document.createElement('DIV');
    tempDiv.innerHTML = data;
    const splitted = currentValue.split('');
    const lengthOfSelected = cursorPosition[1] - cursorPosition[0];
    splitted.splice(cursorPosition[0], lengthOfSelected, tempDiv.innerText);
    elem.textContent = splitted.join('');
    const newCursorPosition =
      initialCursorPosition[0] + tempDiv.innerText.length;
    setCaretPosition(elem, newCursorPosition);
    setCaretPositionToState(event);
    setNewIssue(event.target.textContent);
    event.preventDefault();
  };

  const handleStartTimer = (event) => {
    // const { task } = props;
    // const { issue, project } = task;
    // setIsStartingTask(true);
    // setState(
    //     {
    //         isStartingTask: true,
    //     },
    //     () => startTimerSocket({ issue, projectId: project.id })
    // );
  };

  const handleSwipeMove = ({ x, y }, event) => {
    const { setSwipedTaskAction, task, viewport, swipedTask } = props;
    if (y <= 20 || x >= -20) {
      if (x <= -(viewport.width / 15) && swipedTask !== task.id) {
        setSwipedTaskAction(task.id);
      } else if (x >= viewport.width / 15 && swipedTask === task.id) {
        setSwipedTaskAction(null);
      }
    }
  };

  const openEditTaskModal = (event) => {
    const { setSwipedTaskAction } = props;
    setShowEditModal(true);
    setSwipedTaskAction(null);
  };

  const closeEditTaskModal = (event) => {
    setShowEditModal(false);
  };

  const PlayIcon = ({ className, onClick }) => (
    <svg
      className={className}
      onClick={onClick}
      width="12"
      height="15"
      viewBox="0 0 12 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.3513 6.43723L1.92647 0.14824C1.64784 -0.0274411 1.30186 0.00182833 1.04056 0.00182833C-0.00463631 0.00182833 3.58597e-07 0.856458 3.58597e-07 1.07297V13.927C3.58597e-07 14.11 -0.00457534 14.9982 1.04056 14.9982C1.30186 14.9982 1.6479 15.0273 1.92647 14.8517L11.3513 8.56279C12.1248 8.07529 11.9912 7.49998 11.9912 7.49998C11.9912 7.49998 12.1249 6.92467 11.3513 6.43723Z"
        fill="#6FCF97"
      />
    </svg>
  );

  const EditIcon = ({ className, onClick = null }) => (
    <svg
      className={className}
      onClick={onClick}
      viewBox="0 0 19 19"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M11.8147 3.20179L15.6797 7.06678L5.89624 16.8502L2.0334 12.9852L11.8147 3.20179ZM18.6125 2.26964L16.8889 0.545986C16.2227 -0.120146 15.1411 -0.120146 14.4727 0.545986L12.8216 2.19707L16.6866 6.0621L18.6125 4.1362C19.1292 3.61951 19.1292 2.7863 18.6125 2.26964ZM0.0107555 18.4178C-0.0595831 18.7344 0.226226 19.018 0.542821 18.941L4.84975 17.8968L0.98691 14.0318L0.0107555 18.4178Z" />
    </svg>
  );

  const DeleteIcon = ({ className, onClick }) => (
    <svg
      className={className}
      onClick={onClick}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
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
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.11286 19.4171C3.11286 19.4171 3.4922 20.831 5.44478 20.831H14.2735C16.226 20.831 16.6053 19.4171 16.6053 19.4171L18.3483 5.55496H1.37001L3.11286 19.4171ZM13.2548 7.63809C13.2548 7.25456 13.6348 6.94374 14.1037 6.94374C14.5726 6.94374 14.9527 7.25456 14.9527 7.63809L14.1037 18.0536C14.1037 18.4371 13.7236 18.7479 13.2548 18.7479C12.786 18.7479 12.4059 18.437 12.4059 18.0536L13.2548 7.63809ZM9.01025 7.63809C9.01025 7.25456 9.39035 6.94374 9.85915 6.94374C10.328 6.94374 10.708 7.25456 10.708 7.63809V18.0536C10.708 18.4371 10.328 18.7479 9.85915 18.7479C9.39026 18.7479 9.01025 18.437 9.01025 18.0536V7.63809ZM5.61458 6.94366C6.08347 6.94366 6.46347 7.25449 6.46347 7.63801L7.31246 18.0535C7.31246 18.437 6.93236 18.7479 6.46347 18.7479C5.99468 18.7479 5.61458 18.437 5.61458 18.0535L4.76568 7.63809C4.76568 7.25456 5.14578 6.94366 5.61458 6.94366ZM17.8389 2.77857H14.1037V1.38878C14.1037 0.335343 13.6872 0 12.4059 0H7.31237C6.13716 0 5.61458 0.465616 5.61458 1.38878V2.77864H1.87941C1.12869 2.77864 0.521118 3.24473 0.521118 3.82067C0.521118 4.3967 1.12869 4.86278 1.87941 4.86278H17.8389C18.5896 4.86278 19.1972 4.3967 19.1972 3.82067C19.1972 3.24473 18.5896 2.77857 17.8389 2.77857ZM12.4059 2.77857H7.31246L7.31256 1.3887H12.406V2.77857H12.4059Z"
        fill="white"
      />
    </svg>
  );

  return (
    <div className={css(styleSheet.TaskListItem)}>
      <CustomSwipe
        className={classNames('task-item-swipe', {
          'task-item-swipe--swiped': swipedTask === id,
        })}
        onSwipeMove={handleSwipeMove}>
        <div
          className={classNames('task-item', {
            'task-item--mobile': isMobile,
            'task-item--disabled': isUpdatingTask,
            'task-item--selected':
              isOpenCalendar ||
              isOpenProjectsListPopup ||
              isUpdatingIssue ||
              isStartingTask,
          })}>
          <Loading
            mode="overlay"
            flag={isUpdatingTask || isStartingTask}
            withLogo={false}>
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
              // onKeyDown={event => {
              //     setCaretPositionToState();
              //     event.keyCode === 13 && event.target.blur();
              // }}
              onFocus={startEditIssue}
              onBlur={endEditIssue}
              // onInput={event => {
              //     setState({
              //         newIssue: ,
              //     });
              // }}
              onPaste={handlePaste}>
              {isUpdatingTask && newIssue ? newIssue : issue}
            </p>
            <ProjectsListPopup
              disabled={isMobile}
              onChangeVisibility={setIsOpenProjectsListPopup}
              listItem={true}
              onChange={onChangeProject}
              selectedProjectId={project.id}
            />
            <p className="task-item__period-time">
              <span className="task-item__start-time">
                {formatPeriodTime(startDatetime)}
              </span>
              {' - '}
              <span className="task-item__end-time">
                {formatPeriodTime(endDatetime)}
              </span>
            </p>
            {!isMobile && (
              <p className="task-item__duration-time">
                {formatDurationTime(startDatetime, endDatetime)}
              </p>
            )}
            <div className="task-item__edit-wrapper">
              {isMobile && (
                <p className="task-item__duration-time-mobile">
                  {formatDurationTime(startDatetime, endDatetime)}
                </p>
              )}
              <PlayIcon
                className="task-item__play-icon"
                onClick={handleStartTimer}
              />
              <EditIcon
                className="task-item__edit-icon"
                onClick={openCalendar}
              />
              <DeleteIcon
                className="task-item__delete-icon"
                onClick={deleteTask}
              />
              {isOpenCalendar && (
                <CalendarPopup
                  createRefCallback={createRefCallback}
                  // startDateTime={startDatetime}
                  // endDateTime={endDatetime}
                  // updateTask={updateTask}
                />
              )}
            </div>
          </Loading>
        </div>
        {isMobile && (
          <div className="task-item__bottom-layer">
            <div
              className="task-item__bottom-layer-edit-button"
              onClick={openEditTaskModal}>
              <EditIcon className="task-item__bottom-layer-edit-button-icon" />
              <span className="task-item__bottom-layer-edit-button-text">
                Edit task
              </span>
            </div>
            <div
              className="task-item__bottom-layer-delete-button"
              onClick={deleteTask}>
              <TrashIcon className="task-item__bottom-layer-delete-button-icon" />
              <span className="task-item__bottom-layer-delete-button-text">
                Delete task
              </span>
            </div>
          </div>
        )}
        {showEditModal && (
          <ModalPortal>
            <StartEditTaskModal
              editMode
              task={task}
              disableShowModal={closeEditTaskModal}
            />
          </ModalPortal>
        )}
      </CustomSwipe>
    </div>
  );
};

const styleSheet: any = {
  TaskListItem: (props) => ({
    '& .task-item': {
      position: 'relative',
      minWidth: '100%',
      fontSize: '1.4rem',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: '0 0 1rem 0',
      padding: '1.5rem 2rem 1.5rem 1.5rem',
      borderRadius: '0.4rem',
      color: '#ffffff',
      lineHeight: '1.8rem',
    },
    '& .task-item:last-child': {
      margin: '0',
    },
    '& .task-item--selected': {
      backgroundColor: '#333333',
    },
    '& .task-item.task-item--selected .task-item__edit-wrapper': {
      display: 'flex',
    },
    '& .task-item.task-item--selected .task-item__duration-time': {
      margin: '0 1rem 0 0',
    },
    '& .task-item:not(.task-item--disabled):not(.task-item--selected):not(.task-item--mobile):hover': {
      backgroundColor: '#333333',
    },
    '& .task-item:not(.task-item--disabled):not(.task-item--selected):not(.task-item--mobile):hover .task-item__edit-wrapper': {
      display: 'flex',
    },
    '& .task-item:not(.task-item--disabled):not(.task-item--selected):not(.task-item--mobile):hover .task-item__duration-time': {
      margin: '0 1rem 0 0',
    },
    '& .task-item .task-item__issue': {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      margin: '0 1rem 0 0',
      outline: 'none',
    },
    '& .task-item .task-item__issue--editing': {
      textOverflow: 'unset',
    },
    '& .task-item ': {
      margin: '0 1rem 0 0',
      whiteSpace: 'nowrap',
    },
    '& .task-item__period-time': {
      margin: '0 1rem 0 0',
      whiteSpace: 'nowrap',
    },
    '& .task-item .task-item__duration-time': {
      margin: '0',
      whiteSpace: 'nowrap',
    },
    '& .task-item .task-item__edit-wrapper': {
      position: 'relative',
      display: 'none',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    '& .task-item:not(.task-item--disabled):not(.task-item--selected)': {
      display: 'flex',
    },
    '& .task-item__edit-wrapper': {
      display: 'flex',
    },
    '& .task-item .task-item__play-icon': {
      margin: '0 1rem 0 0',
      cursor: 'pointer',
    },
    '& .task-item .task-item__edit-icon': {
      cursor: 'pointer',
      margin: '0 1rem 0 0',
      fill: '#6fcf97',
      width: '1.5rem',
      height: '1.5rem',
    },
    '& .task-item .task-item__delete-icon': {
      cursor: 'pointer',
    },
    '& .task-item-swipe--swiped .task-item--mobile': {
      left: '-50%',
    },
    '& .task-item--mobile': {
      padding: '1.2rem 1rem 1.2rem 1rem',
      backgroundColor: '#4f4f4f',
      borderRadius: '0',
      zIndex: '2',
      left: '0',
      transition: 'left 0.2s linear',
      margin: '0',
    },
    '& .task-item--mobile .task-item__period-time': {
      display: 'none',
    },
    '& .task-item--mobile .task-item__duration-time': {
      display: 'none',
    },
    '& .task-item--mobile .task-item__edit-wrapper': {
      position: 'static',
      display: 'flex',
      flexDirection: 'column',
    },
    '& .task-item--mobile .task-item__duration-time-mobile': {
      display: 'inline-block',
      margin: '0 0 0.5rem 0',
      fontSize: '1.2rem',
      color: '#b8b8b8',
      whiteSpace: 'nowrap',
    },
    '& .task-item--mobile .task-item__play-icon': {
      margin: 0,
    },
    '& .task-item--mobile .task-item__edit-icon': {
      display: 'none',
    },
    '& .task-item--mobile .task-item__delete-icon': {
      display: 'none',
    },
    '& .task-item-swipe': {
      position: 'relative',
      color: '#ffffff',
    },
    '& .task-item-swipe .task-item__bottom-layer': {
      position: 'absolute',
      display: 'flex',
      zIndex: '1',
      top: '0',
      right: '0',
      bottom: '0',
      width: '50%',
      fontFamily: '"Roboto", sans-serif',
      fontWeight: '500',
      fontSize: '1rem',
      lineHeight: '1.4rem',
    },
    '& .task-item-swipe .task-item__bottom-layer .task-item__bottom-layer-edit-button': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100%',
      minWidth: '50%',
      background: '#f2994a',
    },
    '& .task-item-swipe .task-item__bottom-layer .task-item__bottom-layer-edit-button-icon': {
      width: '1.9rem',
      height: '2rem',
      fill: '#ffffff',
      margin: '0 0 0.5rem 0',
    },
    '& .task-item-swipe .task-item__bottom-layer .task-item__bottom-layer-delete-button': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100%',
      minWidth: '50%',
      background: '#eb5757',
    },
    '& .task-item-swipe .task-item__bottom-layer .task-item__bottom-layer-delete-button-icon': {
      width: '1.8rem',
      height: '2rem',
      margin: '0 0 0.5rem 0',
    },
  }),
};
