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
import { IProjects as IProject } from '@admin-layout/timetracker-core';
import { styleSheet } from './style';

interface WidgetMaximizedProps {
  onClose: () => void;
  onTrack: () => void;
  onMinimize: () => void;
  trackStarted: boolean;
  hidden: boolean;
  timeDuration: string;
  projects: IProject[];
}

const WidgetMaximized: React.FC<WidgetMaximizedProps> = (props: WidgetMaximizedProps) => {
  const { css } = useFela();
  const { Text } = Typography;
  const { Option } = Select;
  const { onClose, onTrack, onMinimize, trackStarted, hidden, timeDuration } = props;
  const [expanded, setExpanded] = useState<boolean>(true);
  const { projects } = props;

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
        <Button
          shape="circle"
          icon={<CloseOutlined />}
          size="small"
          onClick={onClose}
          style={{ border: 'none' }}
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
        <Text className="timer-text">{timeDuration}</Text>
      </div>
      <div className={css(styleSheet.filters)} hidden={!expanded}>
        <Select className="select-project" placeholder="Select a project">
          {projects.map((project) => (
            <Option key={project.id} value="1">{project.name}</Option>
          ))}
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