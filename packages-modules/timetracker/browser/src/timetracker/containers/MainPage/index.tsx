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
}

const TimeTracker = (props: ITimeTracker) => {
  const { css } = useFela();
  const { createTimeRecord, timeRecords, removeTimeRecord, updateTimeRecord, isMobile } = props;

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
                        updateTimeRecord={updateTimeRecord}
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
        message.success('TimeRecord updated');
        refetch();
      })
      .catch(err => {
        console.log(err.message);
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
export default TimeTrackerWrapper;
