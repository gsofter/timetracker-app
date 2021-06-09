import React from 'react';
import { useSetting } from '@adminide-stack/platform-browser/lib/components';

const getQuoteWrappedString = (str: string) => {
  const startId = str.indexOf('"')
  const lastId = str.lastIndexOf('"')
  if(startId === -1 || lastId === -1)
    return null
  return str.slice(startId+1, lastId);
}

export const withTimeformat = WrappedComponent => props => {
  const { data: timeFormatData, loading: loadingTimeFormat } = useSetting({ configKey: 'timetracker.project.timeFormat' });
  const { data: dateFormatData, loading: loadingDateFormat } = useSetting({ configKey: 'timetracker.project.dateFormat' });
  if(!timeFormatData || loadingTimeFormat)
    return null
  if(!dateFormatData || loadingDateFormat)
    return null

  return (
    <WrappedComponent
      dateFormat={getQuoteWrappedString(dateFormatData?.resolveConfiguration) || 'YYYY-MM-DD'}
      timeFormat={getQuoteWrappedString(timeFormatData?.resolveConfiguration) || 'HH:mm:ss'}
      {...props}
    />
  );
};
