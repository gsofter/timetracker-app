import React, { useState } from 'react';
import { Typography } from 'antd';
import DailyRecord from './DailyRecord';

const WeeklyRecord: React.FC = () => {
  const { Text } = Typography;

  return (
    <>
      <div>
        <Text>Feb 08 - Feb 14</Text>
        <div>
          <Text>Weekly Total</Text>
          <Text>60:47:20</Text>
        </div>
      </div>
      <div>
        <DailyRecord></DailyRecord>
      </div>
    </>
  );
}

export default WeeklyRecord;