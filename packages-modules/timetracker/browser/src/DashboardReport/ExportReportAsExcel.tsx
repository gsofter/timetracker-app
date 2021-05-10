import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactExport from 'react-export-excel';
import moment, { Moment } from 'moment';
import {useRound, useTimeformat} from '../timetracker/hooks';
import { formatDuration, roundDuration } from '../timetracker/services/timeRecordService';
import { IProject_Output, ITimeRecord } from '@admin-layout/timetracker-core';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

interface IExportReportAsExcel {
    weekStart: Moment;
    records: Array<ITimeRecord>;
    projects: Array<IProject_Output>;
    calcDurationReducer: (totalDur, record) => number;
}

export const ExportReportAsExcel = (props: IExportReportAsExcel) => {
    const { records, projects, calcDurationReducer, weekStart } = props;
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const { timeFormat, dateFormat } = useTimeformat();
    const { roundType, roundValue, rounded } = useRound();

    useEffect(() => {
        setColumns(['Project', 'Time(h)', 'Time(decimal)']);
    }, []);

    useEffect(() => {
        let timeData = [];
        const projectDurArray = projects.map((project, index) => {
            const pRecords = records.filter((record) => record.projectId === project.id);
            const pTotalDur = pRecords.reduce(calcDurationReducer, 0);
            const pTime = rounded ? roundDuration(pTotalDur, roundValue, roundType) : pTotalDur;
            const time = formatDuration(pTime, timeFormat);
            const decimalTime = moment.duration(time).asHours().toFixed(2);
            timeData.push(pTime);
            return [project.name, time, decimalTime];
        });
        const unRecord = records.filter(r => !r.projectId);
        if (unRecord.length) {
            const unTotalDur = unRecord.reduce(calcDurationReducer, 0);
            const unTime = rounded ? roundDuration(unTotalDur, roundValue, roundType) : unTotalDur;
            const time = formatDuration(unTime, timeFormat);
            const decimalTime = moment.duration(time).asHours().toFixed(2);
            timeData.push(unTime);
            projectDurArray.push(['Unknown', time, decimalTime]);
        }
        projectDurArray.push([]);
        const duration = `${moment(weekStart).format(dateFormat)} - ${moment(weekStart).add(6, 'day').format(dateFormat)}`;
        const totalTime = formatDuration(timeData.length && timeData.reduce((accumulator, currentValue) => accumulator + currentValue), timeFormat);
        projectDurArray.push([`Total (${duration})`, totalTime, moment.duration(totalTime).asHours().toFixed(2)]);
        setData(projectDurArray);
    }, [records, projects]);

    return (
        <ExcelFile element={<div>Save as Excel</div>}>
            <ExcelSheet dataSet={[{ columns, data }]} name="Report"/>
        </ExcelFile>
    );
}
