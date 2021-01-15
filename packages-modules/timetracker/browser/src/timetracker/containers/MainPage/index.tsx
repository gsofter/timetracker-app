import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useFela } from 'react-fela';
import moment from 'moment';

import { PageContainer } from '@admin-layout/components';
import PageHeader from '../../components/PageHeader';
import vocabulary from '../../en';
import { TimerSearchComponent } from '../../components/TimerSearchComponent/index';
import { AddTask } from '../../components/AddTask';
import DemoData from '../../demoData';
import { initSocket } from '../../configSocket';
import { getDateInString } from '../../services/timeService';
import { CustomScrollbar } from '../../components/CustomScrollbar';
import { BlankListComponent } from '../../components/BlankListcomponent';
import { TaskListItem } from '../../components/TaskListItem';
import { TutorialComponent } from '../../components/TutorialComponent';
import { styleSheet } from './styles';
import { useCreateTimeRecordMutation, useGetTimeRecordsQuery } from '../../../generated-models';
import { ITimeRecordRequest, ITimeRecord } from '@admin-layout/timetracker-module-core';
import { message } from 'antd';
import * as _ from 'lodash';

interface ITimeTracker {
  isMobile: any;
  currentTeam: any;
  pagination: any;
  createTimeRecord: (ITimeRecordRequest) => void;
  timeRecords: [ITimeRecord];
}

