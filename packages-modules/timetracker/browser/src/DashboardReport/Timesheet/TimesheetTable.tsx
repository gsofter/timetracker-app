import * as React from 'react';
import { useEffect, useState } from 'react';
import { generatePath, useHistory, useParams } from 'react-router-dom';
import { Table, Tag } from 'antd';
import moment from 'moment';
import * as qs from 'query-string';
import { ROUTES } from '../../timetracker/constants';
import { formatDuration } from '../../timetracker/services/timeRecordService';
import { useTimeformat } from '../../timetracker/hooks';
import { State } from './Timesheet';

interface ITimesheetTable {
    members: any;
    timeSheets: any;
}

export const TimesheetTable = (props: ITimesheetTable) => {
    const { members, timeSheets } = props;
    const [columns, setColumns] = useState([]);
    const history = useHistory();
    const { orgName } = useParams();
    const { dateFormat } = useTimeformat();

    useEffect(() => {
        setColumns([
            {
                title: 'User',
                dataIndex: 'userId',
                key: 'userId',
                render: (value) => {
                    const member = members.find((m) => m.userId === value);
                    return (<div>{member !== undefined ? member.name : ''}</div>);
                },
            },
            {
                title: 'Start Date',
                dataIndex: 'startDate',
                key: 'startDate',
                render: (value) => <div>{moment(value).format(dateFormat || 'YYYY-MM-DD')}</div>,
            },
            {
                title: 'End Date',
                dataIndex: 'endDate',
                key: 'endDate',
                render: (value) => <div>{moment(value).add(-1, 'day').format(dateFormat || 'YYYY-MM-DD')}</div>,
            },
            {
                title: 'Duration',
                dataIndex: 'totalDuration',
                key: 'totalDuration',
                render: (value) => <div>{formatDuration(value)}</div>,
            },
            {
                title: 'Submitted On',
                dataIndex: 'submittedOn',
                key: 'submittedOn',
                render: (value) => <div>{value ? moment(value).format(dateFormat || 'YYYY-MM-DD') : '-'}</div>,
            },
            {
                title: 'State',
                dataIndex: 'state',
                key: 'state',
                render: (value) => {
                    const color = {
                        [State.OPEN]: 'orange',
                        [State.APPROVED]: 'green',
                        [State.SUBMITTED]: 'blue',
                        [State.DENYED]: 'red',
                    };
                    return <Tag color={color[value]}>{value}</Tag>;
                },
            }
        ])
    }, []);

    const onRow = (record, index) => {
        return {
            onClick: event => {
                history.push({
                    pathname: generatePath(ROUTES.Timesheet, { orgName }),
                    search: qs.stringify({
                        view: 'tabular',
                        weekStart: moment(record.startDate).format('YYYY-MM-DD'),
                        strict: 'true',
                    }),
                });
            },
        };
    };

    return (
        <Table
            rowKey="id"
            columns={columns}
            dataSource={timeSheets}
            pagination={{ defaultPageSize: 5 }}
            onRow={onRow}
        />
    );
}
