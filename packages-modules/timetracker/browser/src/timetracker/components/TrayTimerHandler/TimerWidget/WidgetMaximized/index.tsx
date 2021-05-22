import React, { useState } from 'react';
import {
  CaretRightFilled,
  CloseOutlined,
  PauseOutlined,
  MinusOutlined,
  DownOutlined,
  UpOutlined
} from '@ant-design/icons';
import { Button, Typography, Select } from 'antd';
import { useFela } from 'react-fela';
import { styleSheet } from './style';

interface WidgetMaximizedProps {
  onTrack: () => void;
  onMinimize: () => void;
  trackStarted: boolean;
  hidden: boolean;
}

const WidgetMaximized: React.FC<WidgetMaximizedProps> = (props: WidgetMaximizedProps) => {
  const { css } = useFela();
  const { Text } = Typography;
  const { Option } = Select;
  const { onTrack, onMinimize, trackStarted, hidden } = props;
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <div hidden={hidden} className={css(styleSheet.container)}>
      <div className={css(styleSheet.headerTools)}>
        <Button
          shape="circle"
          icon={<MinusOutlined />}
          size="small"
          onClick={onMinimize}
          style={{ marginLeft: '30px', border: 'none' }}
        />
      </div>
      <div className={css(styleSheet.timerHandles)}>
        <Button
          type="primary"
          shape="circle"
          size='large'
          icon={!trackStarted ? <CaretRightFilled /> : <PauseOutlined />}
          onClick={onTrack}
          style={{ marginRight: '30px' }}
        />
        <Text className="timer-text">00:00:50</Text>
      </div>
      <div className={css(styleSheet.filters)} hidden={!expanded}>
        <Select className="select-project" placeholder="Select a project">
          <Option key="0" value="1">Admin Project</Option>
          <Option key="1" value="2">IDE project</Option>
          <Option key="2" value="3">Project 1</Option>
        </Select>
        <Select className="select-to-do" placeholder="Select a to do">
          <Option key="0" value="2">Task 1</Option>
          <Option key="1" value="3">Task 2</Option>
          <Option key="2" value="4">Task 3</Option>
        </Select>
      </div>
      <div className={css(styleSheet.expandToggle)}>
        <Button
          type="default"
          shape="circle"
          size='small'
          icon={!expanded ? <DownOutlined /> : <UpOutlined />}
          onClick={() => setExpanded(!expanded)}
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
}

export default WidgetMaximized;