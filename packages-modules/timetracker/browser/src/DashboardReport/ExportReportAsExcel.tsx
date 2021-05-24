import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactExport from 'react-export-excel';
import moment, { Moment } from 'moment';
import { useTimeformat } from '../timetracker/hooks';
import { formatDuration, roundDuration } from '../timetracker/services/timeRecordService';
import { IProject_Output, ITimeRecord } from '@admin-layout/timetracker-core';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

interface IExportReportAsExcel {
  range: {
    start: Moment;
    end: Moment;
  };
  records: Array<ITimeRecord>;
  projects: Array<IProject_Output>;
  roundType: string;
  roundValue: number;
  rounded: boolean;
  calcDurationReducer: (totalDur, record) => number;
}

export const ExportReportAsExcel = (props: IExportReportAsExcel) => {
  const { records, projects, calcDurationReducer, range, roundType, roundValue, rounded } = props;
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const { timeFormat, dateFormat } = useTimeformat();

  useEffect(() => {
    setColumns(['Project', 'Time(h)', 'Time(decimal)']);
  }, []);

  useEffect(() => {
    let timeData = [];
    const projectDurArray = projects.map((project, index) => {
      const pRecords = records.filter((record) => record.projectId === project.id);
      const { time, time_h, time_dec } = getTotalTime(pRecords);
      timeData.push(time);
      return [project.name, time_h, time_dec];
    });
    const unRecord = records.filter((r) => !r.projectId);
    if (unRecord.length) {
      const { time, time_h, time_dec } = getTotalTime(unRecord);
      timeData.push(time);
      projectDurArray.push(['Unknown', time_h, time_dec]);
    }
    projectDurArray.push([]);
    const duration = `${moment(range.start).format(dateFormat)} - ${moment(range.end).format(dateFormat)}`;
    const totalTime = formatDuration(
      timeData.length && timeData.reduce((accumulator, currentValue) => accumulator + currentValue),
      timeFormat,
    );
    projectDurArray.push([`Total (${duration})`, totalTime, moment.duration(totalTime).asHours().toFixed(2)]);
    setData(projectDurArray);
  }, [
    JSON.stringify(records),
    JSON.stringify(projects),
    range,
    dateFormat,
    timeFormat,
    rounded,
    roundType,
    roundValue,
  ]);

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
