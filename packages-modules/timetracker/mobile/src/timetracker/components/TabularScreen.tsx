import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Icon} from 'native-base'
import moment from 'moment'
import { useSelector } from 'react-redux';

import DayHeader from './DayHeader'
import { useGetDurationTimeRecordsQuery } from '../../generated-models';
import { formatDuration } from '@admin-layout/timetracker-module-browser/src/timetracker/services/timeRecordService';

const TabularScreen = () => {
    const [weekStart, setWeekStart] = useState(moment().clone().startOf('week'))
    const [weekEnd, setWeekEnd] = useState(moment().clone().endOf('week'))
    const [totalTime, setTotalTime] = useState(moment().format('HH:mm'))
    const [title, setTitle] = useState("This Week")
    const userId = useSelector<any>((state) => state.user.auth0UserId) as string;
    const [time, setTime] = useState([])
    const [total, setTotal] = useState('')

    const { data, error, refetch, loading } = useGetDurationTimeRecordsQuery({
        variables: { userId: userId, startTime: weekStart, endTime: weekEnd },
    });

    let days = [];
    for (let i = 0; i <= 6; i++) {
        days.push(moment(weekStart).add(i, 'days').format("ddd"));
    };

    useEffect(() => {
        if(data?.getDurationTimeRecords.length){
            const currentTime = data.getDurationTimeRecords.filter(time => days.includes(moment(time.endTime).format('ddd')))
            const getTime = days.map(day => {
                return currentTime.map(time => {
                    if(day === moment(time.endTime).format('ddd')){
                        return(formatDuration(calcTotalTime(time.startTime, time.endTime), 'h:mm'))
                    } else{
                        return "0:00"
                    }
                })
            })
            const calTime = getTime.map(time => {
                return addTime(time)
            })
            setTime(calTime)
        } else{
            const getTime = days.map(day => '0:00')
            setTime(getTime)
        }
    }, [data?.getDurationTimeRecords])

    const addTime = (times) => {
        const sum = times.reduce((acc, time) => acc.add(moment.duration(time)), moment.duration());
        return ([Math.floor(sum.asHours()), sum.minutes(), sum.seconds()].join(':'))
    }

    const calcTotalTime = (startTime: string, endTime: string): number => {
        return Math.floor((moment(endTime).valueOf() - moment(startTime).valueOf()) / 1000);
    };

    const getNextWeek = () => {
        const nextWeekStart = weekEnd.add(1, 'day')
        const endWeekDay = moment(nextWeekStart).add(6, 'days')
        setWeekStart(nextWeekStart)
        setWeekEnd(endWeekDay)
        refetch()
        setTitle(`${moment(nextWeekStart).format("MMM DD")} - ${moment(endWeekDay).format("MMM DD")}`)
    }

    const getPastWeek = () => {
        const endWeekDay = weekStart.subtract(1, 'day')
        const nextWeekStart = moment(endWeekDay).subtract(6, 'days')
        setWeekStart(nextWeekStart)
        setWeekEnd(endWeekDay)
        refetch()
        if(nextWeekStart === moment().clone().startOf('week') && endWeekDay === moment().clone().endOf('week')){
            setTitle("This Week")
        } else{
            setTitle(`${moment(nextWeekStart).format("MMM DD")} - ${moment(endWeekDay).format("MMM DD")}`)
        }
    }
    return(
        <View style={styles.container}>
            <View style={styles.white_back}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>{title}</Text>
                        <Text style={styles.grey}>Total: {addTime(time)}</Text>
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
                <View style={styles.divider} />
                <DayHeader days={days} time={time} styles={styles}/>
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
    white_back: {
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    headerTitle: {
        fontWeight: 'bold'
    },
    grey: {
        color: 'grey'
    },
    light_grey: {
        color: '#dcdcdc'
    },
    divider: {
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    dayHeader: {
        padding: 10
    }
})

export default TabularScreen
