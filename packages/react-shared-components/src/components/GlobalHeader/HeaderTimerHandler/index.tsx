import React, { useState } from 'react';
import { FieldTimeOutlined } from '@ant-design/icons'
import { Button, Popover } from 'antd';
import { useFela } from 'react-fela';
import { styleSheet } from './style';
import HandlerBody from './HandlerBody';

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
    <Popover
      content={
        <HandlerBody
          onClose={hidePopover}
          onTrack={onChangeTrack}
          trackStarted={trackStarted}
        >
          Close
        </HandlerBody>
      }
      trigger="click"
      visible={visiblity}
    >
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
    </Popover>
  )
}

export default HeaderTimerHandler;