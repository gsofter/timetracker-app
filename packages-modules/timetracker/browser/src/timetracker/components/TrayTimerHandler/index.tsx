import React, { useState } from 'react';
import TimerWidget from './TimerWidget';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTimerAction } from '../../../redux/actions/TimeWidgetAction'

const TrayTimerHandler: React.FC = (props) => {
  const [trackStarted, setTrackStarted] = useState<boolean>(false);
  const dispatch = useDispatch();
  const selector = useSelector((state) => {
    console.log('--STATE---', state);
    return state;
  });

  const onChangeTrack = () => {
    dispatch(setCurrentTimerAction("AAA"));
    setTrackStarted(!trackStarted)
  }

  return (
    <TimerWidget
      onTrack={onChangeTrack}
      trackStarted={trackStarted}
    />
  )
}

export default TrayTimerHandler;