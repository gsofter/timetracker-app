import React, { useState } from 'react';
import { Icon, Item, Input, Button } from 'native-base';
import { View, StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RadioForm from 'react-native-simple-radio-button';
import { useHistory } from "react-router-native"

import TimeTrack from './TimeTrack'

var radio_props = [
  {label: 'Manual', value: 0 },
  {label: 'Timer', value: 1 }
];

const TimerFooter = ({ 
  billable, 
  onManual, 
  onTrack, 
  manual, 
  track, 
  toggleBillable, 
  toggleProject, 
  isToggle,
  setAddManual 
}: any) => {

  const [stopwatchStart, setStopWatchStart] = useState(false)
  const [isStart, setIsStart] = useState(true)
  const [isStop, setIsStop] = useState(false)
  const history = useHistory()

  const getFormattedTime = (time: any) => {
    const currentTime = time;
  };

  const setTimer = () => {
    onTrack()
    setAddManual(false)
  }

    return (
      <View style={styles.footer}>
        {!manual && (
          <KeyboardAwareScrollView>
            <View style={styles.row}>
              <Item regular style={{ width: '80%', height: 40 }}>
                <Input style={{ height: 40 }} placeholder="What are you working on?" />
              </Item>
              <View style={styles.row_button}>
              <Button iconLeft transparent onPress={() => toggleProject()}>
                <Icon style={{ color: '#62b1f6' }} name='add-circle-outline' />
                <Text style={{ color: '#62b1f6' }}>Projects</Text>
              </Button>
                {isToggle && (
                  <View style={{ zIndex: 1 }}>
                    <Text>Project List</Text>
                  </View>
                )}
              </View>
            </View>
            {track && (
              <TimeTrack 
              stopwatchStart={stopwatchStart}
              setIsStart={setIsStart}
              getFormattedTime={getFormattedTime}
              isStart={isStart}
              isStop={isStop}
              setStopWatchStart={setStopWatchStart}
              setIsStop={setIsStop}
              onTrack={onTrack}
              onManual={onManual}
              track={track}
              manual={manual}
              toggleBillable={toggleBillable}
              billable={billable}
              />
            )}
          </KeyboardAwareScrollView>
        )}
        {manual && (
          <View style={styles.flex_row}>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={(value) => value === 1 && setTimer()}
              formHorizontal
              buttonColor={'#1890ff'}
            />
            <Button info block
            onPress={() => history.push('/create')}
            >
              <Text style={styles.add_btn}>+</Text>
            </Button>
          </View>
        )}
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
    row_button: {
      width: '30%',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    flex_row: {
      padding: 30,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    add_btn: {
      color: 'white',
      paddingLeft: 20,
      paddingRight: 20
    }
});

export default TimerFooter;