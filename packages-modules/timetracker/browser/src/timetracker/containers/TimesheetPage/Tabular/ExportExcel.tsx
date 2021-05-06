import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from 'antd';
import ReactExport from 'react-export-excel';
import moment, { Moment } from 'moment';
import { useTimeformat } from '../../../hooks';
import { formatDuration } from '../../../services/timeRecordService';
import { IProjects as IProject, ITimeRecord } from '@admin-layout/timetracker-core';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

interface IExportExcel {
    weekStart: Moment;
    approvals: Array<string>;
    unApprovals: Array<string>;
    projectsMap: Map<string, IProject>;
    records: ITimeRecord[];
    getProjectTotalDuration: (projectId: string, approved: boolean) => number;
}

export const ExportExcel = (props: IExportExcel) => {
    const { weekStart, approvals, unApprovals, records, projectsMap, getProjectTotalDuration } = props;
    const [columns, setColumns] = useState([]);
    const { timeFormat, dateFormat } = useTimeformat();

    useEffect(() => {
        let cols = ['ProjectName'];
        const days = Array(7)
            .fill(0)
            .map((val, index) => {
                const curDay = moment(weekStart).add(index, 'day');
                return curDay.format(dateFormat);
            })
        cols.push(...days, 'Total');
        setColumns(cols);
    }, [weekStart, dateFormat]);

    const getRecordData = (record, approved) => {
        return record.map((pId) => {
            const project = projectsMap.get(pId);
            let temp = {
                ProjectName: project.name,
                Total: formatDuration(getProjectTotalDuration(project.id, approved), timeFormat),
            };
            Array(7)
                .fill(0)
                .map((val, index) => {
                    const curDay = moment(weekStart).add(index, 'day');
                    const curDayRecords = records.filter(
                        (r) =>
                            r.projectId === project.id &&
                            moment(r.startTime).format(dateFormat) === curDay.format(dateFormat) &&
                            !r.timesheetId,
                    );
                    const duration = curDayRecords.reduce((totalDur, r) => {
                        const dur = Math.floor((moment(r.endTime).valueOf() - moment(r.startTime).valueOf()) / 1000);
                        return (totalDur + Math.abs(dur));
                    }, 0);
                    temp = { ...temp, [curDay.format(dateFormat)]: formatDuration(duration, timeFormat) };
                });
            return temp;
        });
    };

    const approvedData = getRecordData(approvals, true);
    const unApprovedData = getRecordData(unApprovals, false);

    return (
        <ExcelFile element={<Button type="primary">Export timesheet as excel</Button>}>
            <ExcelSheet data={[...approvedData, ...unApprovedData]} name="Timesheet">
                {columns.map((col) => (
                    <ExcelColumn label={col} value={col}/>
                ))}
            </ExcelSheet>
        </ExcelFile>
    );
}
