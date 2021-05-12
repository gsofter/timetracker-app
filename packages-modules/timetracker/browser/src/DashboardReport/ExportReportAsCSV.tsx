import * as React from 'react';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import { IProject_Output, ITimeRecord } from '@admin-layout/timetracker-core';
import { useEffect, useState } from 'react';
import { useTimeformat } from '../timetracker/hooks';
import { formatDuration, roundDuration } from '../timetracker/services/timeRecordService';

interface IExportReportAsCSV {
    records: Array<ITimeRecord>;
    projects: Array<IProject_Output>;
    roundType: string;
    roundValue: number;
    rounded: boolean;
    calcDurationReducer: (totalDur, record) => number;
}

export const ExportReportAsCSV = (props: IExportReportAsCSV) => {
    const { records, projects, calcDurationReducer, roundType, roundValue, rounded } = props;
    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);
    const { timeFormat } = useTimeformat();

    useEffect(() => {
        setHeaders([
            { label: 'Project', key: 'project' },
            { label: 'Time(h)', key: 'time_h' },
            { label: 'Time(decimal)', key: 'time_dec' },
        ]);
    }, []);

    useEffect(() => {
        const reportData = projects.map((project, index) => {
            const pRecords = records.filter((record) => record.projectId === project.id);
            const { time_h, time_dec } = getTotalTime(pRecords);
            return ({ project: project.name, time_h, time_dec });
        });
        const unRecord = records.filter(r => !r.projectId);
        if (unRecord.length) {
            const { time_h, time_dec } = getTotalTime(unRecord);
            reportData.push({ project: 'Unknown', time_h, time_dec });
        }
        setData(reportData);
    }, [JSON.stringify(records), JSON.stringify(projects), rounded, roundValue, roundType, timeFormat]);

    const getTotalTime = (pRecords) => {
        const pTotalDur = pRecords.reduce(calcDurationReducer, 0);
        const time = rounded ? roundDuration(pTotalDur, roundValue, roundType) : pTotalDur;
        const time_h = formatDuration(time, timeFormat);
        const time_dec = moment.duration(time_h).asHours().toFixed(2);
        return { time_h, time_dec };
    };

    return <CSVLink data={data} headers={headers}>Save as CSV</CSVLink>;
};
