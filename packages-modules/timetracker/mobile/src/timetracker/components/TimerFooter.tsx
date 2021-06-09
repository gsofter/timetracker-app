import React, { useState, useEffect } from 'react';
import { Icon, Item, Input, Button } from 'native-base';
import { View, StyleSheet, Text, Platform } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { useHistory } from 'react-router-native';
import { useSelector } from 'react-redux';
import * as _ from 'lodash';
import moment from 'moment';

import TimeTrack from './TimeTrack'
import ProjectModal from "./ProjectModal"
import {
  ITimeRecordRequest,
} from '@admin-layout/timetracker-core/src/interfaces/generated-models';

var radio_props = [
  { label: 'Manual', value: 0 },
  { label: 'Timer', value: 1 }
];

const TimerFooter = ({
  billable,
  onManual,
  onTrack,
  manual,
  track,
  toggleBillable,
  setAddManual,
  setTimeRecord,
  timeRecord,
  createTimeRecord,
  updateTimeRecord,
  plData,
  projectsData
}: any) => {

  const [stopwatchStart, setStopWatchStart] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [isStart, setIsStart] = useState(true)
  const [isStop, setIsStop] = useState(false)
  const history = useHistory<any>()
  const user = useSelector((state: any) => state?.user)
  const [tag, setTag] = useState({
    showTag: false,
    tags: [],
  })

  useEffect(() => {
    setTimeRecord(ps => ({ ...ps, isBillable: billable, tags: tag.tags }))
    if (user) {
      setTimeRecord(ps => ({ ...ps, userId: user.auth0UserId }));
    }
  }, [history, billable, tag.tags])

  const getFormattedTime = (time: any) => {
    //console.log("TIME", time)
  };

  const setTimer = () => {
    onTrack()
    setAddManual(false)
  }

  const handleStartTimer = () => {
    const newTimeRecord: ITimeRecordRequest = {
      ..._.omit(timeRecord, ['id', '__typename']),
      startTime: moment(),
      endTime: null,
    };
    setTimeRecord(newTimeRecord)
    createTimeRecord(newTimeRecord);
  };
  const updatePlayingTimeRecord = () => {
    const {id, ...rest} = timeRecord;
    const newTimeRecord: ITimeRecordRequest = {
      ...rest,
      endTime: moment(),
    };
    setTimeRecord(newTimeRecord)
    updateTimeRecord(plData.getPlayingTimeRecord.id, newTimeRecord);
  };

  return (
    <View style={[styles.footer, Platform.OS === 'android' && { position: 'absolute', bottom: 0 }]}>
      {!manual && (
        <View>
          <View style={styles.row}>
            <Item regular style={{ width: '80%', height: 40 }}>
              <Input onChangeText={(value) => setTimeRecord(ps => ({ ...ps, taskName: value }))} placeholder="What are you working on?" />
            </Item>
            <View style={styles.row_button}>
              <Button iconLeft transparent onPress={() => setModalVisible(true)}>
                <Icon style={{ color: '#62b1f6' }} name='add-circle-outline' />
                <Text style={{ color: '#62b1f6' }}>Projects</Text>
              </Button>
              <ProjectModal plData={plData} updateTimeRecord={updateTimeRecord} timeRecord={timeRecord} setTimeRecord={setTimeRecord} projectsData={projectsData} setModalVisible={setModalVisible} modalVisible={modalVisible}/>
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
              handleStartTimer={handleStartTimer}
              updateTimeRecord={updateTimeRecord}
              updatePlayingTimeRecord={updatePlayingTimeRecord}
              setTimeRecord={setTimeRecord}
              setTag={setTag}
              tag={tag}
              plData={plData}
              timeRecord={timeRecord}
            />
          )}
        </View>
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
            <Icon style={styles.icon} name='add-outline' />
          </Button>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    borderTopColor: '#1f1f1f',
    right: 0,
    left: 0,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
  },
  row: {
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
  },
  icon: {
    color: 'white',
  }
});

export default TimerFooter;