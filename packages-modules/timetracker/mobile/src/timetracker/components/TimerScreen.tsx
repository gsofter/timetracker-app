import React, { useState } from 'react';
import moment from 'moment';
import { StyleSheet, View, ScrollView, Platform, Text } from 'react-native';
//import KeyboardSpacer from 'react-native-keyboard-spacer';

import TimerFooter from './TimerFooter';
import TimeRange from './TimeRange';
import TimeList from "./TimeList"
import {
  ITimeRecordRequest,
  ITimeRecord
} from '@admin-layout/timetracker-core';
import {
  useCreateTimeRecordMutation,
  useGetPlayingTimeRecordQuery,
  useGetDurationTimeRecordsQuery,
  useUpdateTimeRecordMutation,
  useGetProjectsQuery
} from '../../generated-models';
import { useSelector } from 'react-redux';

const TimerScreen = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [billable, setBillable] = useState(false);
  const userId = useSelector<any>((state) => state.user.auth0UserId) as string;
  const [track, setTrack] = useState
    (true);
  const [manual, setManual] = useState(false);
  const [addManual, setAddManual] = useState(false);
  const [timeRecord, setTimeRecord] = useState<ITimeRecord>({
    id: '',
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
  const [range, setRange] = useState({ startTime: moment().startOf('week'), endTime: moment().endOf('week') });
  const { data: projectsData, loading: loadingProjects } = useGetProjectsQuery();
  const { data, error, refetch, loading } = useGetDurationTimeRecordsQuery({
    variables: { userId: userId, startTime: range.startTime, endTime: range.endTime },
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
      setRange(ps => ({...ps, endTime: date}))
      refetch()
      setSelectedEndDate(Date);
    } else {
      setRange(ps => ({...ps, startTime: date}))
      refetch()
      setSelectedStartDate(Date);
    }
  };

  const onReset = () => {
    setRange({startTime: moment().startOf('week'), endTime: moment().endOf('week')})
    refetch()
    setSelectedStartDate(moment().format('MM-DD-YYYY'));
    setSelectedEndDate(moment().add(5, 'd').format('MM-DD-YYYY'));
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
        console.log(error);
      });
  };

  const updateTimeRecord = (recordId: string, request: ITimeRecordRequest) => {
    updateMutation({ variables: { recordId, request } })
      .then((res) => {
        alert('TimeRecord Updated');
        refetch();
        plRefetch();
      })
      .catch((error) => {
        console.log(error);
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
        {data && data.getDurationTimeRecords.length ? (
          <TimeList 
            data={data} 
            timeRecord={timeRecord}
            setTimeRecord={setTimeRecord}
            updateTimeRecord={updateTimeRecord}
          />
        ): (
          <Text style={{textAlign: 'center'}}>No Data</Text>
        )}
      </ScrollView>
      <View style={{ flex: Platform.OS === 'ios' ? 1 : 0 }}>
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
          plData={plData}
          createTimeRecord={createTimeRecord}
          updateTimeRecord={updateTimeRecord}
          projectsData={projectsData}
        />
      </View>
     {/*  {Platform.OS === 'ios' &&
        <KeyboardSpacer />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f0f2f5',
  },
});
export default TimerScreen;
