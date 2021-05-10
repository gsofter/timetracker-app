import React, { useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'native-base';
import CalendarPicker from 'react-native-calendar-picker';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Weeks, Months } from '../../constants/data';

const TimeRange = ({ onDateChange, onReset, selectedStartDate, selectedEndDate }: any) => {
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <View>
            <View style={styles.textDiv}>
                <TouchableOpacity style={styles.textStyle} onPress={() => setModalVisible(true)}>
                    <Text>
                        {selectedStartDate ? selectedStartDate.toString() : ''}
                    </Text>
                    <Icon style={styles.font_size} name="arrow-forward-outline" />
                    <Text>
                        {selectedEndDate ? selectedEndDate.toString() : ''}
                    </Text>
                    <Icon style={styles.font_size} name="today-outline" />
                </TouchableOpacity>
                <Button block style={styles.button} info onPress={() => onReset()} ><Text style={styles.button_text}>Rest</Text></Button>
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
                            previousComponent={<Icon name="caret-back-circle-outline" />}
                            nextComponent={<Icon name="caret-forward-circle-outline" />}
                            todayBackgroundColor="#e6ffe6"
                            selectedDayColor="#66ff33"
                            selectedDayTextColor="#000000"
                            scaleFactor={375}
                            textStyle={{
                            color: '#000000',
                            }}
                            onDateChange={(date, type) => onDateChange(date, type)}
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
    backgroundColor: 'white',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textDiv: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
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
  button: {
      width: '20%',
      alignItems: 'center'
  },
  button_text: {
      color: 'white',
  }
})

export default TimeRange;