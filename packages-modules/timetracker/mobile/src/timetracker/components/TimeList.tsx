import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, ScrollView, Dimensions} from 'react-native';
import {Card, CardItem, Left, Right, Icon, Button} from 'native-base'

import TagModal from "./TagModal"
import moment from 'moment';
import { ITimeRecordRequest } from '@admin-layout/timetracker-core';

const TimeList = ({
    data,
    timeRecord,
    setTimeRecord,
    updateTimeRecord,
    removeTimeRecord
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [tagName, setTagName] = useState(null)
    const [tag, setTag] = useState({
        showTag: false,
        tags: [],
    })
    const [dataTime, setData] = useState(null)

    const addTag = () => {
        setTag(ps => ({...ps, tags: [...tag.tags, tagName], showTag: true}))
    }

    const updateBillable = (recordId, billable, time) => {
        const {id, timesheetId, __typename, ...rest} = time;
        const newTimeRecord: ITimeRecordRequest = {
          ...rest,
          isBillable: billable
        };
        setTimeRecord(newTimeRecord)
        updateTimeRecord(recordId, newTimeRecord);
    };

    const updateTags = (recordId, time) => {
        const {id, timesheetId, __typename, ...rest} = time;
        const newTimeRecord: ITimeRecordRequest = {
          ...rest,
          tags: tag.tags
        };
        debugger
        setTimeRecord(newTimeRecord)
        updateTimeRecord(recordId, newTimeRecord);
    };

    return(
        <ScrollView style={{paddingBottom: 160}}>
            <View style={styles.container}>
                {data.getDurationTimeRecords.map(time => (
                    <>
                        <Card>
                            <CardItem style={styles.header} header>
                                <Left>
                                    <Text>{moment(time.endTime).format("dddd")}</Text>
                                </Left>
                                <Right style={styles.header_icon}>
                                    <Text>{moment.utc(moment(time.endTime, "HH:mm:ss").diff(moment(time.startTime, "HH:mm:ss"))).format("HH:mm:ss")}</Text>
                                    <Button danger small onPress={() => removeTimeRecord(time.id)}>
                                        <Icon name="trash" color="#fff" />
                                    </Button>
                                </Right>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Text style={styles.title}>{time.taskName}</Text>
                                </Left>
                                <Right style={styles.row}>
                                    <Icon onPress={() =>{
                                        if(time.isBillable){
                                            updateBillable(time.id, false, time)
                                        } else{
                                            updateBillable(time.id, true, time)
                                        }
                                    }} style={{ color: time.isBillable ? '#1890ff' : 'grey' }} type="FontAwesome" name="dollar" />
                                    <TouchableHighlight
                                        onPress={() => {
                                            setData(time)
                                            setModalVisible(true)
                                        }}
                                        style={styles.icon_press} 
                                        underlayColor='#eff0f1'
                                    >
                                        <Icon style={styles.tag_icon} name="pricetag-outline" />
                                    </TouchableHighlight>
                                </Right>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Text style={styles.grey}>(No Description)</Text>
                                </Left>
                                <Right>
                                    <Text>{moment.utc(moment(time.endTime, "HH:mm:ss").diff(moment(time.startTime, "HH:mm:ss"))).format("HH:mm:ss")}</Text>
                                </Right>
                            </CardItem>
                        </Card>
                    </>
                ))}
                <TagModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    setTagName={setTagName}
                    addTag={addTag}
                    tag={tag}
                    updateTags={updateTags}
                    timeData={dataTime}
                    setTag={setTag}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    header: {
        backgroundColor: '#e5eaee'
    },
    grey: {
        color: '#e5eaee'
    },
    title: {
        color: '#07988b'
    },
    row: {
        flexDirection: 'row',
        justifyContent: "flex-end"        
    },
    tag_icon: {
        color: 'black',
        marginLeft: 10
    },
    icon_press: {
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header_icon: {
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        alignItems: 'center'
    }
})

export default TimeList;