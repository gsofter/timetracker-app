import React from 'react';
import { Col, Button, Icon, Row } from 'native-base';
import { Text, StyleSheet } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';

const TimeTrack = ({ 
    stopwatchStart, 
    setIsStart, 
    getFormattedTime, 
    isStart, 
    isStop, 
    setStopWatchStart, 
    setIsStop,
    onTrack,
    onManual,
    track,
    manual,
    toggleBillable,
    billable,
    handleStartTimer,
    updatePlayingTimeRecord,
    setTimeRecord 
}: any) => {
    return (
        <Row style={styles.row_2}>
            <Col style={{ width: 30 }}>
                <Icon name="pricetag-outline" style={styles.icon_tag} />
            </Col>
            <Col style={{ width: 15 }}>
                <Icon
                onPress={() => {
                    toggleBillable()
                    setTimeRecord(ps => ({...ps, isBillable: billable}))
                }}
                type="FontAwesome"
                name="dollar"
                style={[styles.icon_dollar, { color: billable ? '#1890ff' : 'grey' }]}
                />
            </Col>
            <Col>
                <Stopwatch laps start={stopwatchStart}
                    options={option}
                    getTime={getFormattedTime} />
            </Col>
            <Col>
            {isStart && 
                <Button info block>
                    <Text style={{ color: 'white' }} onPress={() => {
                    setStopWatchStart(true)
                    handleStartTimer()
                    setIsStop(true)
                    setIsStart(false)
                    }}>Start</Text>
                </Button> 
            }
            {isStop && 
                <Button danger block>
                    <Text style={{ color: 'white' }} onPress={() => {
                    setStopWatchStart(false)
                    setIsStop(false)
                    setIsStart(true)
                    updatePlayingTimeRecord()
                    }}>Stop</Text>
                </Button> 
            }
            </Col>
            <Col>
                <Icon onPress={() => onTrack()} name="time-outline" style={{ alignSelf: 'center', color: track? '#1890ff': 'grey' }} />
                <Icon onPress={() => onManual()} name="list-outline" style={{ alignSelf: 'center', color: manual? '#1890ff': 'grey' }} />
            </Col>
        </Row>
    )
}

const option = {
    container: {
      backgroundColor: 'white',
      padding: 5,
      borderRadius: 5,
    },
    text: {
      fontSize: 14,
      color: 'black',
      marginLeft: 7,
    },
};

const styles = StyleSheet.create({
    icon_tag: {
        color: 'black',
        fontSize: 18
    },
    icon_dollar: {
        fontSize: 18,
    },
    row_2: {
        display: 'flex',
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
    },
})

export default TimeTrack;