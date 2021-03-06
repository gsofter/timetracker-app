import * as React from 'react';
import { useState, useEffect } from 'react';
import { generatePath, useHistory, useParams } from 'react-router-dom';
import { useFela } from 'react-fela';
import { Card } from 'antd';
import * as qs from 'query-string';
import moment from 'moment';
import { capitalize } from '../../utils';
import { useGetOrganizationMembersQuery, useGetTimesheetsQuery } from '../../generated-models';
import { TimesheetTable } from './TimesheetTable';
import { ROUTES } from '../../timetracker/constants';
import * as _ from 'lodash';

enum VIEW_MODE {
    ALL = 'all',
    OPENED = 'opened',
    SUBMITTED = 'submitted',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}
export enum State {
    OPEN = 'OPEN',
    SUBMITTED = 'SUBMITTED',
    APPROVED = 'APPROVED',
    DENYED = 'DENYED',
}

export const Timesheet = () => {
    const [tabKey, setTabKey] = useState(VIEW_MODE.OPENED);
    const [timesheetData, setTimesheetData] = useState([]);
    const [filteredTimesheet, setFilteredTimesheet] = useState([]);
    const history = useHistory();
    const { orgName } = useParams();
    const { css } = useFela();

    const { data, loading } = useGetTimesheetsQuery({
        variables: {
            withTotalHours: true,
        },
        fetchPolicy: 'no-cache',
    });
    const { data: membersData, loading: loadingMembers } = useGetOrganizationMembersQuery();

    useEffect(() => {
        if (data) {
            const tempData = data.getTimesheets?.reverse().filter((timesheet) => {
               return moment().subtract(2, 'weeks') < moment(timesheet.startDate);
            });
            setTimesheetData(tempData);
        }
    }, [data]);

    useEffect(() => {
        let timeSheets = timesheetData.slice(0);
        switch (tabKey) {
            case VIEW_MODE.OPENED:
                timeSheets = timesheetData.filter((timesheet) => (timesheet.state === State.OPEN));
                break;
            case VIEW_MODE.SUBMITTED:
                timeSheets = timesheetData.filter((timesheet) => (timesheet.state === State.SUBMITTED));
                break;
            case VIEW_MODE.APPROVED:
                timeSheets = timesheetData.filter((timesheet) => (timesheet.state === State.APPROVED));
                break;
            case VIEW_MODE.REJECTED:
                timeSheets = timesheetData.filter((timesheet) => (timesheet.state === State.DENYED));
                break;
            default:
                break;
        }
        setFilteredTimesheet(timeSheets);
    }, [tabKey, timesheetData]);

    const onTabChange = (key) => {
        setTabKey(key);
    };

    const gotoTimesheetPage = () => {
        history.push({
            pathname: generatePath(ROUTES.Timesheet, { orgName }),
            search: qs.stringify({
                view: 'tabular',
                weekStart: moment().format('YYYY-MM-DD'),
                strict: 'true',
            }),
        });
    }

    const tabList = [
        { key: VIEW_MODE.OPENED, tab: capitalize(VIEW_MODE.OPENED) },
        { key: VIEW_MODE.SUBMITTED, tab: capitalize(VIEW_MODE.SUBMITTED) },
        { key: VIEW_MODE.APPROVED, tab: capitalize(VIEW_MODE.APPROVED) },
        { key: VIEW_MODE.REJECTED, tab: capitalize(VIEW_MODE.REJECTED) },
        { key: VIEW_MODE.ALL, tab: capitalize(VIEW_MODE.ALL) },
    ];

    if (loading || loadingMembers) {
        return null;
    }

    return (
        <Card
            className={css(styles.card)}
            title={'Timesheet(Last 2 week status)'}
            tabList={tabList}
            activeTabKey={tabKey}
            onTabChange={onTabChange}
        >
            <TimesheetTable
                timeSheets={filteredTimesheet}
                members={_.get(membersData, 'getOrganizationMembers', [])}
            />
            <a onClick={gotoTimesheetPage}>Check more...</a>
        </Card>
    );
};

const styles = {
    card: () => ({
        marginTop: '25px',
        '& .ant-tabs-tab': {
            fontSize: '15px !important',
        },
        '& .ant-table-row': {
            ':hover': {
                color: '#2b90fe !important',
            },
        },
    }),
    item: () => ({
        fontWeight: '500',
        marginRight: '10px',
    }),
}
