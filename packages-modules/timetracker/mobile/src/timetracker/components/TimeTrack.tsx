import React, {useState} from 'react';
import { Col, Button, Icon, Row } from 'native-base';
import { Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';

import TagModal from "./TagModal"

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
    setTimeRecord,
    tag, 
    setTag
}: any) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [tagName, setTagName] = useState(null)
    const [reset, setReset] = useState(false)

    const addTag = () => {
        setTag(ps => ({...ps, tags: [...tag.tags, tagName], showTag: true}))
    }

    return (
        <Row style={styles.row_2}>
            <Col style={{ width: 30 }}>
                <TouchableHighlight style={styles.icon_press} underlayColor='#eff0f1' onPress={() => setModalVisible(true)}>
                    <Icon name="pricetag-outline" style={styles.icon_tag} />
                </TouchableHighlight>
            </Col>
            <Col style={{ width: 15 }}>
                <Icon
                    onPress={() => {
                        toggleBillable()
                        setTimeRecord(ps => ({ ...ps, isBillable: billable }))
                    }}
                    type="FontAwesome"
                    name="dollar"
                    style={[styles.icon_dollar, { color: billable ? '#1890ff' : 'grey' }]}
                />
            </Col>
            <Col>
                <Stopwatch laps start={stopwatchStart}
                    options={option}
                    getTime={getFormattedTime}
                    reset={reset} />
            </Col>
            <Col>
                {isStart &&
                    <Button info block onPress={() => {
                        setStopWatchStart(true)
                        setIsStop(true)
                        setIsStart(false)
                        handleStartTimer()
                    }}>
                        <Text style={{ color: 'white' }}>Start</Text>
                    </Button>
                }
                {isStop &&
                    <Button danger block onPress={() => {
                        setStopWatchStart(false)
                        setIsStop(false)
                        setIsStart(true)
                        setReset(true)
                        updatePlayingTimeRecord()
                    }}>
                        <Text style={{ color: 'white' }}>Stop</Text>
                    </Button>
                }
            </Col>
            <Col>
                <Icon onPress={() => onTrack()} name="time-outline" style={{ alignSelf: 'center', color: track ? '#1890ff' : 'grey' }} />
                <Icon onPress={() => onManual()} name="list-outline" style={{ alignSelf: 'center', color: manual ? '#1890ff' : 'grey' }} />
            </Col>
            <TagModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setTagName={setTagName}
                addTag={addTag}
                tag={tag}
            />
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
    icon_press: {
        borderRadius: 50,
        paddingLeft: 5
    },
    icon_tag: {
        color: 'black',
        fontSize: 18
    },
    icon_dollar: {
        fontSize: 18,
    },
    row_2: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
    },
})

export default TimeTrack;
