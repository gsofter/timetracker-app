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
import { BlankListComponent } from '../../components/BlankListcomponent/BlankListComponent';
import { GlobalState } from '../../contexts/GlobalState';
import { StartTaskMobile } from '../../components/StartTaskMobile';
import { TimerSearchComponent } from '../../components/TimerSearchComponent';
import PageHeader from '../../components/PageHeader';
import en from '../../locales/en';

export const TimeTracker = (props) => {
  const { css } = useFela(props);
  const isInitialFetching = true;
  const {
    isMobile,
    vocabulary,
    timeEntriesList,
    currentTimer,
    isFetchingTimeEntriesList,
    pagination,
    isFetchingSearch,
    isSearchMode,
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

  const renderDayDateString = (date) => {
    const { dateFormat, vocabulary } = props;
    const { lang } = vocabulary;
    const toUpperCaseFirstLetter = (date) => {
      const day = moment(date)
        .locale(lang.short)
        .format('dddd');
      return day[0].toUpperCase() + day.slice(1);
    };
    return `${toUpperCaseFirstLetter(date)}, ${moment(date).format(
      dateFormat,
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

  return (
    <GlobalState.Provider value={'dark'}>
      <div className={css(styleSheet.mainPage)}>
        {/* <Loading flag={isInitialFetching} mode="parentSize" withLogo={true}> */}
        <TutorialComponent>
          <div
            className={classNames('main-page', {
              'main-page--mobile': isMobile,
            })}>
              {/* <PageHeader title={v_timer} disabledTitle={isMobile}> */}
              <PageHeader title="Timer" disabledTitle={isMobile}>
                  <TimerSearchComponent />
              </PageHeader>
            <AddTask />
            <CustomScrollbar>
              <div className="main-page__list">
                {timeEntriesList &&
                timeEntriesList.length === 0 &&
                BlankListComponent(
                  props.vocabulary.v_no_entries,
                  props.vocabulary.v_no_entries_sub,
                  { bottom: '-175px' }
                )}

                {splitTimersByDay(timeEntriesList).map((day, index, arr) => (
                  <div
                    className={classNames('main-page__day', {
                      'main-page__day--last-child': index === arr.length - 1,
                    })}
                    key={index}>
                    <div className="main-page__day-header">
                      <div className="main-page__day-date">
                        {renderDayDateString(day[0].startDatetime)}
                      </div>
                      <div className="main-page__day-date-all-time">
                        {/* {v_total_time}: {renderTotalTimeByDay(day)} */}
                      </div>
                    </div>
                    {day.map((task) => (
                    <TaskListItem key={task.id} task={task} />
                  ))}
                  </div>
                ))}
                {isFetchingTimeEntriesList && (
                <Loading
                  mode="overlay"
                  withLogo={false}
                  flag={isFetchingTimeEntriesList}
                  width="100%"
                  circle={true}
                  height="100%">
                  <div className="main-page__lazy-load-spinner" />
                </Loading>
              )}
              {isMobile && !currentTimer && pagination.disabled && (
                <div className="main-page__empty-block" />
              )} 
              </div>
            </CustomScrollbar>
            <StartTaskMobile /> 
          </div>
        </TutorialComponent>
        {/* </Loading> */}
      </div>
      {props.children}
    </GlobalState.Provider>
  );
};

const styleSheet: any = {
  mainPage: (props) => ({
    position: 'relative',
    width: '100%',
    background: '#333333',
    '& .main-page': {
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem',
      fontSize: '1.2rem',
      lineHeight: '1.6rem',
      overflow: 'hidden',
      height: '100%',
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
