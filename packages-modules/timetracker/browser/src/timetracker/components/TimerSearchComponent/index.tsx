import React, { useState, useRef, useEffect } from 'react';
import { useFela } from 'react-fela';
import { styleSheet } from './styles';
import { Button, DatePicker, Space } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

export interface ITimerSearchComponent {
  vocabulary?: any;
  firstDayOfWeek?: any;
  dateFormat?: any;
  startSearchMode?: any;
  getTimeEntriesListAction?: any;
  endSearchMode?: any;
  isSearchMode?: any;
}

export const TimerSearchComponent: React.FC<ITimerSearchComponent> = ({
  vocabulary,
  firstDayOfWeek,
  startSearchMode,
  getTimeEntriesListAction,
  endSearchMode,
  isSearchMode,
}) => {
  const { css } = useFela();
  const [showCallendar, setShowCallendar] = useState(true);

  return (
    <div className={css(styleSheet.timerSearchComponentStyle as any)}>
      <div className="timer-search">
        <div className="timer-search__date-select">
          {showCallendar && (
            <Space direction="vertical" size={12}>
              <RangePicker
                defaultValue={[
                  moment().startOf('week'),
                  moment()
                    .startOf('week')
                    .add(1, 'week'),
                ]}
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
