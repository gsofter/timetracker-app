import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { StyleSheet, View, ScrollView } from 'react-native';
import {useHistory} from "react-router-native"

import TimerFooter from './TimerFooter';
import TimeRange from './TimeRange';
import {
  ITimeRecordRequest,
  ITimeRecord
} from '@admin-layout/timetracker-core';
import {
  useCreateTimeRecordMutation,
  useGetPlayingTimeRecordQuery,
  useGetDurationTimeRecordsQuery,
  useUpdateTimeRecordMutation
} from '../../generated-models';

const TimerScreen = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [billable, setBillable] = useState(false);
  const [track, setTrack] = useState(true);
  const [manual, setManual] = useState(false);
  const [addManual, setAddManual] = useState(false);
  const [timeRecord, setTimeRecord] = useState<ITimeRecord>({
    userId: '',
    taskName: '',
    tags: [],
    startTime: null,
    projectId: '',
    isBillable: billable,
    endTime: null
  })
  const [selectedStartDate, setSelectedStartDate] = useState<any>(moment().format('MM-DD-YYYY'));
  const [selectedEndDate, setSelectedEndDate] = useState<any>(moment().add(5, 'd').format('MM-DD-YYYY'));
  const [createMutation] = useCreateTimeRecordMutation();
  const [updateMutation] = useUpdateTimeRecordMutation();
  const { data, error, refetch, loading } = useGetDurationTimeRecordsQuery({
    variables: { userId: timeRecord.userId, startTime: timeRecord.startTime, endTime: timeRecord.endTime },
  });
  const { data: plData, refetch: plRefetch, loading: plLoading } = useGetPlayingTimeRecordQuery();

  const toggleProject = () => {
    setIsToggle(!isToggle);
  };

  const toggleBillable = () => {
    setBillable(!billable);
  };

  const onDateChange = (date: any, type: any) => {
    const Date = moment(date).format('MM-DD-YYYY')
    if (type === 'END_DATE') {
      setSelectedEndDate(Date);
    } else {
      setSelectedStartDate(Date);
    }
  };

  const onReset = () => {
    setSelectedEndDate(moment().format('MM-DD-YYYY'));
    setSelectedStartDate(moment().add(5, 'd').format('MM-DD-YYYY'));
  };

  const onTrack = () => {
    setTrack(true);
    setManual(false);
  };

  const onManual = () => {
    setManual(true);
    setTrack(false);
  };

  const createTimeRecord = (request: ITimeRecordRequest) => {
    createMutation({ variables: { request } })
      .then(() => {
        alert('TimeRecord created');
        plRefetch();
        refetch();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const updateTimeRecord = (recordId: string, request: ITimeRecordRequest) => {
    updateMutation({ variables: { recordId, request } })
      .then(() => {
        alert('TimeRecord Updated');
        refetch();
        plRefetch();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TimeRange
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          onDateChange={onDateChange}
          onReset={onReset}
        />
      </ScrollView>
      <TimerFooter
        isToggle={isToggle}
        billable={billable}
        toggleProject={toggleProject}
        toggleBillable={toggleBillable}
        track={track}
        manual={manual}
        onTrack={onTrack}
        onManual={onManual}
        setAddManual={setAddManual}
        setTimeRecord={setTimeRecord}
        timeRecord={timeRecord}
        createTimeRecord={createTimeRecord}
        updateTimeRecord={updateTimeRecord}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
  },
});
export default TimerScreen;
