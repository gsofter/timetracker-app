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

const TimeRange = ({ onDateChange, selectedStartDate, selectedEndDate }: any) => {
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <View>
            <View style={styles.textStyle}>
                <Text style={styles.textStyle}>Selected Start Date :</Text>
                <Text style={styles.textStyle}>
                    {selectedStartDate ? selectedStartDate.toString() : ''}
                </Text>
                <Text style={styles.textStyle}>Selected End Date :</Text>
                <Text style={styles.textStyle}>{selectedEndDate ? selectedEndDate.toString() : ''}</Text>
            </View>
            <Button onPress={() => setModalVisible(true)}><Text>Open Modal</Text></Button>
            <Dialog
                visible={modalVisible}
                onTouchOutside={() => {
                    setModalVisible(false)
                }}
            >
                <DialogContent>
                    <Text>Hello</Text>
                </DialogContent>
            </Dialog>
            {/* <View>
                <CalendarPicker
                    startFromMonday
                    allowRangeSelection
                    minDate={new Date(2018, 1, 1)}
                    maxDate={new Date(2050, 6, 3)}
                    weekdays={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
                    months={[
                    'January',
                    'Febraury',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                    ]}
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
             */}
        </View>
    )
}

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 10,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
})

export default TimeRange;