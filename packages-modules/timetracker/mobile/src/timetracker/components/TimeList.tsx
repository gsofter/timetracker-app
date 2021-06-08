import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, ScrollView, Dimensions} from 'react-native';
import {Card, CardItem, Left, Right, Icon, Button, Input} from 'native-base'

import TagModal from "./TagModal"
import moment from 'moment';
import {
    ITimeRecordRequest,
} from '@admin-layout/timetracker-core/src/interfaces/generated-models';
import { formatDuration } from '@admin-layout/timetracker-module-browser/src/timetracker/services/timeRecordService';

const TimeList = ({
    data,
    timeRecord,
    setTimeRecord,
    updateTimeRecord,
    removeTimeRecord,
    projectsData
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [description, setDescription] = useState("(No Description)")
    const [tagName, setTagName] = useState(null)
    const [tag, setTag] = useState({
        showTag: false,
        tags: [],
    })
    const [dataTime, setData] = useState(null)

    const addTag = () => {
        setTag(ps => ({...ps, tags: [...tag.tags, tagName], showTag: true}))
    }

    const calcTotalTime = (startTime: string, endTime: string): number => {
        return Math.floor((moment(endTime).valueOf() - moment(startTime).valueOf()) / 1000);
    };

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
        setTimeRecord(newTimeRecord)
        updateTimeRecord(recordId, newTimeRecord);
    };

    const updateDescription = (event, recordId, time) => {
        if(event.nativeEvent.key === 'Enter'){
            const {id, timesheetId, __typename, ...rest} = time;
            const newTimeRecord: ITimeRecordRequest = {
                ...rest,
                description: event.target.value
            };
            setTimeRecord(newTimeRecord)
            updateTimeRecord(recordId, newTimeRecord);
        }
    }

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
                                    <Text style={{marginRight: 10}}>{formatDuration(calcTotalTime(time.startTime, time.endTime), "HH:mm:ss")}</Text>
                                    <Button danger small onPress={() => removeTimeRecord(time.id)}>
                                        <Icon name="trash" color="#fff" />
                                    </Button>
                                </Right>
                            </CardItem>
                            <CardItem>
                                <Left style={{flexDirection: 'row'}}>
                                    <Text style={styles.title}>
                                        {projectsData ? projectsData.find(project => project.id === time.projectId)?.name : 'No Project'}
                                    </Text>
                                    {time.taskName && (
                                        <Text style={styles.darkGrey}>{" "}:{time.taskName}</Text>
                                    )}
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
                                    <Input 
                                        returnKeyType="done" 
                                        style={styles.description}
                                        value={time.description}
                                        onChangeText={setDescription}
                                        onKeyPress={(e) => updateDescription(e, time.id, time)} 
                                        placeholder={"Enter Description"}
                                    />
                                </Left>
                                <Right>
                                    <Text>{formatDuration(calcTotalTime(time.startTime, time.endTime), "HH:mm:ss")}</Text>
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
    darkGrey: {
        color: "grey"
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
    },
    description: {
        fontSize: 14, 
        color: 'grey'
    }
})

export default TimeList;