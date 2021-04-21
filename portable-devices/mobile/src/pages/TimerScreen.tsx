/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import TimerFooter from '../modules/timerModules/TimerFooter';
import TimeRange from '../modules/timerModules/TimeRange';

const TimerScreen = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [billable, setBillable] = useState(false);
  const [track, setTrack] = useState(true);
  const [manual, setManual] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<any>('Start Date');
  const [selectedEndDate, setSelectedEndDate] = useState<any>('End Date');

  const toggleProject = () => {
    setIsToggle(!isToggle);
  };

  const toggleBillable = () => {
    setBillable(!billable);
  };

  const onDateChange = (date: any, type: any) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
    }
  };

  const onReset = () => {
    setSelectedEndDate(null);
    setSelectedStartDate(null);
  };

  const onTrack = () => {
    setTrack(true);
    setManual(false);
  };

  const onManual = () => {
    setManual(true);
    setTrack(false);
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
