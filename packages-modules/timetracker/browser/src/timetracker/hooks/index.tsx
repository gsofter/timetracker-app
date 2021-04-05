import React, { useEffect, useState } from 'react';
import { useSetting } from '@adminide-stack/react-shared-components';
import { useLocation } from 'react-router';
import { TimeRoundedType, TimeRoundingUpToValue } from '../constants'

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

export const useRound = () => {
  const { data: data, loading: loadingRoundData } = useSetting({
    configKey: 'timetracker.project.roundedToNearest',
  });
  const { data: typeData, loading: loadingRoundType } = useSetting({
    configKey: 'timetracker.project.roundedType',
  });

  const { data: roundedData, loading: loadingRounded, refetch: refetchRounded } = useSetting({
    configKey: 'timetracker.report.timeRoundingInReports',
  })

  const [roundType, setRoundType] = useState("ceil")
  const [roundValue, setRoundValue] = useState(TimeRoundingUpToValue.IN_MINUTES_1);
  const [rounded, setRounded] = useState(false);

  useEffect(() => {
    if(data && data?.resolveConfiguration)
      setRoundValue(data?.resolveConfiguration)
    if(typeData && typeData?.resolveConfiguration)
    {
      if(typeData?.resolveConfiguration === TimeRoundedType.ROUND_UP_TO)
        setRoundType('ceil')
      else if (typeData?.resolveConfiguration === TimeRoundedType.ROUND_TO_NEAREST)
        setRoundType('round')
      else if (typeData?.resolveConfiguration === TimeRoundedType.ROUND_DOWN_TO)
        setRoundType('floor')
    }
    setRounded(roundedData && roundedData?.resolveConfiguration !== undefined ? roundedData?.resolveConfiguration : false);
  }, [loadingRoundData, loadingRoundType, loadingRounded])

  useEffect(() => {
    setRounded(roundedData && roundedData?.resolveConfiguration !== undefined ? roundedData?.resolveConfiguration : false);
  }, [loadingRounded, roundedData])
  
  return {
    roundType,
    roundValue,
    rounded,
    refetchRounded,
  }
}
