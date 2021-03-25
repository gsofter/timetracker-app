import React, { useState } from 'react';
import { useSetting } from '@adminide-stack/react-shared-components';

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
      !timeFormatData || loadingDateFormat
        ? 'HH:mm:ss'
        : timeFormatData?.resolveConfiguration,
    dateFormat:
      !dateFormatData || loadingDateFormat
        ? 'YYYY-MM-DD'
        : dateFormatData?.resolveConfiguration,
  };
};
