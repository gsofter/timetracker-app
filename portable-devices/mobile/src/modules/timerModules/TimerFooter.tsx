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
import { Icon, Item, Input, Row, Col, Button } from 'native-base';
import { View, StyleSheet, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

import { Weeks, Months } from "../../constants/Data"

const TimerFooter = ({ billable, onManual, onTrack, manual, track, toggleBillable, toggleProject, isToggle }: any) => {

  const [startTime, setStartTime] = useState(new Date(1598051730000))
  const [isStartTime, setIsStartTime] = useState(false)
  const [endTime, setEndTime] = useState(new Date(1598051730000))
  const [isEndTime, setIsEndTime] = useState(false)
  const [selectedDate, setSelectedDate] = useState(moment().format('M-DD-YY'))
  const [calendarVisible, setCalendarVisible] = useState(false)

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

  const onDateChange = (date: any, type: any) => {
    const Date = moment(date).format('M-DD-YY')
    if (type === 'END_DATE') {
      setSelectedDate(Date);
    }
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
            <>
                <Col>
                    <Text>00:00:00</Text>
                </Col>
                <Col>
                    <Button info block>
                        <Text style={{ color: 'white' }}>Start</Text>
                    </Button>
                </Col>
            </>
          )}
          {manual && (
            <>
              <Col style={{ width: 60 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text onPress={() => toggleStart()}>{moment(startTime).format('hh:mm')}</Text>
                  <Icon style={styles.font_size} name="arrow-forward-outline" />
                </View>
                {isStartTime && 
                  <DateTimePicker
                  testID="dateTimePicker"
                  value={startTime}
                  mode='time'
                  is24Hour={false}
                  display="default"
                  onChange={changeStartTime}
                />}
              </Col>
              <Col style={{ width: 60 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text onPress={() => toggleEnd()}>{moment(endTime).format('hh:mm')}</Text>
                  <Icon style={styles.font_size} name="time-outline" />
                </View>
                {isEndTime && 
                <DateTimePicker
                  testID="dateTimePicker"
                  value={endTime}
                  mode='time'
                  is24Hour={false}
                  display="default"
                  onChange={changeEndTime}
                />}
              </Col>
              <Col>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text onPress={() => setCalendarVisible(true)}>
                        {selectedDate ? selectedDate.toString() : ''}
                    </Text>
                    <Icon style={styles.font_size} name="today-outline" />
                    <Button info small block><Text style={styles.add_btn}>Add</Text></Button>
                  </View>
                  {calendarVisible && 
                  <Dialog
                    visible={calendarVisible}
                    onTouchOutside={() => {
                      setCalendarVisible(false)
                    }}
                  >
                    <DialogContent>
                        <View>
                          <CalendarPicker
                            startFromMonday
                            minDate={new Date(2018, 1, 1)}
                            maxDate={new Date(2050, 6, 3)}
                            weekdays={Weeks}
                            months={Months}
                            previousTitle={<Icon name="caret-back-circle-outline" />}
                            nextTitle={<Icon name="caret-forward-circle-outline" />}
                            todayBackgroundColor="#e6ffe6"
                            selectedDayColor="#66ff33"
                            selectedDayTextColor="#000000"
                            scaleFactor={375}
                            textStyle={{
                            color: '#000000',
                            }}
                            onDateChange={(date, type) => onDateChange(date, "END_DATE")}
                        />
                        </View>
                    </DialogContent>
                </Dialog>}
              </Col>
            </>
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
    font_size: {
      fontSize: 18,
      color: 'grey',
      marginRight: 5,
      marginLeft: 5,
  },
  add_btn: {
    paddingLeft: 5,
    paddingRight: 5,
    color: 'white'
  }
});

export default TimerFooter;