import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { SubscribeToMoreOptions } from '@apollo/client';
import {
  useCreateTimeRecordMutation,
  useGetDurationTimeRecordsQuery,
  useGetPlayingTimeRecordQuery,
  useRemoveTimeRecordMutation,
  useUpdateTimeRecordMutation,
  useGetProjectsQuery,
} from '../../../generated-models';
import {
  ITimeRecordRequest,
  ITimeRecord,
  IPermissionType,
  IGetPlayingTimeRecordQuery,
  IGetPlayingTimeRecordQueryVariables,
  SubscribeToTimeTrackerDocument,
  ISubscribeToTimeTrackerSubscriptionVariables,
  ISubscribeToTimeTrackerSubscription,
  ITimeRecordPubSubEvents,
} from '@admin-layout/timetracker-core';
import { useDispatch, useSelector } from 'react-redux';
import { message, Spin } from 'antd';
import * as _ from 'lodash';
import { useFirstWeekDay } from '../../hooks';
import TimerActivity from './TimerActivity';
import { setCurrentTimerAction } from '@admin-layout/timetracker-core'
import { useCreatePermissions, useDeletePermissions } from '../../hooks';

type TimeTrackerSubscription = SubscribeToMoreOptions<
  IGetPlayingTimeRecordQuery,
  ISubscribeToTimeTrackerSubscriptionVariables,
  ISubscribeToTimeTrackerSubscription
>;

const TimeTrackerWrapper = (props) => {
  const userId = useSelector<any>((state) => state.user.auth0UserId) as string;
  const orgName = useSelector<any>((state) => state.platform.orgName) as string;
  const [range, setRange] = useState({ startTime: moment().startOf('month'), endTime: moment().endOf('month') });
  const {
    data,
    error,
    refetch,
    loading,
    subscribeToMore: subscribeDurationTimeRecord,
  } = useGetDurationTimeRecordsQuery({
    variables: { userId, startTime: range.startTime, endTime: range.endTime },
  });
  const { data: plData, loading: plLoading, subscribeToMore } = useGetPlayingTimeRecordQuery();
  const [createMutation] = useCreateTimeRecordMutation();
  const [removeMutation] = useRemoveTimeRecordMutation();
  const [updateMutation] = useUpdateTimeRecordMutation();
  const { data: projectsData, loading: loadingProjects } = useGetProjectsQuery();
  const { value: dowValue } = useFirstWeekDay();
  const [weekStart, setWeekStart] = useState(moment().startOf('week'));
  const { self: createPermit } = useCreatePermissions();
  const { self: deletePermit } = useDeletePermissions();
  const dispatch = useDispatch();

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
        // refetch();
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
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  // remove current playing time record
  const removePlayingTimeRecord = () => {
    removeMutation({ variables: { recordId: currentTimeRecord.id } })
      .then(() => {
        message.success('TimeRecord Removed');
        resetTimerValues();
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const resetTimerValues = () => {
    setIsRecording(false);
    const defaultPlayingRecord = {
      startTime: null,
      description: '',
      endTime: null,
      isBillable: false,
      projectId: '',
      taskName: '',
    };
    setCurrentTimeRecord({ ...defaultPlayingRecord, startTime: moment() });
    dispatch(setCurrentTimerAction(defaultPlayingRecord));
  };

  const getSubscriptionOptions = ({
    userId,
    orgName,
  }: {
    userId: string;
    orgName: string;
  }): TimeTrackerSubscription => {
    return {
      document: SubscribeToTimeTrackerDocument,
      variables: { userId, orgName },
      updateQuery: (prev, { subscriptionData }) => {
        const { } = prev;
        if (!subscriptionData.data.SubscribeToTimeTracker) {
          return prev;
        }
        const subscribedData = subscriptionData.data.SubscribeToTimeTracker;
        if (
          (subscribedData.mutation === ITimeRecordPubSubEvents.TimeRecordCreated ||
            subscribedData.mutation === ITimeRecordPubSubEvents.TimeRecordUpdated) &&
          subscribedData.timeRecord?.endTime === null
        ) {
          const newData = _.merge({}, prev, {
            getPlayingTimeRecord: subscriptionData.data.SubscribeToTimeTracker.timeRecord,
          });
          return newData;
        } else if (
          subscribedData.mutation === ITimeRecordPubSubEvents.TimeRecordUpdated &&
          subscribedData.timeRecord?.endTime !== null
        ) {
          return {
            getPlayingTimeRecord: {
              __typename: "TimeRecord",
              id: '',
              description: '',
              endTime: '',
              isBillable: false,
              projectId: '',
              taskName: '',
              tags: [],
              startTime: '',
              userId: '',
            },
          };
        }
      },
    };
  };

  const [currentTimeRecord, setCurrentTimeRecord] = useState<ITimeRecord>({
    startTime: null,
    endTime: null,
    isBillable: false,
    description: '',
    projectId: '',
    taskName: '',
  });
  const [isRecording, setIsRecording] = useState(false);
  useEffect(() => {
    const unsubscribe = subscribeToMore(getSubscriptionOptions({ userId, orgName }));
    return () => unsubscribe();
  }, [orgName, userId, subscribeToMore]);

  useEffect(() => {
    if (plData && plData.getPlayingTimeRecord && plData.getPlayingTimeRecord.startTime !== '') {
      console.log('---PLDATA rednered', plData);
      const playingRecord = plData.getPlayingTimeRecord;
      const passDur = moment().valueOf() - moment(playingRecord.startTime).valueOf();
      setCurrentTimeRecord(playingRecord);
      dispatch(setCurrentTimerAction(playingRecord));
      setIsRecording(true);
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

export default TimeTrackerWrapper;
