import React, { useState } from 'react';
import { Card, Typography } from 'antd';
import { TagOutlined } from '@ant-design/icons';
import { useFela } from 'react-fela';
import { styleSheet } from './style';
import { dailyLog } from '../..';
import { msToHMS } from '../../../../../utils';

interface DailyRecordProps {
  record: dailyLog;
}

const DailyRecord: React.FC<DailyRecordProps> = (props: DailyRecordProps) => {
  const { Text } = Typography;
  const { css } = useFela();
  const { record } = props;

  return (
    <div className={css(styleSheet.dailyRecord)}>
      <div className="header">
        <Text disabled>{record.dates}</Text>
        <Text disabled>{msToHMS(record.duration)}</Text>
      </div>
      <div className="body">
        <div className="price">
          <Text style={{ color: 'green', fontWeight: 'bold' }}>{record.title}</Text>
          <Text style={{ color: 'green', fontWeight: 'bold' }}>$ <TagOutlined style={{ fontSize: '14px' }} /></Text>
        </div>
        <div className="description">
          <Text disabled>{record.description}</Text>
          <Text>{msToHMS(record.duration)}</Text>
        </div>
      </div>
    </div>
  );
}

export default DailyRecord;