import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Card, CardItem, Left, Right, Icon} from 'native-base'

import TagModal from "./TagModal"
import moment from 'moment';

const TimeList = ({data}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [tagName, setTagName] = useState(null)
    const [tag, setTag] = useState({
        showTag: false,
        tags: [],
    })

    const addTag = () => {
        setTag(ps => ({...ps, tags: [...tag.tags, tagName], showTag: true}))
    }

    return(
        <View style={styles.container}>
            {data.getDurationTimeRecords.map(time => (
                <Card>
                    <CardItem style={styles.header} header>
                        <Left>
                            <Text>{moment(time.endTime).format("dddd")}</Text>
                        </Left>
                        <Right>
                            <Text>{moment.utc(moment(time.endTime, "HH:mm:ss").diff(moment(time.startTime, "HH:mm:ss"))).format("HH:mm:ss")}</Text>
                        </Right>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text style={styles.title}>{time.taskName}</Text>
                        </Left>
                        <Right style={styles.row}>
                            <Icon type="FontAwesome" name="dollar" />
                            <TouchableHighlight
                                onPress={() => setModalVisible(true)}
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
            ))}
            <TagModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setTagName={setTagName}
                addTag={addTag}
                tag={tag}
            />
        </View>
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
})

export default TimeList;