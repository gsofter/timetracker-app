import React, { useState } from 'react';
import { useFela } from 'react-fela';
import { styleSheet } from './style';
import WidgetMinimized from './WidgetMinimized';
import WidgetMaximized from './WidgetMaximized';

interface HanlderBodyProps {
  onClose: () => void;
  onTrack: () => void;
  trackStarted: boolean;
  timeDuration: string;
}
enum WidgetSize {
  minimize = 'minimize',
  maximize = 'maximize',
}

const TimerWidget: React.FC<HanlderBodyProps> = (props: HanlderBodyProps) => {
  const { css } = useFela();
  const { onClose, onTrack, trackStarted, timeDuration } = props;
  const [size, setSize] = useState<WidgetSize>(WidgetSize.maximize);

  const minimize = () => {
    setSize(WidgetSize.minimize);
  }
  const maximize = () => {
    setSize(WidgetSize.maximize);
  }

  return (
    <div className={css(styleSheet.TimerWidget)}>
      <WidgetMinimized
        trackStarted={trackStarted}
        onClose={onClose}
        onTrack={onTrack}
        onMaximize={maximize}
        hidden={!(size === WidgetSize.minimize)}
        timeDuration={timeDuration}
      />
      <WidgetMaximized
        trackStarted={trackStarted}
        onClose={onClose}
        onTrack={onTrack}
        onMinimize={minimize}
        hidden={!(size === WidgetSize.maximize)}
        timeDuration={timeDuration}
      />
    </div>
  );
}

export default TimerWidget;