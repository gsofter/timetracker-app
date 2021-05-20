import React, { useState } from 'react';
import moment from 'moment';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';

import TimerFooter from './TimerFooter';
import TimeRange from './TimeRange';

const TimerScreen = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [billable, setBillable] = useState(false);
  const [track, setTrack] = useState(true);
  const [manual, setManual] = useState(false);
  const [addManual, setAddManual] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<any>(moment().format('MM-DD-YYYY'));
  const [selectedEndDate, setSelectedEndDate] = useState<any>(moment().add(5, 'd').format('MM-DD-YYYY'));
  const [isStartTime, setIsStartTime] = useState(false)
  const [endTime, setEndTime] = useState(new Date(1598051730000))
  const [isEndTime, setIsEndTime] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date(1598051730000))
  const [calendarVisible, setCalendarVisible] = useState(false)
  const [startTime, setStartTime] = useState(new Date(1598051730000))

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

  const onSingleDateChange = (event: any, date: any) => {
    setSelectedDate(date);
    setCalendarVisible(Platform.OS === 'ios')
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

  const toggleStart = () =>{
    setIsStartTime(true)
  }

  const toggleEnd = () => {
    setIsEndTime(true)
  }

  const changeStartTime = (event: any, selectedTime: any) => {
    const currentDate = selectedTime || startTime;
    setStartTime(currentDate)
    setIsStartTime(false)
  };

  const changeEndTime = (event: any, selectedTime: any) => {
    const currentDate = selectedTime || startTime;
    setEndTime(currentDate)
    setIsEndTime(false)
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
        onDateChange={onDateChange}
        setAddManual={setAddManual}
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
