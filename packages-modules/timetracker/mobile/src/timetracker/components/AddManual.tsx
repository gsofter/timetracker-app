import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Header, Left, Body, Icon, Card, CardItem, Container, Content, ListItem, Input } from 'native-base';
import { useHistory } from 'react-router-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
const AddManual = () => {
    const history = useHistory();
    const [show, setShow] = useState(false)
    const [isEnd, setIsEnd] = useState(false)
    const [startDate, setStartDate] = useState(new Date(1598051730000));
    const [endDate, setEndDate] = useState(new Date(1598051730000));
    const [dates, setDates] = useState({
        startDate: moment("2017-08-30T00:00:00"),
        endDate: moment("2017-08-30T00:00:00"),
        totalDate: moment("2017-08-30T00:00:00")
    })

    useEffect(() => {
        var start = moment(dates.startDate, "HH:mm");
        var end = moment(dates.endDate, "HH:mm");
        var minutes = end.diff(start, 'minutes');
        var interval = moment().hour(0).minute(minutes);
        setDates(ps => ({...ps, totalDate: interval}))
    }, [dates.startDate, dates.endDate])

    const handleStartConfirm = (selectedDate) => {
        const currentDate = selectedDate || startDate;
        setStartDate(currentDate);
        setDates(ps => ({...ps, startDate: moment(currentDate)}))
        handleStartCancel()
    };

    const handleStartCancel = () => {
        setShow(false)
    }
    const handleEndConfirm = (selectedDate) => {
        const currentDate = selectedDate || endDate;
        setEndDate(currentDate);
        setDates(ps => ({...ps, endDate: moment(currentDate)}))
        handleEndCancel()
    };

    const handleEndCancel = () => {
        setShow(false)
    }

    return(
        <Container>
            <Header style={{ backgroundColor: '#1f1f1f' }}>
                <Left>
                    <Icon onPress={() => history.goBack()} style={styles.color} name='arrow-back-outline'/>
                </Left>
                <Body>
                    <Text style={styles.color}>Time Entry Details</Text>
                </Body>
            </Header>
            <Content>
                <Card>
                    <ListItem last>
                        <CardItem>
                            <View style={styles.flex_row}>
                                <TouchableOpacity style={styles.blue_box} onPress={() => setShow(true)}>
                                    <Text style={styles.head_Text}>START</Text>
                                    <Text style={styles.color}>{dates.startDate.format('ddd')}, {dates.startDate.format('MMM DD')}</Text>
                                    <Text style={styles.color}>{dates.startDate.format('h:mm A')}</Text>
                                </TouchableOpacity>
                                <View style={styles.justify_center}>
                                    <Text style={styles.head_Text_total}>TOTAL</Text>
                                    <Text>{dates.totalDate.format('h:mm')}</Text>
                                    <Text>00</Text>
                                </View>
                                <TouchableOpacity style={styles.blue_box_end} onPress={() => setIsEnd(true)}>
                                    <Text style={styles.head_Text}>END</Text>
                                    <Text style={styles.color}>{dates.endDate.format('ddd')}, {dates.endDate.format('MMM DD')}</Text>
                                    <Text style={styles.color}>{dates.endDate.format('h:mm A')}</Text>
                                </TouchableOpacity>
                            </View>
                            <DateTimePickerModal
                            isVisible={show}
                            testID="dateTimePicker"
                            date={startDate}
                            mode={'datetime'}
                            is24Hour={false}
                            display="default"
                            onConfirm={handleStartConfirm}
                            onCancel={handleStartCancel}
                            />
                            <DateTimePickerModal
                            isVisible={isEnd}
                            testID="dateTimePicker"
                            date={endDate}
                            mode={'datetime'}
                            is24Hour={false}
                            display="default"
                            onConfirm={handleEndConfirm}
                            onCancel={handleEndCancel}
                            />
                        </CardItem>
                    </ListItem>
                    <ListItem last>
                        <CardItem style={styles.flex_col}>
                            <Text style={{ fontSize: 16 }}>Description</Text>
                            <Input placeholder='What have you worked on?'/>
                        </CardItem>
                    </ListItem>
                </Card>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    color: {
        color: 'white'
    },
    blue_box: {
        flex: 1,
        backgroundColor: '#01a9f4',
        padding: 12,
        borderRadius: 5,
    },
    blue_box_end: {
        flex: 1,
        backgroundColor: '#01a9f4',
        padding: 12,
        borderRadius: 5,
        alignItems: 'flex-end'
    },
    head_Text: {
        color: '#6cccf6',
        paddingBottom: 10
    },
    head_Text_total: {
        color: 'grey',
        paddingBottom: 10
    },
    flex_row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    justify_center: {
        flex: 1,
        alignItems: 'center'
    },
    flex_col: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'column'
    }
})

export default AddManual;