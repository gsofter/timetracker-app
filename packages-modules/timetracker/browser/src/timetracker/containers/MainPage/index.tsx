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
  timeRecords: [ITimeRecord];
  timer: any;
}

const TimeTracker = (props: ITimeTracker) => {
  const { css } = useFela();
  const {
    createTimeRecord,
    timeRecords,
    removeTimeRecord,
    updateTimeRecord,
    isMobile,
    timer,
  } = props;
  const { start, stop, reset } = timer;
  const initialDateFormat = 'DD.MM.YYYY';
  const dateFormat = localStorage.getItem('dateFormat') || initialDateFormat;

  const [isRecording, setIsRecording] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [isBillable, setIsBillable] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');

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

  const renderTotalTimeByDay = (timeRecords: ITimeRecord[]) => {
    let totalTime = 0;
    for (let i = 0; i < timeRecords.length; i++) {
      totalTime += timeRecords[i].totalTime;
    }

    return formatDuration(totalTime);
  };

  const startTimer = () => {
    setStartTime(moment());
    start();
    setIsRecording(true);
    message.info('New timer started!');
  };

  const resetTimerValues = () => {
    setIsRecording(false);
    setStartTime(null);
    setTaskName('');
    setIsBillable(false);
    setSelectedProject('');
    reset();
    stop();
  };

  // save current time record to database
  const saveCurrentTimeRecord = () => {
    const endTime = moment();
    const newTimeRecord: ITimeRecordRequest = {
      start: startTime,
      end: endTime,
      task: taskName,
      projectId: selectedProject,
      totalTime: Math.floor((endTime.valueOf() - startTime.valueOf()) / 1000),
      isBillable,
    };
    createTimeRecord(newTimeRecord);
  };

  const handleStopTimer = () => {
    saveCurrentTimeRecord();
    resetTimerValues();
  };

  const handleTaskChange = event => {
    event.preventDefault();
    setTaskName(event.target.value);
  };

  const handleSelectProject = projectId => {
    setSelectedProject(projectId);
  };

  const handleChangeBillable = event => {
    setIsBillable(event.target.checked);
  };

  const handleTagsChange = value => {
    console.log('handleTagsChange.value =>', value);
  };

  const handlePlayTimer = (timeRecord: ITimeRecord) => {
    if (isRecording) saveCurrentTimeRecord();
    resetTimerValues();
    setTaskName(timeRecord.task);
    setIsBillable(timeRecord.isBillable);
    setSelectedProject(timeRecord.projectId);
    startTimer();
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
                timer={timer}
                handleStart={startTimer}
                handleStop={handleStopTimer}
                startTime={startTime}
                taskName={taskName}
                selectedProject={selectedProject}
                isBillable={isBillable}
                isRecording={isRecording}
                handleTaskChange={handleTaskChange}
                handleSelectProject={handleSelectProject}
                handleChangeBillable={handleChangeBillable}
                handleTagsChange={handleTagsChange}
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
  const { data, error, refetch, loading } = useGetTimeRecordsQuery();
  const [createMutation] = useCreateTimeRecordMutation();
  const [removeMutation] = useRemoveTimeRecordMutation();
  const [updateMutation] = useUpdateTimeRecordMutation();

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

  // update time record
  const updateTimeRecord = (recordId: string, request: ITimeRecordRequest) => {
    updateMutation({ variables: { recordId, request } })
      .then(() => {
        message.success('TimeRecord Updated');
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
      updateTimeRecord={updateTimeRecord}
      timeRecords={_.get(data, 'getTimeRecords', [])}
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

export default withTimer({ startImmediately: false })(TimeTrackerWrapper);
