/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React from "react";
import {Text, Container} from "native-base";
import {StyleSheet} from "react-native";
import { TimerScreen, CalendarScreen } from '../pages';
import CounterScreen from '../pages/counter';

const Body = ({ match }: any) => {
    if(match.params.drawerId === 'timer'){
        return <TimerScreen/>
    } else if(match.params.drawerId === 'calendar'){
        return <CalendarScreen/>
    } else if(match.params.drawerId === 'counter'){
        return <CounterScreen/>
    } else{
        return <Text>Invalid Page</Text>
    }
}

const styles = StyleSheet.create({
    topic:{
        textAlign: 'center',
        fontSize: 15,
    }
})

export default Body;