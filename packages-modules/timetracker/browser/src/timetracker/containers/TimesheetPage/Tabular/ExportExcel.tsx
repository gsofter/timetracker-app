import * as React from 'react';
import { Button } from 'antd';
import ReactExport from 'react-export-excel';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

//temporary passing static value
const dataSet = [
    {
        name: 'adminIde-stack',
        startTime: '00:00:00',
        endTime: '00:30:00',
    },
    {
        name: 'Project-A',
        startTime: '00:00:00',
        endTime: '01:30:00',
    },
    {
        name: 'Test',
        startTime: '00:00:00',
        endTime: '00:30:00',
    },
    {
        name: 'Project-B',
        startTime: '00:00:00',
        endTime: '00:30:00',
    }
];

export const ExportExcel = () => {
    return (
        <ExcelFile element={<Button type="primary">Export timesheet as excel</Button>}>
            <ExcelSheet data={dataSet} name="Timesheet">
                <ExcelColumn label="Project Name" value="name"/>
                <ExcelColumn label="Start Time" value="startTime"/>
                <ExcelColumn label="End Time" value="endTime"/>
            </ExcelSheet>
        </ExcelFile>
    );
}
