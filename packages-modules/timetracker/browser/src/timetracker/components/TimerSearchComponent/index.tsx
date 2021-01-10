import React, { useState, useRef, useEffect } from 'react';
import { useFela } from 'react-fela';
import { styleSheet } from './styles';
import { Button, DatePicker, Space } from 'antd';
import moment from 'moment';
import { useOutsideClick } from '../../services/hookHelpers';
import { SearchOutlined } from '@ant-design/icons';
import { SearchComponent } from '../SearchComponent/index';

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
  const [searchValue, setSearchValue] = useState('');
  const [selectionRange, setSelectionRange] = useState({
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    key: 'selection',
  });


  const handleReset = async () => {
    if (!isSearchMode) {
      return;
    }
    setSearchValue('');
    setSelectionRange({
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month'),
      key: 'selection',
    });
    endSearchMode();
    await getTimeEntriesListAction();
  };

  const handleSearch = async () => {
    startSearchMode({
      searchValue,
      searchDateRange: {
        startDateTime: moment(selectionRange.startDate)
          .utc()
          .toISOString(),
        endDateTime: moment(selectionRange.endDate)
          .add(1, 'day')
          .utc()
          .toISOString(),
      },
    });
    await getTimeEntriesListAction();
  };

  return (
    <div className={css(styleSheet.timerSearchComponentStyle as any) }>
      <div className="timer-search">
        <div className="timer-search__search-input">
          <SearchComponent
            value={searchValue}
            setValue={setSearchValue}
            handleReset={handleReset}
            handleSearch={handleSearch}
            vocabulary={vocabulary}
          />
        </div>
        <div className="timer-search__date-select">
          {showCallendar && (
            <Space direction="vertical" size={12}>
              <RangePicker
                defaultValue={[moment('2020-09-03', dateFormat), moment('2020-11-22', dateFormat)]}
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
