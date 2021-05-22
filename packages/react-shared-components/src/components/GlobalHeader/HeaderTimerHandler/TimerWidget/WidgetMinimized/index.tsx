import React from 'react';
import {
  CaretRightFilled,
  CloseOutlined,
  PauseOutlined,
  BorderOutlined
} from '@ant-design/icons';
import { Button, Typography } from 'antd';

interface WidgetMinimizedProps {
  onClose: () => void;
  onTrack: () => void;
  onMaximize: () => void;
  trackStarted: boolean;
  hidden: boolean;
  timeDuration: string;
}

const WidgetMinimized: React.FC<WidgetMinimizedProps> = (props: WidgetMinimizedProps) => {
  const { Text } = Typography;
  const { onClose, onTrack, onMaximize, trackStarted, hidden, timeDuration } = props;

  return (
    <div hidden={hidden}>
      <Button
        type="primary"
        shape="circle"
        icon={!trackStarted ? <CaretRightFilled /> : <PauseOutlined />}
        onClick={onTrack}
        style={{ marginRight: '30px' }}
      />
      <Text>{timeDuration}</Text>

      <Button
        shape="circle"
        icon={<BorderOutlined />}
        size="small"
        onClick={onMaximize}
        style={{ marginLeft: '30px', border: 'none' }}
      />
      <Button
        shape="circle"
        icon={<CloseOutlined />}
        size="small"
        onClick={onClose}
        style={{ border: 'none' }}
      />
    </div>
  );
}

export default WidgetMinimized;