import * as React from 'react';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import { useEffect, useState } from 'react';
import { useTimeformat } from '../timetracker/hooks';
import { formatDuration, roundDuration } from '../timetracker/services/timeRecordService';

interface IExportReportAsCSV {
  groupBy: string;
  groupByRecords: any;
  roundType: string;
  roundValue: number;
  rounded: boolean;
  calcDurationReducer: (totalDur, record) => number;
}

export const ExportReportAsCSV = (props: IExportReportAsCSV) => {
  const { groupBy, groupByRecords, calcDurationReducer, roundType, roundValue, rounded } = props;
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const { timeFormat } = useTimeformat();

  useEffect(() => {
    setHeaders([
      { label: capitalize(groupBy), key: groupBy },
      { label: 'Time(h)', key: 'time_h' },
      { label: 'Time(decimal)', key: 'time_dec' },
    ]);
  }, [groupBy]);

  useEffect(() => {
    const reportData = groupByRecords.map((item) => {
      const { time_h, time_dec } = getTotalTime(item.records);
      return { [groupBy]: item.name, time_h, time_dec };
    });
    setData(reportData);
  }, [JSON.stringify(groupByRecords), rounded, roundValue, roundType, timeFormat]);

  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  };

  const getTotalTime = (pRecords) => {
    const pTotalDur = pRecords.reduce(calcDurationReducer, 0);
    const time = rounded ? roundDuration(pTotalDur, roundValue, roundType) : pTotalDur;
    const time_h = formatDuration(time, timeFormat);
    const time_dec = moment.duration(time_h).asHours().toFixed(2);
    return { time_h, time_dec };
  };

  return (
    <CSVLink data={data} headers={headers}>
      Save as CSV
    </CSVLink>
  );
};
