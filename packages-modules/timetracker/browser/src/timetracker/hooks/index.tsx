import React, { useState } from 'react';
import { useSetting } from '@adminide-stack/react-shared-components';
import { useLocation } from 'react-router';

const getQuoteWrappedString = (str: string) => {
  const startId = str.indexOf('"');
  const lastId = str.lastIndexOf('"');
  if (startId === -1 || lastId === -1) return null;
  return str.slice(startId + 1, lastId);
};

export const useTimeformat = () => {
  //   const [timeFormat, setTimeformat] = useState('HH:mm:ss');
  //   const [dateFormat, setDateformat] = useState('YYYY-MM-DD');
  const { data: timeFormatData, loading: loadingTimeFormat } = useSetting({
    configKey: 'timetracker.project.timeFormat',
  });
  const { data: dateFormatData, loading: loadingDateFormat } = useSetting({
    configKey: 'timetracker.project.dateFormat',
  });

  return {
    timeFormat:
      !timeFormatData || loadingDateFormat ? 'HH:mm:ss' : timeFormatData?.resolveConfiguration,
    dateFormat:
      !dateFormatData || loadingDateFormat ? 'YYYY-MM-DD' : dateFormatData?.resolveConfiguration,
  };
};

export function useLocationQuery() {
  return new URLSearchParams(useLocation().search);
}

export const useFirstWeekDay = () => {
  const { data, loading } = useSetting({
    configKey: 'timetracker.project.firstDayOfTheWeek',
  });

  let value = 0;
  if(data && data?.resolveConfiguration === 'Monday')
    value = 1;
  else if(data && data?.resolveConfiguration === 'Tuesday')
    value = 2;
  else if(data && data?.resolveConfiguration === 'Wednesday')
    value = 3;
  else if(data && data?.resolveConfiguration === 'Thursday')
    value = 4;
  else if(data && data?.resolveConfiguration === 'Friday')
    value = 5;
  else if(data && data?.resolveConfiguration === 'Saturday')
    value = 6;
  
  console.log('useFirstWeekDay.value =>', value);
  
  return {
    day: data?.resolveConfiguration || 'Sunday',
    value
  }
}
