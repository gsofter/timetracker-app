import React, { useState } from 'react';
import { Typography } from 'antd';
import { useFela } from 'react-fela';
import { styleSheet } from './style';
import DailyRecord from './DailyRecord';
import { weeklyLog } from '..';
import { msToHMS } from '../../../../utils';

interface WeeklyRecordProps {
  log: weeklyLog;
}

const WeeklyRecord: React.FC<WeeklyRecordProps> = (props: WeeklyRecordProps) => {
  const { Text } = Typography;
  const { css } = useFela();
  const { log } = props;

  return (
    <>
      <div className={css(styleSheet.weeklyRecord)}>
        <Text className="date-text">{log.dates}</Text>
        <div>
          <Text className="title">Weekly Total</Text>
          <Text className="duration">{msToHMS(log.duration)}</Text>
        </div>
      </div>
      <div className="daily">
        {log.days.map(day => <DailyRecord record={day} />)}
      </div>
    </>
  );
}

export default WeeklyRecord;