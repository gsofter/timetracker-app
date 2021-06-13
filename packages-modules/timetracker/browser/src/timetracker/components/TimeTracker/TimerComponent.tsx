import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { useStopwatch } from 'react-timer-hook';
import { useSelector } from 'react-redux';
import { currentTimerSelector } from '@admin-layout/timetracker-core';
import moment from 'moment';

const { Title } = Typography;


// Timer
export const TimerComponent: React.FC = ({ }) => {
    const currentTimer = useSelector(currentTimerSelector);
    const [startTimer, setStartTimer] = useState<boolean>();
    const { reset, hours, minutes, seconds } = useStopwatch({ autoStart: false, offsetTimestamp: 0 });
    useEffect(() => {
        if (currentTimer && (currentTimer.startTime === null || currentTimer.endTime !== null)) {
            if (startTimer) {
                reset(0, false);
                setStartTimer(false);
            }
        } else {
            const passDur = moment().valueOf() - moment(currentTimer.startTime).valueOf();
            const currentDate = new Date();
            const stopwatchOffset = currentDate.setSeconds(currentDate.getSeconds() + passDur / 1000);
            reset(stopwatchOffset);
            setStartTimer(true);
        }
    }, [currentTimer]);
    const timerValue = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    return (
        <Title level={5} style={{ marginBottom: '0px' }}>
            {timerValue}
        </Title>
    )
}

