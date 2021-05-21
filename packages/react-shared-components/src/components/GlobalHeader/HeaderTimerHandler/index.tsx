import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FieldTimeOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { Button } from 'antd';
import { useFela } from 'react-fela';
import { styleSheet } from './style';
import TimerWidget from './TimerWidget';
import { currentTimerSelector, setCurrentTimerAction } from '../../../redux/timetracker';

const HeaderTimerHandler: React.FC = (props) => {
  const { css } = useFela();
  const [visiblity, setVisiblity] = useState<boolean>(false);
  const dispatch = useDispatch();
  const currentTimer = useSelector(currentTimerSelector);

  const hidePopover = () => {
    setVisiblity(false);
  }

  const onChangeTrack = () => {
    dispatch(setCurrentTimerAction(!currentTimer));
  }

  return (
    <>
      <Draggable
        handle="._handler"
        defaultPosition={{ x: 110, y: 60 }}
        position={null}
        grid={[25, 25]}
        scale={1}
      >
        <div
          hidden={!visiblity}
          className={'_handler'}
          style={{ zIndex: 999 }}
        >
          <TimerWidget
            onClose={hidePopover}
            onTrack={onChangeTrack}
            trackStarted={currentTimer}
          />
        </div>
      </Draggable>

      <Button
        className={css(styleSheet.button)}
        type={currentTimer ? 'primary' : 'default'}
        icon={
          <FieldTimeOutlined className={css(styleSheet.icon)} />
        }
        onClick={() => setVisiblity(!visiblity)}
      >
        00:00:30
      </Button>
    </>
  )
}

export default HeaderTimerHandler;