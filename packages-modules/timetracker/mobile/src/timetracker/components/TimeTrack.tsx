import React, {useState} from 'react';
import { Col, Button, Icon, Row, Input, Form } from 'native-base';
import { Text, StyleSheet, Modal, View, Pressable, Alert } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';
import Grid from 'react-native-grid-component';

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
    const [modalVisible, setModalVisible] = useState(false);
    const [tagName, setTagName] = useState(null)
    const [tag, setTag] = useState({
        showTag: false,
        tags: [],
    })

    const addTag = () => {
        setTag(ps => ({...ps, tags: [...tag.tags, tagName], showTag: true}))
    }
    const _renderItem = (data, i) => (
        <View style={styles.badge} key={i}>
            <Text style={styles.color}>{data}</Text>
        </View>
    );

    return (
        <Row style={styles.row_2}>
            <Col style={{ width: 30 }}>
                <Icon onPress={() => setModalVisible(true)} name="pricetag-outline" style={styles.icon_tag} />
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
                    getTime={getFormattedTime} />
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Form>
                        <View style={styles.flex_row}>
                            <Input 
                            onChangeText={(e) => setTagName(e)} 
                            placeholder="Enter tags here"
                            />
                            <Button bordered info transparent small onPress={() => addTag()}>
                                <Icon name="add-outline" />
                            </Button>
                        </View>
                        <View style={styles.divider}/>
                    </Form>
                    {tag.showTag && (
                        <Grid
                            style={{height: 'auto'}}
                            renderItem={_renderItem}
                            data={tag.tags}
                            numColumns={2}
                        />
                    )}
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.textStyle}>Close Modal</Text>
                    </Pressable>
                </View>
                </View>
            </Modal>
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
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        marginTop: 10
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    divider: {
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    flex_row: {
        flexDirection: 'row', 
        width: '100%', 
    },
    badge: {
        backgroundColor: 'black',
        borderRadius: 10,
        padding: 5,
        marginLeft: 5,
        marginTop: 10,
        marginBottom: 10,
        height: 30
    },
    color: {
        color: 'white'
    }
})

export default TimeTrack;
