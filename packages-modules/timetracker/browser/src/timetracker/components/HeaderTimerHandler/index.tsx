import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FieldTimeOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { Button } from 'antd';
import { useFela } from 'react-fela';
import { styleSheet } from './style';
import TimerWidget from './TimerWidget';
import { currentTimerSelector, resetCurrentTimerAction, setCurrentTimerAction } from '../../../redux';

const HeaderTimerHandler: React.FC = (props) => {
  const { css } = useFela();
  const [visiblity, setVisiblity] = useState<boolean>(false);
  const dispatch = useDispatch();
  const currentTimer = useSelector(currentTimerSelector);
  const [timeDuration, setTimeDuration] = useState<number>(0);

  const hidePopover = () => {
    setVisiblity(false);
  }

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
    <>
      <Draggable
        handle="._handler"
        defaultPosition={{ x: 110, y: 60 }}
        position={null}
        grid={[25, 25]}
        scale={1}
        bounds=".ant-layout:not(.ant-layout-has-sider)"
      >
        <div
          hidden={!visiblity}
          className={'_handler'}
          style={{ zIndex: 999, position: 'absolute' }}
        >
          <TimerWidget
            onClose={hidePopover}
            onTrack={onChangeTrack}
            trackStarted={currentTimer.startTime}
            timeDuration={msToHMS(timeDuration)}
          />
        </div>
      </Draggable>

      <Button
        className={css(styleSheet.button)}
        type={currentTimer.startTime ? 'primary' : 'default'}
        icon={
          <FieldTimeOutlined className={css(styleSheet.icon)} />
        }
        onClick={() => setVisiblity(!visiblity)}
      >
        {msToHMS(timeDuration)}
      </Button>
    </>
  )
}

export default HeaderTimerHandler;