const TimeTracker = (props: ITimeTracker) => {
  const { css } = useFela();
  const [currentTimer, setCurrentTimer] = useState(null);
  const [isInitialFetching, setIsInitialFetching] = useState(true);
  const [timeEntriesList, setTimeEntriesList] = useState([]);
  const [isFetchingTimeEntriesList, setIsFetchingTimeEntriesList] = useState(false);
  const [isFetchingSearch, setIsFetchingSearch] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');
  const [hour, setHour] = useState('00');
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [issue, setIssue] = useState('');
  const [currentDate, setCurrentDate] = useState(null);
  const { isMobile, currentTeam, pagination, createTimeRecord, timeRecords } = props;

  useEffect(() => {
    let intervalId: any;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);
        const hourCounter = Math.floor(counter / 3600);

        let computedSecond: any =
          String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;

        let computedMinute: any =
          String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

        let computedHours: any = String(hourCounter).length === 1 ? `0${hourCounter}` : hourCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);
        setHour(computedHours);

        setCounter(counter => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  const resetTimer = () => {
    setIsActive(false);
    setCounter(0);
    setSecond('00');
    setMinute('00');
    setHour('00');
  };

  const initialDateFormat = 'DD.MM.YYYY';
  const dateFormat = localStorage.getItem('dateFormat') || initialDateFormat;

  const initialTimeFormat = '24';
  const timeFormat = localStorage.getItem('timeFormat') || initialTimeFormat;

  const initialFirstDayOfWeek = 1;
  const firstDayOfWeek = localStorage.getItem('firstDayOfWeek') || initialFirstDayOfWeek;

  const initialDurationTimeFormat = 'improved';
  const durationTimeFormat =
    localStorage.getItem('durationTimeFormat') || initialDurationTimeFormat;

  const splitTimersByDay = (timeRecords: [ITimeRecord]): [ITimeRecord][] => {
    let formattedLogsDates = [];
    let formattedLogsDatesValues = [];

    for (let i = 0; i < timeRecords.length; i++) {
      const date = moment(timeRecords[i].start).format('YYYY-MM-DD');
      let index = formattedLogsDates.indexOf(date);
      if (index === -1) {
        formattedLogsDates.push(date);
        index = formattedLogsDates.length - 1;
      }

      if (typeof formattedLogsDatesValues[index] === 'undefined') {
        formattedLogsDatesValues[index] = [];
      }

      formattedLogsDatesValues[index].push(timeRecords[i]);
    }
    return formattedLogsDatesValues;
  };

  const renderDayDateString = (date: any) => {
    const { lang } = vocabulary;
    const toUpperCaseFirstLetter = date => {
      const day = moment(date)
        .locale(lang.short)
        .format('dddd');
      return day[0].toUpperCase() + day.slice(1);
    };
    return `${toUpperCaseFirstLetter(date)}, ${moment(date).format(dateFormat)}`;
  };

  const renderTotalTimeByDay = timers => {
    let totalTime = 0;
    for (let i = 0; i < timers.length; i++) {
      totalTime += +moment(timers[i].end_datetime) - +moment(timers[i].start_datetime);
    }

    return getDateInString(totalTime, durationTimeFormat);
  };

  useEffect(() => initSocket());

  const updateTime = (dayId, startTime, endTime) => {
    let timeEntriesListState = [...timeEntriesList];
    const entryIndex = [...timeEntriesListState].findIndex(x => x.id === dayId);
    if (entryIndex > -1) {
      timeEntriesListState[entryIndex].start_datetime = startTime;
      timeEntriesListState[entryIndex].end_datetime = endTime;
      setTimeEntriesList(timeEntriesListState);
    }
  };

  return (
    <div className={css(styleSheet.mainpageStyle as any)}>
      <PageContainer>
        <PageHeader disabledTitle={isMobile}>
          <TimerSearchComponent />
        </PageHeader>
        <TutorialComponent>
          <div
            className={classNames('main-page', {
              'main-page--mobile': isMobile,
            })}
          >
            <div className="task-container">
              <AddTask
                vocabulary={vocabulary}
                currentTimer={currentTimer}
                setCurrentTimer={setCurrentTimer}
                setIsActive={setIsActive}
                resetTimer={resetTimer}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                createTimeRecord={createTimeRecord}
                setTask={setIssue}
                task={issue}
                hour={hour}
                minute={minute}
                second={second}
                timeRecords={timeRecords}
              />
            </div>
            <CustomScrollbar>
              <div className="main-page__list">
                {splitTimersByDay(timeRecords).map((dayRecords, index, arr) => (
                  <div
                    className={classNames('main-page__day', {
                      'main-page__day--last-child': index === arr.length - 1,
                    })}
                    key={index}
                  >
                    <div className="main-page__day-header">
                      <div className="main-page__day-date">
                        {renderDayDateString(dayRecords[0].start)}
                      </div>
                      <div className="main-page__day-date-all-time">
                        {vocabulary.v_total_time}: {renderTotalTimeByDay(dayRecords)}
                      </div>
                    </div>
                    {dayRecords.map(timeRecord => (
                      <TaskListItem
                        key={timeRecord.id}
                        timeRecord={timeRecord}
                        vocabulary={vocabulary}
                        timeFormat={timeFormat}
                        durationTimeFormat={durationTimeFormat}
                        isMobile={isMobile}
                        setCurrentTimer={setCurrentTimer}
                        timeRecords={timeRecords}
                        setTimeEntriesList={setTimeEntriesList}
                        setIsActive={setIsActive}
                        resetTimer={resetTimer}
                        hour={hour}
                        setIssue={setIssue}
                        minute={minute}
                        second={second}
                        currentDate={currentDate}
                        setCurrentDate={setCurrentDate}
                        updateTime={updateTime}
                      />
                    ))}
                  </div>
                ))}
                {isFetchingTimeEntriesList}
                {isMobile && !currentTimer && pagination.disabled && (
                  <div className="main-page__empty-block" />
                )}
              </div>
            </CustomScrollbar>
          </div>
        </TutorialComponent>
      </PageContainer>
    </div>
  );
};

const TimeTrackerWrapper = props => {
  const { data, error, refetch, loading } = useGetTimeRecordsQuery();
  const [createMutation] = useCreateTimeRecordMutation();
  const createTimeRecord = (request: ITimeRecordRequest) => {
    createMutation({ variables: { request } })
      .then(() => {
        message.success('TimeRecord created');
        refetch();
      })
      .catch(error => {
        message.error(error.message);
      });
  };
  return data && !loading ? (
    <TimeTracker
      {...props}
      createTimeRecord={createTimeRecord}
      timeRecords={_.get(data, 'getTimeRecords', [])}
    />
  ) : (
    <></>
  );
};
export default TimeTrackerWrapper;
