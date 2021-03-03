import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useFela } from 'react-fela';
import moment, { Moment } from 'moment';

import { PageContainer } from '@admin-layout/components';
import PageHeader from '../../components/PageHeader';
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
  useGetProjectsQuery,
} from '../../../generated-models';
import { ITimeRecordRequest, ITimeRecord, IProjects as IProject } from '@admin-layout/timetracker-core';
import { message } from 'antd';
import * as _ from 'lodash';
import Timer from 'react-compound-timer';
import { formatDuration } from '../../services/timeRecordService';

interface ITimeTracker {
  isMobile: any;
  currentTeam: any;
  pagination: any;
  timeRecords: [ITimeRecord];
  timer: any;
  currentTimeRecord: ITimeRecord;
  isRecording: boolean;
  projects: Array<IProject>;
  createTimeRecord: (ITimeRecordRequest) => void;
  removeTimeRecord: (string) => void;
  updateTimeRecord: (string, ITimeRecordRequest) => void;
  removePlayingTimeRecord: Function;
  resetTimerValues: Function;
  setCurrentTimeRecord: Function;
  setIsRecording: Function;
}

export enum TRACKER_MODE {
  MANUAL,
  TRACK,
}

const TimeTracker = (props: ITimeTracker) => {
  const { css } = useFela();
  const {
    timeRecords,
    isMobile,
    timer,
    isRecording,
    projects,
    currentTimeRecord,
    createTimeRecord,
    removeTimeRecord,
    updateTimeRecord,
    setCurrentTimeRecord,
    removePlayingTimeRecord,
    resetTimerValues,
  } = props;
  const [mode, setMode] = useState(TRACKER_MODE.TRACK);
  const renderTotalTimeByDay = (timeRecords: ITimeRecord[]) => {
    let totalTime = 0;
    for (let i = 0; i < timeRecords.length; i++) {
      totalTime +=
        moment(timeRecords[i].endTime).valueOf() - moment(timeRecords[i].startTime).valueOf();
    }

    return formatDuration(Math.floor(totalTime / 1000));
  };

  const startTimer = () => {
    const newTimeRecord: ITimeRecordRequest = {
      ...currentTimeRecord,
      startTime: moment(),
      endTime: null,
    };
    createTimeRecord(newTimeRecord);
  };

  // save current time record to database
  const saveCurrentTimeRecord = () => {
    const endTime = moment();
    const startTime = moment(currentTimeRecord.startTime);

    const newTimeRecord: ITimeRecordRequest = {
      startTime: startTime,
      endTime: endTime,
      taskName: currentTimeRecord.taskName,
      projectId: currentTimeRecord.projectId,
      // totalTime: Math.floor((endTime.valueOf() - startTime.valueOf()) / 1000),
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
    setMode(TRACKER_MODE.TRACK);
    const newTimeRecord: ITimeRecordRequest = {
      ..._.omit(timeRecord, ['id', '__typename']),
      startTime: moment(),
      endTime: null,
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
                projects={projects}
                isRecording={isRecording}
                timer={timer}
                handleStart={startTimer}
                handleStop={stopTimer}
                mode={mode}
                setMode={setMode}
                createTimeRecord={createTimeRecord}
                currentTimeRecord={currentTimeRecord}
                setCurrentTimeRecord={setCurrentTimeRecord}
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
                        {renderDayDateString(dayRecords[0].endTime)}
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
                        projects={projects}
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
  const { data: projectsData, loading: loadingProjects } = useGetProjectsQuery();
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
      startTime: moment(),
      endTime: null,
      isBillable: false,
      projectId: '',
      taskName: '',
    });
    setTime(0);
    reset();
    stop();
  };

  const [currentTimeRecord, setCurrentTimeRecord] = useState<ITimeRecord>({
    startTime: null,
    endTime: null,
    isBillable: false,
    projectId: '',
    taskName: '',
  });
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    console.log('useEffect / [plData, plLoading]');
    if (plData && plData.getPlayingTimeRecord) {
      const playingRecord = plData.getPlayingTimeRecord;
      const passDur = moment().valueOf() - moment(playingRecord.startTime).valueOf();
      setCurrentTimeRecord(playingRecord);
      setIsRecording(true);
      setTime(passDur);
      start();
    }
  }, [plData, plLoading]);

  return data && !loading ? (
    <TimeTracker
      {...props}
      projects={_.get(projectsData, 'getProjects', [])}
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
    if (moment(a.endTime) < moment(b.endTime)) return 1;
    else if (moment(a.endTime) > moment(b.endTime)) return -1;
    else return 0;
  });

  let grouppedDates = {};
  for (let i = 0; i < timeRecords.length; i++) {
    const dispFormat = 'YYYY-MM-DD';
    const date = moment(timeRecords[i].endTime);
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
    lastWeek: 'dddd',
    sameElse: 'DD/MM/YYYY',
  });
};

export default withTimer({ startImmediately: false })(TimeTrackerWrapper);
