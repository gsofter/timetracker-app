import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import { useFela } from 'react-fela';
import moment, { Moment } from 'moment';
import { PageContainer } from '@admin-layout/components';
import PageHeader from '../../components/PageHeader';
import { TimerSearchComponent } from '../../components/TimerSearchComponent';
import { TimeTracker } from '../../components/TimeTracker';
import { CustomScrollbar } from '../../components/CustomScrollbar';
import { TimerActivityItem } from '../../components/TimerActivityItem';
import { TutorialComponent } from '../../components/TutorialComponent';
import {
  ITimeRecordRequest,
  ITimeRecord,
  IProjects as IProject,
  IPermissionType,
} from '@admin-layout/timetracker-core';
import * as _ from 'lodash';
import { formatDuration } from '../../services/timeRecordService';
import { useSelector } from 'react-redux';
import { useTimeformat, useCreatePermissions, useDeletePermissions } from '../../hooks';
import { TRACKER_MODE } from '../../constants';
import { Row, Col, Card } from 'antd';
import Spacer from '../../components/Spacer';

const currentWeekRecords = (timeRecords: [ITimeRecord], weekStart: Moment): ITimeRecord[] => {
  return timeRecords.filter((record) => {
    return moment(record.startTime) >= moment(weekStart) && moment(record.endTime) < moment(weekStart).add(1, 'week');
  });
};

const pastWeekRecords = (timeRecords: [ITimeRecord], weekStart: Moment): ITimeRecord[] => {
  return timeRecords.filter((record) => {
    return moment(record.startTime) < moment(weekStart);
  });
};

const groupTimeRecords = (timeRecords: ITimeRecord[], weekStart: Moment, dateFormat?: string): [ITimeRecord][] => {
  if (!timeRecords) return [];
  timeRecords.sort((a, b) => {
    if (moment(a.endTime) < moment(b.endTime)) return 1;
    else if (moment(a.endTime) > moment(b.endTime)) return -1;
    else return 0;
  });

  let grouppedDates = {};
  for (let i = 0; i < timeRecords.length; i++) {
    const date = moment(timeRecords[i].endTime);
    const dateStr = weekStart > date ? moment(date).startOf('week').format(dateFormat) : date.format(dateFormat);
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
      moment(date).startOf('week').add('6', 'day').format(dateFormat)
    );
  }
  if (moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) return 'Today';
  else return moment(date).format(dateFormat);
};

interface IRange {
  startTime: Moment;
  endTime: Moment;
}
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
  range: IRange;
  createTimeRecord: (ITimeRecordRequest) => void;
  removeTimeRecord: (string) => void;
  updateTimeRecord: (string, ITimeRecordRequest) => void;
  removePlayingTimeRecord: Function;
  resetTimerValues: Function;
  setCurrentTimeRecord: Function;
  setIsRecording: Function;
  setRange: Function;
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
    range,
    currentTimeRecord,
    createTimeRecord,
    removeTimeRecord,
    updateTimeRecord,
    setCurrentTimeRecord,
    removePlayingTimeRecord,
    resetTimerValues,
    setRange,
  } = props;
  const [mode, setMode] = useState(TRACKER_MODE.TRACK);
  const { timeFormat, dateFormat } = useTimeformat();
  const userId = useSelector<any>((state) => state.user.auth0UserId) as string;
  const { self: createPermit } = useCreatePermissions();
  const { self: deletePermit } = useDeletePermissions();
  const renderTotalTimeByDay = (timeRecords: ITimeRecord[]) => {
    let totalTime = 0;
    for (let i = 0; i < timeRecords.length; i++) {
      totalTime += moment(timeRecords[i].endTime).valueOf() - moment(timeRecords[i].startTime).valueOf();
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
      description: currentTimeRecord.description,
      projectId: currentTimeRecord.projectId,
      isBillable: currentTimeRecord.isBillable,
    };
    if (currentTimeRecord.id === undefined || currentTimeRecord.id === '') createTimeRecord(newTimeRecord);
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

  const updatePlayingTimeRecord = (timeRecord: ITimeRecord) => {
    setCurrentTimeRecord(timeRecord);
    if (currentTimeRecord.id !== undefined && currentTimeRecord.id !== '') {
      updateTimeRecord(timeRecord.id, { ..._.omit(timeRecord, ['__typename', 'id']) });
    }
  };

  const TimeRecordGroup = (records: ITimeRecord[], index) => {
    return (
      <Card
        title={
          <Row>
            <Col>{renderDayDateString(records[0].endTime, 'ddd, MMM DD')}</Col>
            <Spacer />
            <Col> Total time: {renderTotalTimeByDay(records)}</Col>
          </Row>
        }
        style={{ marginTop: '10px' }}
        bodyStyle={{ padding: '0px' }}
        key={`timerecord-group-${index}`}
      >
        {records.map((timeRecord) => (
          <TimerActivityItem
            key={timeRecord.id}
            timeRecord={timeRecord}
            timeRecords={timeRecords}
            projects={projects}
            disablePlay={createPermit !== IPermissionType.Allow}
            disableDelete={deletePermit !== IPermissionType.Allow}
            removeTimeRecord={removeTimeRecord}
            updateTimeRecord={updateTimeRecord}
            handlePlayTimer={handlePlayTimer}
          />
        ))}
      </Card>
    );
  };

  return (
    <div className={css(styleSheet.root as any)}>
      <PageContainer>
        <PageHeader disabledTitle={isMobile}>
          <TimerSearchComponent weekStart={weekStart} {...range} setRange={setRange} />
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
                disable={createPermit !== IPermissionType.Allow}
                createTimeRecord={createTimeRecord}
                currentTimeRecord={currentTimeRecord}
                updatePlayingTimeRecord={updatePlayingTimeRecord}
                removePlayingTimeRecord={removePlayingTimeRecord}
              />
            </div>
            <CustomScrollbar>
              <div className="main-page__list">
                <div className="current-week">
                  <Row style={{ padding: '0 20px' }}>
                    <Col>Current Week</Col>
                    <Spacer />
                    <Col>{renderTotalTimeByDay(currentWeekRecords(timeRecords, weekStart))}</Col>
                  </Row>
                  {groupTimeRecords(currentWeekRecords(timeRecords, weekStart), weekStart, dateFormat).map(
                    (dayRecords, index) => TimeRecordGroup(dayRecords, index),
                  )}
                </div>

                {groupTimeRecords(pastWeekRecords(timeRecords, weekStart), weekStart, dateFormat).map(
                  (dayRecords, index) => TimeRecordGroup(dayRecords, index),
                )}
              </div>
            </CustomScrollbar>
          </div>
        </TutorialComponent>
      </PageContainer>
    </div>
  );
};

export default TimerActivity;

export const styleSheet = {
  root: () => ({
    position: 'relative',
    width: '100%',
    '& .main-page': {
      display: 'flex',
      flexDirection: 'column',
      '@media(max-width: 758px)': {
        padding: '0px',
        marginLeft: '-20px',
        marginRight: '-20px',
      },
      fontSize: '1.2rem',
      lineHeight: '1.6rem',
      overflow: 'hidden',
      height: '140vh',
    },
    '& .main-page__list': {
      flexGrow: '1',
      height: '100%',
      backgroundColor: '#f0f2f5',
    },

    '& .mainPage--mobile': {
      padding: '0 1rem 0 1rem',
    },
  }),
};
