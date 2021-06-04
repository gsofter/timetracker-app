import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Icon} from 'native-base'
import moment from 'moment'

const TabularScreen = () => {
    const [weekStart, setWeekStart] = useState(moment().clone().startOf('week'))
    const [weekEnd, setWeekEnd] = useState(moment().clone().endOf('week'))
    const [totalTime, setTotalTime] = useState(moment().format('HH:mm'))
    const [title, setTitle] = useState("This Week")

    const getNextWeek = () => {
        const nextWeekStart = weekEnd.add(1, 'day')
        const endWeekDay = moment(nextWeekStart).add(7, 'days')
        setWeekStart(nextWeekStart)
        setWeekEnd(endWeekDay)
        setTitle(`${moment(nextWeekStart).format("MMM DD")} - ${moment(endWeekDay).format("MMM DD")}`)
    }

    const getPastWeek = () => {
        const endWeekDay = weekStart.subtract(1, 'day')
        const nextWeekStart = moment(endWeekDay).subtract(7, 'days')
        setWeekStart(nextWeekStart)
        setWeekEnd(endWeekDay)
        if(nextWeekStart === moment().clone().startOf('week') && endWeekDay === moment().clone().endOf('week')){
            setTitle("This Week")
        } else{
            setTitle(`${moment(nextWeekStart).format("MMM DD")} - ${moment(endWeekDay).format("MMM DD")}`)
        }
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>{title}</Text>
                    <Text style={styles.grey}>Total: {totalTime}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TouchableHighlight onPress={() => getPastWeek()}>
                        <Icon name="chevron-back-outline" />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => getNextWeek()}>
                        <Icon name="chevron-forward-outline"/>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f2f5'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
    },
    headerTitle: {
        fontWeight: 'bold'
    },
    grey: {
        color: 'grey'
    }
})

export default TabularScreen