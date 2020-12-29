import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useFela } from 'react-fela';
import moment from 'moment';

import { AddTask } from '../../components/AddTask';
import { Loading } from '../../components/Loading';
import { TutorialComponent } from '../../components/TutorialComponent';
import { CustomScrollbar } from '../../components/CustomScrollbar';
import { TaskListItem } from '../../components/TaskListItem';
import { getDateInString } from '../../services/timeService';
import { BlankListComponent } from '../../components/BlankListcomponent';
import { GlobalState } from '../../contexts/GlobalState';
import { StartTaskMobile } from '../../components/StartTaskMobile';
import { TimerSearchComponent } from '../../components/TimerSearchComponent';
import { showNotificationAction } from '../../actions/NotificationActions';
import PageHeader from '../../components/PageHeader';
import en from '../../locales/en';
import vocabulary from '../../en';
import DemoData from '../../demoData';
import { initSocket } from '../../configSocket';
import _ from 'lodash';
import { setTimerTickAction } from '../../actions/MainPageAction';

const TimeTracker = (props) => {
  const { css } = useFela(props);
  const [currentTimer, setCurrentTimer] = useState(null);
  const [timerTick, setTimerTick] = useState(0);
  const [isInitialFetching, setIsInitialFetching] = useState(true);
  const [timeEntriesList, setTimeEntriesList] = useState(DemoData.timer_v2);
  const [ isFetchingTimeEntriesList, setIsFetchingTimeEntriesList] = useState(false);
  const [ isFetchingSearch,  setIsFetchingSearch] = useState(false);
  const [ isSearchMode, setIsSearchMode] = useState(false);

  const {
    isMobile,
    // vocabulary,
    // currentTimer,
    // isFetchingTimeEntriesList,
    pagination,
    // isFetchingSearch,
    // isSearchMode,
  } = props;

  const splitTimersByDay = (timers = []) => {
    const formattedLogsDates = [];
    const formattedLogsDatesValues = [];

    for (let i = 0; i < timers.length; i++) {
      const date = moment(timers[i].startDatetime).format('YYYY-MM-DD');
      let index = formattedLogsDates.indexOf(date);
      if (index === -1) {
        formattedLogsDates.push(date);
        index = formattedLogsDates.length - 1;
      }

      if (typeof formattedLogsDatesValues[index] === 'undefined') {
        formattedLogsDatesValues[index] = [];
      }

      formattedLogsDatesValues[index].push(timers[i]);
    }
    return formattedLogsDatesValues;
  };

  const renderDayDateString = (date: any) => {
    const { dateFormat } = props;
    const { lang } = vocabulary;
    const toUpperCaseFirstLetter = (date) => {
      const day = moment(date)
        .locale(lang.short)
        .format('dddd');
      return day[0].toUpperCase() + day.slice(1);
    };
    return `${toUpperCaseFirstLetter(date)}, ${moment(date).format(
      dateFormat
    )}`;
  };

  const renderTotalTimeByDay = (timers) => {
    const { durationTimeFormat } = props;
    let totalTime = 0;
    for (let i = 0; i < timers.length; i++) {
      totalTime +=
        +moment(timers[i].endDatetime) - +moment(timers[i].startDatetime);
    }

    return getDateInString(totalTime, durationTimeFormat);
  };

  useEffect(  () => initSocket() );

  const setTimeInterval = (status?: any) => {
    let interval;
    if (status) {
      interval = setInterval((start) => {
        setTimerTick((prevTime) => (prevTime += 1));
      }, 1000);
    } else {
      clearInterval(interval);
      setTimerTick(0);
    }
  };
  const jiraSynchronizationHandleClick = e => {
    const { showNotificationAction, getTimeEntriesListAction, getProjectsListActions } = props;
    const {
        v_jira_synchronization_problem,
        v_jira_synchronization_ok,
        v_jira_synchronization_confirm,
    } = vocabulary;

    if (!window.confirm(v_jira_synchronization_confirm)) {
      return;
    }
    setIsInitialFetching(true);

    // syncAllTasksWithJira()
    //     .then(() => {
    //         getTimeEntriesListAction();
    //         getProjectsListActions();
    //     })
    //     .then(() => {
    //         showNotificationAction({
    //             text: `${v_jira_synchronization_ok}`,
    //             type: 'success',
    //         });
    //     })
    //     .catch(err => {
    //         showNotificationAction({
    //             text: `${v_jira_synchronization_problem}`,
    //             type: 'error',
    //         });
    //     })
    //     .finally(() => {
    //       setIsInitialFetching(false);
    //     });
};

  return (
    <GlobalState.Provider value={'dark'}>
      <div className={css(styleSheet.mainPage)}>
        <TutorialComponent>
          <div
            className={classNames('main-page', {
              'main-page--mobile': isMobile,
            })}>
              <PageHeader title={vocabulary.v_timer} disabledTitle={isMobile}>
                  {/* <TimerSearchComponent /> */}
              {/* This component takes too much time*/}
              <p>Search component</p>
              {/* <TimerSearchComponent /> */}
            </PageHeader>
            <AddTask
              vocabulary={vocabulary}
              showNotificationAction={showNotificationAction}
              currentTimer={currentTimer}
              setCurrentTimer={setCurrentTimer}
              timerTick={timerTick}
              setTimerTick={setTimerTick}
              handleJiraSync={jiraSynchronizationHandleClick}
              setTimeInterval={setTimeInterval}
            />
            <CustomScrollbar>
              <div className="main-page__list">
                    {timeEntriesList &&
                        timeEntriesList.length === 0 &&
                        BlankListComponent(
                            vocabulary.v_no_entries,
                            vocabulary.v_no_entries_sub,
                            { bottom: '-175px' },
                        )}
                    {splitTimersByDay(timeEntriesList).map((day, index, arr) => (
                        <div
                            className={classNames('main-page__day', {
                                'main-page__day--last-child': index === arr.length - 1,
                            })}
                            key={index}
                        >
                            <div className="main-page__day-header">
                                <div className="main-page__day-date">
                                    {renderDayDateString(day[0].startDatetime)}
                                </div>
                                <div className="main-page__day-date-all-time">
                                    {vocabulary.v_total_time}: {renderTotalTimeByDay(day)}
                                </div>
                            </div>
                            {day.map(task => (
                                <TaskListItem key={task.id} task={task} />
                            ))}
                        </div>
                    ))}
                    {isFetchingTimeEntriesList }
                    {isMobile &&
                        !currentTimer &&
                        pagination.disabled && <div className="main-page__empty-block" />}
                </div>
            </CustomScrollbar>
            {/* <StartTaskMobile /> */}
          </div>
        </TutorialComponent>
      </div>
      {props.children}
    </GlobalState.Provider>
  );
};

