import React, { useState } from 'react';
import TimerWidget from './TimerWidget';
import { useDispatch, useSelector } from 'react-redux';
import { resetCurrentTimerAction, setCurrentTimerAction } from '../../../redux/actions/TimeWidgetAction';
import { currentTimerSelector } from '../../../redux/selector/TimeWidgetSelector';

const TrayTimerHandler: React.FC = (props) => {
  const dispatch = useDispatch();
  const currentTimer = useSelector(currentTimerSelector);
  const [timeDuration, setTimeDuration] = useState<number>(0);

  const onChangeTrack = () => {
    if (currentTimer.startTime === null) {
      dispatch(setCurrentTimerAction({
        endTime: null,
        startTime: new Date,
        projectId: 'testProject',
        taskId: 'testTask',
        id: '#1'
      }));
    } else {
      dispatch(resetCurrentTimerAction());
    }
  }

  const calculateTimeDuration = () => {
    const now = new Date().getTime();
    const statedTime = new Date(currentTimer.startTime).getTime();

    setTimeDuration((currentTimer.startTime === null) ? 0 : now - statedTime);
  }

  const msToHMS = (milliseconds: number) => {
    const hours = milliseconds / (3600 * 1000);
    const absoluteHours = Math.floor(hours);
    const hoursString = absoluteHours > 9 ? `${absoluteHours}` : `0${absoluteHours}`;

    const minutes = (hours - absoluteHours) * 60;
    const absoluteMinutes = Math.floor(minutes);
    const minutesStrinig = absoluteMinutes > 9 ? `${absoluteMinutes}` : `0${absoluteMinutes}`;

    const seconds = (minutes - absoluteMinutes) * 60;
    const absoluteSeconds = Math.floor(seconds);
    const secondsString = absoluteSeconds > 9 ? `${absoluteSeconds}` : `0${absoluteSeconds}`;


    return `${hoursString}:${minutesStrinig}:${secondsString}`;
  }

  setTimeout(() => {
    calculateTimeDuration();
  }, 1000);

  return (
    <TimerWidget
      onTrack={onChangeTrack}
      trackStarted={currentTimer.startTime}
      timeDuration={msToHMS(timeDuration)}
    />
  )
}

export default TrayTimerHandler;