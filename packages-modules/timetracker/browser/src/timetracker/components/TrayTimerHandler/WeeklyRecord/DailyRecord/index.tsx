import React, { useState } from 'react';
import { Card, Typography } from 'antd';

const DailyRecord: React.FC = () => {
  const { Text } = Typography;
  return (
    <div>
      <div className="header">
        <Text>Sat 13, Feb'21</Text>
        <Text>0:05:07</Text>
      </div>
      <div className="body">
        <div className="price">
          <Text>Test</Text>
          <Text>$</Text>
        </div>
        <div className="description">
          <Text>(No description)</Text>
          <Text>0:05:00</Text>
        </div>
      </div>
    </div>
  );
}

export default DailyRecord;