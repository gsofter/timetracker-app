import React, { useState } from 'react';
import TimerWidget from './TimerWidget';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTimerAction } from '../../../redux/actions/TimeWidgetAction';
import { currentTimerSelector } from '../../../redux/selector/TimeWidgetSelector';

const TrayTimerHandler: React.FC = (props) => {
  const [trackStarted, setTrackStarted] = useState<boolean>(false);
  const dispatch = useDispatch();
  const currentTimer = useSelector(currentTimerSelector);

  const onChangeTrack = () => {
    dispatch(setCurrentTimerAction(!currentTimer));
    setTrackStarted(!trackStarted)
  }

  return (
    <TimerWidget
      onTrack={onChangeTrack}
      trackStarted={currentTimer}
    />
  )
}

export default TrayTimerHandler;