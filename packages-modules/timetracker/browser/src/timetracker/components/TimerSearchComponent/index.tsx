import React, { useState } from 'react';
import { useFela } from 'react-fela';
import { styleSheet } from './styles';
import { Button, DatePicker, Space } from 'antd';
import { Moment } from 'moment';
import momentZ from 'moment-timezone';
import { useTimeformat } from '../../hooks';
import moment from 'moment';
import { SettingsTypeToConfiguraitonTarget } from '@adminide-stack/core';
const { RangePicker } = DatePicker;

export interface ITimerSearchComponent {
  weekStart: Moment;
  startTime: Moment;
  endTime: Moment;
  setRange: Function;
}

export const TimerSearchComponent: React.FC<ITimerSearchComponent> = ({ weekStart, startTime, endTime, setRange }) => {
  const { css } = useFela();
  const [showCallendar, setShowCallendar] = useState(true);
  const { dateFormat } = useTimeformat();

  const handleChangeRange = (range, str) => {
    const start = range[0];
    const end = range[1];
    setRange({ startTime: start, endTime: end });
  };

  return (
    <div className={css(styleSheet.timerSearchComponentStyle as any)}>
      <div className="timer-search">
        <div className="timer-search__date-select">
          {showCallendar && (
            <Space direction="vertical" size={12}>
              <RangePicker
                defaultValue={[moment(weekStart), moment(weekStart).startOf('week').add(6, 'day')]}
                value={[moment(weekStart), moment(weekStart).startOf('week').add(6, 'day')]}
                format={dateFormat}
                onChange={handleChangeRange}
              />
            </Space>
          )}
        </div>
        <Button type="primary" className="theme-primary">
          Resets
        </Button>
      </div>
    </div>
  );
};
