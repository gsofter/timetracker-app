/* eslint-disable react/jsx-boolean-value */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Icon, Item, Input, Row, Col } from 'native-base';
import { View, StyleSheet, Text, Platform } from 'react-native';

import TimeTrack from './TimeTrack'
import ManualTime from "./ManualTime"

const TimerFooter = ({ billable, onManual, onTrack, manual, track, toggleBillable, toggleProject, isToggle }: any) => {

  const [startTime, setStartTime] = useState(new Date(1598051730000))
  const [isStartTime, setIsStartTime] = useState(false)
  const [endTime, setEndTime] = useState(new Date(1598051730000))
  const [isEndTime, setIsEndTime] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date(1598051730000))
  const [calendarVisible, setCalendarVisible] = useState(false)
  const [stopwatchStart, setStopWatchStart] = useState(false)
  const [isStart, setIsStart] = useState(true)
  const [isStop, setIsStop] = useState(false)

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

  const onDateChange = (event: any, date: any) => {
    setSelectedDate(date);
    setCalendarVisible(Platform.OS === 'ios')
  };

  const getFormattedTime = (time: any) => {
    const currentTime = time;
  };

    return (
        <View style={styles.footer}>
        <View style={styles.row}>
          <Item regular style={{ width: '80%', height: 40 }}>
            <Input style={{ height: 40 }} placeholder="What are you working on?" />
          </Item>
          <View style={styles.row_button}>
            <View style={styles.button}>
              <Icon style={{ color: '#62b1f6' }} name="add-circle-outline" />
              <Text style={{ color: '#62b1f6' }} onPress={() => toggleProject()}>
                Projects
              </Text>
            </View>
            {isToggle && (
              <View>
                <Text>Project List</Text>
              </View>
            )}
          </View>
        </View>
        <Row style={styles.row_2}>
        <Col style={{ width: 30 }}>
          <Icon name="pricetag-outline" style={styles.icon_tag} />
        </Col>
        <Col style={{ width: 15 }}>
          <Icon
          onPress={() => toggleBillable()}
          type="FontAwesome"
          name="dollar"
          style={[styles.icon_dollar, { color: billable ? '#1890ff' : 'grey' }]}
          />
        </Col>
          {track && (
            <TimeTrack 
            stopwatchStart={stopwatchStart}
            setIsStart={setIsStart}
            getFormattedTime={getFormattedTime}
            isStart={isStart}
            isStop={isStop}
            setStopWatchStart={setStopWatchStart}
            setIsStop={setIsStop}
            />
          )}
          {manual && (
            <ManualTime 
            toggleStart={toggleStart}
            startTime={startTime}
            isStartTime={isStartTime}
            changeStartTime={changeStartTime}
            toggleEnd={toggleEnd}
            endTime={endTime}
            changeEndTime={changeEndTime}
            setCalendarVisible={setCalendarVisible}
            selectedDate={selectedDate}
            calendarVisible={calendarVisible}
            onDateChange={onDateChange}
            isEndTime={isEndTime}
            />
          )}
          <Col>
            <Icon onPress={() => onTrack()} name="time-outline" style={{ alignSelf: 'center', color: track? '#1890ff': 'grey' }} />
            <Icon onPress={() => onManual()} name="list-outline" style={{ alignSelf: 'center', color: manual? '#1890ff': 'grey' }} />
          </Col>
        </Row>
      </View>
    )
}

const styles = StyleSheet.create({
    footer: {
      borderTopColor: '#1f1f1f',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'white',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      paddingLeft: 10,
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 40,
      alignItems: 'center',
    },
    row_2: {
      display: 'flex',
      paddingLeft: 10,
      paddingTop: 10,
      paddingBottom: 10,
      alignItems: 'center',
    },
    row_button: {
      width: '30%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon_tag: {
      color: 'black',
      fontSize: 18
    },
    icon_dollar: {
      fontSize: 18,
    },
});

export default TimerFooter;