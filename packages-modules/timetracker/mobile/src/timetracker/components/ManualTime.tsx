import React from 'react';
import { Col, Icon, Button } from 'native-base';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const ManualTime = ({
    toggleStart,
    startTime,
    isStartTime,
    changeStartTime,
    toggleEnd,
    endTime,
    changeEndTime,
    setCalendarVisible,
    selectedDate,
    calendarVisible,
    onDateChange,
    isEndTime
}: any) => {
    return (
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
                        {moment(selectedDate).format('M-DD-YY')}
                    </Text>
                    <Icon style={styles.font_size} name="today-outline" />
                    <Button info small block><Text style={styles.add_btn}>Add</Text></Button>
                </View>
                {calendarVisible && 
                <DateTimePicker
                testID="dateTimePicker"
                value={selectedDate}
                mode='date'
                display="default"
                onChange={onDateChange}
                />}
            </Col>
        </>
    )
}

const styles = StyleSheet.create({
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
      },
})

export default ManualTime;