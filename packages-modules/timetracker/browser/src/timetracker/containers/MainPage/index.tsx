import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useFela } from 'react-fela';
import moment, { Moment } from 'moment';

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
  useGetPlayingTimeRecordQuery,
  useRemoveTimeRecordMutation,
  useUpdateTimeRecordMutation,
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
  updateTimeRecord: (string, ITimeRecordRequest) => void;
  removePlayingTimeRecord: Function;
  resetTimerValues: Function;
  timeRecords: [ITimeRecord];
  timer: any;
  setCurrentTimeRecord: Function;
  setIsRecording: Function;
  currentTimeRecord: ITimeRecord;
  isRecording: boolean;
}

const TimeTracker = (props: ITimeTracker) => {
  const { css } = useFela();
  const {
    timeRecords,
    createTimeRecord,
    removeTimeRecord,
    removePlayingTimeRecord,
    updateTimeRecord,
    isMobile,
    timer,
    setCurrentTimeRecord,
    currentTimeRecord,
    setIsRecording,
    isRecording,
    resetTimerValues,
  } = props;
  const { start, stop, reset, setTime } = timer;

  const renderTotalTimeByDay = (timeRecords: ITimeRecord[]) => {
    let totalTime = 0;
    for (let i = 0; i < timeRecords.length; i++) {
      totalTime += timeRecords[i].totalTime;
    }

    return formatDuration(totalTime);
  };

  const startTimer = () => {
    const newTimeRecord: ITimeRecordRequest = {
      ...currentTimeRecord,
      start: moment(),
      end: null,
    };
    createTimeRecord(newTimeRecord);
  };

  // save current time record to database
  const saveCurrentTimeRecord = () => {
    const endTime = moment();
    const startTime = moment(currentTimeRecord.start);

    const newTimeRecord: ITimeRecordRequest = {
      start: startTime,
      end: endTime,
      task: currentTimeRecord.task,
      projectId: currentTimeRecord.projectId,
      totalTime: Math.floor((endTime.valueOf() - startTime.valueOf()) / 1000),
      isBillable: currentTimeRecord.isBillable,
    };
    if (currentTimeRecord.id === undefined || currentTimeRecord.id === '')
      createTimeRecord(newTimeRecord);
    else updateTimeRecord(currentTimeRecord.id, newTimeRecord);
  };

  const stopTimer = () => {
    saveCurrentTimeRecord();
    resetTimerValues();
  };

  const handlePlayTimer = (timeRecord: ITimeRecord) => {
    if (isRecording) stopTimer();
    const newTimeRecord: ITimeRecordRequest = {
      ..._.omit(timeRecord, ['id', '__typename']),
      start: moment(),
      end: null,
    };
    createTimeRecord(newTimeRecord);
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
                createTimeRecord={createTimeRecord}
                currentTimeRecord={currentTimeRecord}
                timer={timer}
                handleStart={startTimer}
                handleStop={stopTimer}
                isRecording={isRecording}
                setCurrentTimeRecord={setCurrentTimeRecord}
                resetTimerValues={resetTimerValues}
                removePlayingTimeRecord={removePlayingTimeRecord}
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
                        {renderDayDateString(dayRecords[0].end)}
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
                        updateTimeRecord={updateTimeRecord}
                        handlePlayTimer={handlePlayTimer}
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
  const { setTime, reset, stop, start } = props.timer;
  const { data, error, refetch, loading } = useGetTimeRecordsQuery();
  const { data: plData, refetch: plRefetch, loading: plLoading } = useGetPlayingTimeRecordQuery();
  const [createMutation] = useCreateTimeRecordMutation();
  const [removeMutation] = useRemoveTimeRecordMutation();
  const [updateMutation] = useUpdateTimeRecordMutation();

  // create time record
  const createTimeRecord = (request: ITimeRecordRequest) => {
    createMutation({ variables: { request } })
      .then(() => {
        message.info('TimeRecord created');
        plRefetch();
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

  // update time record
  const updateTimeRecord = (recordId: string, request: ITimeRecordRequest) => {
    updateMutation({ variables: { recordId, request } })
      .then(() => {
        message.success('TimeRecord Updated');
        refetch();
        plRefetch();
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  // remove current playing time record
  const removePlayingTimeRecord = () => {
    removeMutation({ variables: { recordId: currentTimeRecord.id } })
      .then(() => {
        // message.success('TimeRecord Removed');
        plRefetch();
        resetTimerValues();
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const resetTimerValues = () => {
    setIsRecording(false);
    setCurrentTimeRecord({
      start: moment(),
      end: null,
      isBillable: false,
      projectId: '',
      task: '',
    });
    setTime(0);
    reset();
    stop();
  };

  const [currentTimeRecord, setCurrentTimeRecord] = useState<ITimeRecord>({
    start: null,
    end: null,
    isBillable: false,
    projectId: '',
    task: '',
  });
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    console.log('useEffect / [plData, plLoading]');
    if (plData && plData.getPlayingTimeRecord) {
      const playingRecord = plData.getPlayingTimeRecord;
      const passDur = moment().valueOf() - moment(playingRecord.start).valueOf();
      setCurrentTimeRecord(playingRecord);
      setIsRecording(true);
      setTime(passDur);
      start();
    }
  }, [plData, plLoading]);

  return data && !loading ? (
    <TimeTracker
      {...props}
      createTimeRecord={createTimeRecord}
      removeTimeRecord={removeTimeRecord}
      removePlayingTimeRecord={removePlayingTimeRecord}
      updateTimeRecord={updateTimeRecord}
      timeRecords={_.get(data, 'getTimeRecords', [])}
      setIsRecording={setIsRecording}
      setCurrentTimeRecord={setCurrentTimeRecord}
      currentTimeRecord={currentTimeRecord}
      isRecording={isRecording}
      resetTimerValues={resetTimerValues}
    />
  ) : (
    <></>
  );
};

const withTimer = timerProps => WrappedComponent => wrappedComponentProps => (
  <Timer {...timerProps}>
    {timerRenderProps => <WrappedComponent {...wrappedComponentProps} timer={timerRenderProps} />}
  </Timer>
);

const splitTimersByDay = (timeRecords: [ITimeRecord]): [ITimeRecord][] => {
  timeRecords.sort((a, b) => {
    if (moment(a.end) < moment(b.end)) return 1;
    else if (moment(a.end) > moment(b.end)) return -1;
    else return 0;
  });

  let grouppedDates = {};
  for (let i = 0; i < timeRecords.length; i++) {
    const dispFormat = 'YYYY-MM-DD';
    const date = moment(timeRecords[i].end);
    let dateStr = date.format(dispFormat);
    const weekStartDay = moment().startOf('week');
    if (weekStartDay > date) dateStr = date.startOf('week').format(dispFormat);
    if (!grouppedDates.hasOwnProperty(dateStr)) {
      grouppedDates[dateStr] = [];
    }
    grouppedDates[dateStr].push(timeRecords[i]);
  }

  let groupedDateArray = [];
  for (let key of Object.keys(grouppedDates)) {
    let timeArray = grouppedDates[key];
    groupedDateArray.push(timeArray);
  }
  return groupedDateArray;
};

const renderDayDateString = (date: string) => {
  if (moment(date) < moment().startOf('week')) {
    return (
      moment(date)
        .startOf('week')
        .format('MMM/DD/YYYY') +
      ' - ' +
      moment(date)
        .startOf('week')
        .add('7', 'day')
        .format('MMM/DD/YYYY')
    );
  }
  return moment(date).calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'DD/MM/YYYY',
  });
};

export default withTimer({ startImmediately: false })(TimeTrackerWrapper);
