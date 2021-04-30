import React, { useState } from 'react';
import {
  CaretRightFilled,
  CloseOutlined,
  PauseOutlined,
} from '@ant-design/icons';
import { Button, Typography } from 'antd';

interface HanlderBodyProps {
  onClose: () => void;
  onTrack: () => void;
  trackStarted: boolean;
}

const HandlerBody: React.FC<HanlderBodyProps> = (props: HanlderBodyProps) => {
  const { Text } = Typography;
  const { onClose, onTrack, trackStarted } = props;

  return (
    <div>
      <Button
        type="primary"
        shape="circle"
        icon={!trackStarted ? <CaretRightFilled /> : <PauseOutlined />}
        onClick={onTrack}
        style={{ marginRight: '30px' }}
      />
      <Text>00:00:30</Text>
      <Button
        shape="circle"
        icon={<CloseOutlined />}
        onClick={onClose}
        size="small"
        style={{ marginLeft: '30px', border: 'none' }}
      />
    </div>
  );
}

export default HandlerBody;