import React, { useState } from 'react';
import { FieldTimeOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { Button } from 'antd';
import { useFela } from 'react-fela';
import { styleSheet } from './style';
import TimerWidget from './TimerWidget';

const HeaderTimerHandler: React.FC = (props) => {
  const { css } = useFela();
  const [visiblity, setVisiblity] = useState<boolean>(false);
  const [trackStarted, setTrackStarted] = useState<boolean>(false);

  const hidePopover = () => {
    setVisiblity(false);
  }

  const onChangeTrack = () => {
    setTrackStarted(!trackStarted)
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
          style={{ zIndex: 999, position: 'absolute' }}
        >
          <TimerWidget
            onClose={hidePopover}
            onTrack={onChangeTrack}
            trackStarted={trackStarted}
          />
        </div>
      </Draggable>

      <Button
        className={css(styleSheet.button)}
        type={trackStarted ? 'primary' : 'default'}
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
