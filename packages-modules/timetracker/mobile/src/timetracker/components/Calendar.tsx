import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Calendar } from 'react-native-big-calendar';

const allEvents = [
    {
        endTime: "2021-05-25T12:40:49.682Z",
        id: "60aceb9ffedb6a08eb36a951",
        isBillable: false,
        projectId: "",
        startTime: "2021-05-25T12:10:58.721Z",
        tags: [],
        taskName: "",
        timesheetId: null,
        userId: "google-oauth2|104797814715925535941"
    }
]

const events = allEvents.map(event => {
    const {endTime, startTime, taskName, ...rest} = event
    return {
        end: new Date(endTime),
        start: new Date(startTime),
        title: taskName,
        ...rest
    }
})

const CalendarScreen = () => {

    const screenHeight = Dimensions.get('window').height

    return (
        <View style={styles.container}>
            <Calendar 
                hideNowIndicator
                swipeEnabled 
                mode='week' 
                showTime 
                ampm
                events={events} 
                height={screenHeight} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        textAlign: 'center',
        flex: 1,
    }
})

export default CalendarScreen