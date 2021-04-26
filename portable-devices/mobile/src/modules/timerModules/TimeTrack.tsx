/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { Col, Button } from 'native-base';
import { Text } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';

const TimeTrack = ({ 
    stopwatchStart, 
    setIsStart, 
    getFormattedTime, 
    isStart, 
    isStop, 
    setStopWatchStart, 
    setIsStop 
}: any) => {
    return (
        <>
            <Col>
                <Stopwatch laps start={stopwatchStart}
                    options={option}
                    getTime={getFormattedTime} />
            </Col>
            <Col>
            {isStart && 
                <Button info block>
                    <Text style={{ color: 'white' }} onPress={() => {
                    setStopWatchStart(true)
                    setIsStop(true)
                    setIsStart(false)
                    }}>Start</Text>
                </Button> 
            }
            {isStop && 
                <Button danger block>
                    <Text style={{ color: 'white' }} onPress={() => {
                    setStopWatchStart(false)
                    setIsStop(false)
                    setIsStart(true)
                    }}>Stop</Text>
                </Button> 
            }
            </Col>
        </>
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
    }
};

export default TimeTrack;