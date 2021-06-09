import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactExport from 'react-export-excel';
import moment, { Moment } from 'moment';
import { useTimeformat } from '../timetracker/hooks';
import { formatDuration, roundDuration } from '../timetracker/services/timeRecordService';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

interface IExportReportAsExcel {
  range: {
    start: Moment;
    end: Moment;
  };
  groupBy: string;
  groupByRecords: any;
  roundType: string;
  roundValue: number;
  rounded: boolean;
  calcDurationReducer: (totalDur, record) => number;
}

export const ExportReportAsExcel = (props: IExportReportAsExcel) => {
  const { groupBy, groupByRecords, calcDurationReducer, range, roundType, roundValue, rounded } = props;
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const { timeFormat, dateFormat } = useTimeformat();

  useEffect(() => {
    setColumns([capitalize(groupBy), 'Time(h)', 'Time(decimal)']);
  }, [groupBy]);

  useEffect(() => {
    let timeData = [];
    const durArray = groupByRecords.map((item) => {
      const { time, time_h, time_dec } = getTotalTime(item.records);
      timeData.push(time);
      return [item.name, time_h, time_dec];
    });

    const duration = `${moment(range.start).format(dateFormat)} - ${moment(range.end).format(dateFormat)}`;
    const totalTime = formatDuration(
      timeData.length && timeData.reduce((accumulator, currentValue) => accumulator + currentValue),
      timeFormat,
    );
    durArray.push([`Total (${duration})`, totalTime, moment.duration(totalTime).asHours().toFixed(2)]);
    setData(durArray);
  }, [
    JSON.stringify(groupByRecords),
    range,
    dateFormat,
    timeFormat,
    rounded,
    roundType,
    roundValue,
  ]);

  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  };

  const getTotalTime = (pRecords) => {
    const pTotalDur = pRecords.reduce(calcDurationReducer, 0);
    const time = rounded ? roundDuration(pTotalDur, roundValue, roundType) : pTotalDur;
    const time_h = formatDuration(time, timeFormat);
    const time_dec = moment.duration(time_h).asHours().toFixed(2);
    return { time, time_h, time_dec };
  };

  return (
    <ExcelFile element={<div>Save as Excel</div>}>
      <ExcelSheet dataSet={[{ columns, data }]} name="Report" />
    </ExcelFile>
  );
};
