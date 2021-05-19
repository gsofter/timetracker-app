import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  useCreateTimeRecordMutation,
  useGetDurationTimeRecordsQuery,
  useGetPlayingTimeRecordQuery,
  useRemoveTimeRecordMutation,
  useUpdateTimeRecordMutation,
  useGetProjectsQuery,
} from '../../../generated-models';
import { ITimeRecordRequest, ITimeRecord, IPermissionType } from '@admin-layout/timetracker-core';
import { message, Spin } from 'antd';
import * as _ from 'lodash';
import Timer from 'react-compound-timer';
import { useSelector } from 'react-redux';
import { useFirstWeekDay } from '../../hooks';
import TimerActivity from './TimerActivity';
import { useCreatePermissions, useDeletePermissions } from '../../hooks';

const TimeTrackerWrapper = (props) => {
  const { setTime, reset, stop, start } = props.timer;
  const userId = useSelector<any>((state) => state.user.auth0UserId) as string;
  const [range, setRange] = useState({ startTime: moment().startOf('month'), endTime: moment().endOf('month') });
  const { data, error, refetch, loading } = useGetDurationTimeRecordsQuery({
    variables: { userId, startTime: range.startTime, endTime: range.endTime },
  });
  const { data: plData, refetch: plRefetch, loading: plLoading } = useGetPlayingTimeRecordQuery();
  const [createMutation] = useCreateTimeRecordMutation();
  const [removeMutation] = useRemoveTimeRecordMutation();
  const [updateMutation] = useUpdateTimeRecordMutation();
  const { data: projectsData, loading: loadingProjects } = useGetProjectsQuery();
  const { value: dowValue } = useFirstWeekDay();
  const [weekStart, setWeekStart] = useState(moment().startOf('week'));
  const { self: createPermit } = useCreatePermissions();
  const { self: deletePermit } = useDeletePermissions();
  useEffect(() => {
    moment.locale('en', {
      week: {
        dow: dowValue,
      },
    });
    setWeekStart(moment().startOf('week'));
  }, []);

  // create time record
  const createTimeRecord = (request: ITimeRecordRequest) => {
    if (createPermit !== IPermissionType.Allow) {
      message.warning('Permission Not Allowed');
      return;
    }
    createMutation({ variables: { request } })
      .then(() => {
        message.info('TimeRecord created');
        plRefetch();
        refetch();
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  // remove time record
  const removeTimeRecord = (recordId: string) => {
    if (deletePermit !== IPermissionType.Allow) {
      message.warning('Permission Not Allowed');
      return;
    }
    removeMutation({ variables: { recordId } })
      .then(() => {
        message.success('TimeRecord Removed');
        refetch();
      })
      .catch((error) => {
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
      .catch((error) => {
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
      .catch((error) => {
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
    if (plData && plData.getPlayingTimeRecord) {
      const playingRecord = plData.getPlayingTimeRecord;
      const passDur = moment().valueOf() - moment(playingRecord.startTime).valueOf();
      setCurrentTimeRecord(playingRecord);
      setIsRecording(true);
      setTime(passDur);
      start();
    }
  }, [plData, plLoading]);

  return (
    <Spin spinning={!data || loading}>
      <TimerActivity
        {...props}
        weekStart={weekStart}
        range={range}
        projects={_.get(projectsData, 'getProjects', [])}
        createTimeRecord={createTimeRecord}
        removeTimeRecord={removeTimeRecord}
        removePlayingTimeRecord={removePlayingTimeRecord}
        updateTimeRecord={updateTimeRecord}
        timeRecords={_.get(data, 'getDurationTimeRecords', [])}
        setIsRecording={setIsRecording}
        setCurrentTimeRecord={setCurrentTimeRecord}
        currentTimeRecord={currentTimeRecord}
        isRecording={isRecording}
        resetTimerValues={resetTimerValues}
        setRange={setRange}
      />
    </Spin>
  );
};

const withTimer = (timerProps) => (WrappedComponent) => (wrappedComponentProps) =>
  (
    <Timer {...timerProps}>
      {(timerRenderProps) => <WrappedComponent {...wrappedComponentProps} timer={timerRenderProps} />}
    </Timer>
  );

export default withTimer({ startImmediately: false })(TimeTrackerWrapper);
