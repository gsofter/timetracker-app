import React, { useState } from 'react';
import { useFela } from 'react-fela';
import TimerWidget from './TimerWidget';

const HeaderTimerHandler: React.FC = (props) => {
  const [trackStarted, setTrackStarted] = useState<boolean>(false);

  const onChangeTrack = () => {
    setTrackStarted(!trackStarted)
  }

  return (
    <TimerWidget
      onTrack={onChangeTrack}
      trackStarted={trackStarted}
    />
  )
}

export default HeaderTimerHandler;