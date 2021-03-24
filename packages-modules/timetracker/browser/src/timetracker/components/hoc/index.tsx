import React from 'react';
import { useSetting } from '@adminide-stack/react-shared-components'

export const withTimeformat = WrappedComponent => props => {
  const dateFormat = 'YYYY-MM-DD';
  const timeFormat = 'HH:mm:ss';
  const { data: timeFormatData } = useSetting({ configKey: 'timetracker.project.timeFormat'}) 
  const { data: dateFormatData } = useSetting({ configKey: 'timetracker.project.dateFormat'}) 
  console.log('timeFormatData =>', timeFormatData)
  console.log('dateFormatData =>', dateFormatData)
  return <WrappedComponent dateFormat={dateFormat} timeFormat={timeFormat} {...props} />;
};
