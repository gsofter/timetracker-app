import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useFela } from 'react-fela';
import moment from 'moment';

import { PageContainer } from '@admin-layout/components';
import PageHeader from '../../components/PageHeader';
import vocabulary from '../../en';
import { TimerSearchComponent } from '../../components/TimerSearchComponent/index';
import { AddTask } from '../../components/AddTask';
import { CustomScrollbar } from '../../components/CustomScrollbar';
import { TaskListItem } from '../../components/TaskListItem';
import { TutorialComponent } from '../../components/TutorialComponent';
import { styleSheet } from './styles';
import {
  useCreateTimeRecordMutation,
  useGetTimeRecordsQuery,
  useRemoveTimeRecordMutation,
} from '../../../generated-models';
import { ITimeRecordRequest, ITimeRecord } from '@admin-layout/timetracker-module-core';
import { message } from 'antd';
import * as _ from 'lodash';
import Timer from 'react-compound-timer';
import { formatDuration } from '../../services/timeRecordService';
interface ITimeTracker {
  isMobile: any;
  currentTeam: any;
  pagination: any;
  createTimeRecord: (ITimeRecordRequest) => void;
  removeTimeRecord: (string) => void;
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
  const {
    isMobile,
    currentTeam,
    pagination,
    createTimeRecord,
    timeRecords,
    removeTimeRecord,
  } = props;

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

  const renderTotalTimeByDay = (timeRecords: ITimeRecord[]) => {
    let totalTime = 0;
    for (let i = 0; i < timeRecords.length; i++) {
      totalTime += timeRecords[i].totalTime;
    }

    return formatDuration(totalTime);
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
              <AddTask createTimeRecord={createTimeRecord} />
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
                        Total time: {renderTotalTimeByDay(dayRecords)}
                      </div>
                    </div>
                    {dayRecords.map(timeRecord => (
                      <TaskListItem
                        key={timeRecord.id}
                        timeRecord={timeRecord}
                        timeRecords={timeRecords}
                        removeTimeRecord={removeTimeRecord}
                      />
                    ))}
                  </div>
                ))}
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
  const [removeMutation] = useRemoveTimeRecordMutation();

  // create time record
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

  // remove time record
  const removeTimeRecord = (recordId: string) => {
    removeMutation({ variables: { recordId } })
      .then(() => {
        message.success('TimeRecord Removed');
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
      removeTimeRecord={removeTimeRecord}
      timeRecords={_.get(data, 'getTimeRecords', [])}
    />
  ) : (
    <></>
  );
};
export default TimeTrackerWrapper;
