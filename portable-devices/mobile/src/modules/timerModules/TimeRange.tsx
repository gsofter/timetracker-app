/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Button } from 'native-base';
import CalendarPicker from 'react-native-calendar-picker';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

import { Weeks, Months } from "../../constants/Data"

const TimeRange = ({ onDateChange, onReset, selectedStartDate, selectedEndDate }: any) => {
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <View>
            <View style={styles.textStyle}>
                <Text onPress={() => setModalVisible(true)}>
                    {selectedStartDate ? selectedStartDate.toString() : ''}
                </Text>
                <Icon style={styles.font_size} name="arrow-forward-outline" />
                <Text onPress={() => setModalVisible(true)}>
                    {selectedEndDate ? selectedEndDate.toString() : ''}
                </Text>
                <Icon style={styles.font_size} name="today-outline" />
                <Button info onPress={() => onReset()} ><Text>Rest</Text></Button>
            </View>
            <Dialog
                visible={modalVisible}
                onTouchOutside={() => {
                    setModalVisible(false)
                }}
            >
                <DialogContent>
                    <View>
                        <CalendarPicker
                            startFromMonday
                            allowRangeSelection
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
                            onDateChange={onDateChange}
                        />
                    </View>
                </DialogContent>
            </Dialog>
        </View>
    )
}

const styles = StyleSheet.create({
  textStyle: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
  font_size: {
      fontSize: 18,
      color: 'grey',
      marginRight: 10,
      marginLeft: 10,
  },
})

export default TimeRange;