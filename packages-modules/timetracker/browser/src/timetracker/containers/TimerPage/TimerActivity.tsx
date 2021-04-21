import React, { useState } from 'react';
import classNames from 'classnames';
import { useFela } from 'react-fela';
import moment, { Moment } from 'moment';
import { PageContainer } from '@admin-layout/components';
import PageHeader from '../../components/PageHeader';
import { TimerSearchComponent } from '../../components/TimerSearchComponent/index';
import { TimeTracker } from '../../components/TimeTracker';
import { CustomScrollbar } from '../../components/CustomScrollbar';
import { TimerActivityItem } from '../../components/TimerActivityItem';
import { TutorialComponent } from '../../components/TutorialComponent';
import { styleSheet } from './styles';
import {
  ITimeRecordRequest,
  ITimeRecord,
  IProjects as IProject,
} from '@admin-layout/timetracker-core';
import * as _ from 'lodash';
import { formatDuration } from '../../services/timeRecordService';
import { useSelector } from 'react-redux';
import { useTimeformat } from '../../hooks';
import { TRACKER_MODE } from '../../constants';

const splitTimersByDay = (timeRecords: [ITimeRecord], dateFormat): [ITimeRecord][] => {
  if (!timeRecords) return [];
  timeRecords.sort((a, b) => {
    if (moment(a.endTime) < moment(b.endTime)) return 1;
    else if (moment(a.endTime) > moment(b.endTime)) return -1;
    else return 0;
  });

  let grouppedDates = {};
  for (let i = 0; i < timeRecords.length; i++) {
    const dispFormat = dateFormat;
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

const renderDayDateString = (date: string, dateFormat: string) => {
  if (moment(date) < moment().startOf('week')) {
    return (
      moment(date).startOf('week').format(dateFormat) +
      ' - ' +
      moment(date).startOf('week').add('7', 'day').format(dateFormat)
    );
  }
  return moment(date).calendar(null, {
    sameDay: '[Today]',
    lastDay: '[Yesterday]',
    lastWeek: 'dddd',
    sameElse: dateFormat,
  });
};

interface ITimerActivityProps {
  isMobile: any;
  currentTeam: any;
  pagination: any;
  timeRecords: [ITimeRecord];
  timer: any;
  currentTimeRecord: ITimeRecord;
  isRecording: boolean;
  projects: Array<IProject>;
  weekStart: Moment;
  createTimeRecord: (ITimeRecordRequest) => void;
  removeTimeRecord: (string) => void;
  updateTimeRecord: (string, ITimeRecordRequest) => void;
  removePlayingTimeRecord: Function;
  resetTimerValues: Function;
  setCurrentTimeRecord: Function;
  setIsRecording: Function;
}

const TimerActivity = (props: ITimerActivityProps) => {
  const { css } = useFela();
  const {
    timeRecords,
    isMobile,
    timer,
    isRecording,
    projects,
    weekStart,
    currentTimeRecord,
    createTimeRecord,
    removeTimeRecord,
    updateTimeRecord,
    setCurrentTimeRecord,
    removePlayingTimeRecord,
    resetTimerValues,
  } = props;
  const [mode, setMode] = useState(TRACKER_MODE.TRACK);
  const { timeFormat, dateFormat } = useTimeformat();
  const userId = useSelector<any>((state) => state.user.auth0UserId) as string;
  const renderTotalTimeByDay = (timeRecords: ITimeRecord[]) => {
    let totalTime = 0;
    for (let i = 0; i < timeRecords.length; i++) {
      totalTime +=
        moment(timeRecords[i].endTime).valueOf() - moment(timeRecords[i].startTime).valueOf();
    }
    return formatDuration(Math.floor(totalTime / 1000), timeFormat);
  };

  const startTimer = () => {
    const newTimeRecord: ITimeRecordRequest = {
      ...currentTimeRecord,
      userId,
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
      userId: userId,
      startTime: startTime,
      endTime: endTime,
      taskName: currentTimeRecord.taskName,
      projectId: currentTimeRecord.projectId,
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
          <TimerSearchComponent weekStart={weekStart} />
        </PageHeader>
        <TutorialComponent>
          <div
            className={classNames('main-page', {
              'main-page--mobile': isMobile,
            })}
          >
            <div className="task-container">
              <TimeTracker
                projects={projects}
                isRecording={isRecording}
                timer={timer}
                mode={mode}
                weekStart={weekStart}
                handleStart={startTimer}
                handleStop={stopTimer}
                setMode={setMode}
                createTimeRecord={createTimeRecord}
                updateTimeRecord={updateTimeRecord}
                currentTimeRecord={currentTimeRecord}
                setCurrentTimeRecord={setCurrentTimeRecord}
                removePlayingTimeRecord={removePlayingTimeRecord}
              />
            </div>
            <CustomScrollbar>
              <div className="main-page__list">
                {splitTimersByDay(timeRecords, dateFormat).map((dayRecords, index, arr) => (
                  <div
                    className={classNames('main-page__day', {
                      'main-page__day--last-child': index === arr.length - 1,
                    })}
                    key={index}
                  >
                    <div className="main-page__day-header">
                      <div className="main-page__day-date">
                        {renderDayDateString(dayRecords[0].endTime, dateFormat)}
                      </div>
                      <div className="main-page__day-date-all-time">
                        Total time: {renderTotalTimeByDay(dayRecords)}
                      </div>
                    </div>
                    {dayRecords.map((timeRecord) => (
                      <TimerActivityItem
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

export default TimerActivity;
