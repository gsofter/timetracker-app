import moment from 'moment';
import React, {useState} from 'react';
import { StyleSheet, View, Dimensions, Switch, Text } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import { useSelector } from 'react-redux';
import { useGetDurationTimeRecordsQuery } from '../../generated-models';

import TabularScreen from "./TabularScreen"

const allEvents = [
    {
        endTime: "2021-05-25T12:40:49.682Z",
        id: "60aceb9ffedb6a08eb36a951",
        isBillable: false,
        projectId: "",
        startTime: "2021-05-25T12:10:58.721Z",
        tags: [],
        taskName: "Test Task",
        timesheetId: null,
        userId: "google-oauth2|104797814715925535941"
    }
]

const CalendarScreen = () => {
    const [isEnabled, setIsEnabled] = useState(true)
    const [weekStart] = useState(moment().clone().startOf('week'))
    const [weekEnd] = useState(moment().clone().endOf('week'))
    const userId = useSelector<any>((state) => state.user.auth0UserId) as string;

    const { data, error, refetch, loading } = useGetDurationTimeRecordsQuery({
        variables: { userId: userId, startTime: weekStart, endTime: weekEnd },
    });

    const screenHeight = Dimensions.get('window').height

    const events = data?.getDurationTimeRecords.map(event => {
        const {endTime, startTime, taskName, ...rest} = event
        return {
            end: new Date(endTime),
            start: new Date(startTime),
            title: taskName,
            ...rest
        }
    })

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled)
    }

    return (
        <View style={styles.container}>
            <View style={styles.toggle}>
                <Text>Calendar: </Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "black" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            {isEnabled && events ? 
            <Calendar
                eventCellStyle={{height: 25}}
                events={events} 
                height={screenHeight} 
            />: 
            <TabularScreen/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    toggle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    }
})

export default CalendarScreen