const styleSheet: any = {
  mainPage: (props) => ({
    position: 'relative',
    width: '100%',
    backgroundColor: '#333',
    '& .main-page': {
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem',
      fontSize: '1.2rem',
      lineHeight: '1.6rem',
      overflow: 'hidden',
      height: '100vh',
    },
    '& .main-page__list': {
      flexGrow: '1',
      height: '100%',
    },
    '& .main-page__results-title': {
      fontWeight: '600',
      fontSize: '1.8rem',
      lineHeight: '2.5rem',
      color: '#E0E0E0',
      marginBottom: '1.2rem',
      zIndex: '10',
    },
    '& .main-page__day': {
      margin: '0 0 2.6rem 0',
      padding: '1rem',
      background: '#4f4f4f',
    },
    '& .main-page__day-header': {
      display: 'flex',
      justifyContent: 'space-between',
      color: '#b8b8b8',
      padding: '0 0.5rem 0 0.5rem',
      margin: '0 0 1rem 0',
    },
    '& .main-page__day-date': {
      fontWeight: '700',
    },
    '& .main-page__lazy-load-spinner': {
      minHeight: '5rem',
      minWidth: '100%',
    },
    '& .mainPage--mobile': {
      padding: '0 1rem 0 1rem',
    },
    '& .main-page--mobile .main-page__day': {
      padding: '1rem 0 1rem 0',
    },
    '& .main-page--mobile .main-page__day--last-child': {
      margin: '0 0 0 0',
    },
    '& .main-page--mobile .main-page__empty-block': {
      minWidth: '100%',
      minHeight: '1rem',
    },
    '& button': {
      cursor: 'pointer',
      border: 'none',
      outline: 'none',
    },
    '& input': {
      outline: 'none',
    },
  }),
};

export default TimeTracker;
