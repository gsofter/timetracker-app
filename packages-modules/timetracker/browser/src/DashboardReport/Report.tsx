import * as React from 'react';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useFela } from 'react-fela';
import { Card, Switch, Col, Table, Radio, Row } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useSetting } from '@adminide-stack/react-shared-components';
import { IProject_Output, ITimeRecord } from '@admin-layout/timetracker-core';
import { formatDuration, roundDuration } from '../timetracker/services/timeRecordService';
import { useFirstWeekDay, useRound, useTimeformat } from '../timetracker/hooks';
import { BarChart } from './BarChart';
import { useGetDurationTimeRecordsQuery, useGetProjectsQuery } from '../generated-models';
import { DoughnutChart } from './DoughnutChart';

export const Report = () => {
    const { css } = useFela();
    const [weekStart, setWeekStart] = useState(moment().startOf('week'));

    const { data, loading, refetch, error } = useGetDurationTimeRecordsQuery({
        variables: {
            startTime: weekStart,
            endTime: moment(weekStart).add(1, 'week'),
        },
    });
    const { data: projectsData, loading: loadingProjects } = useGetProjectsQuery();
    //temporary
    const rounded = false;
    const roundType = 'round';
    const roundValue = 900;
    const dateFormat = 'MM-DD-YYYY';
    const timeFormat = 'hh:mm:ss A';

    // const { updateConfiguration } = useSetting({
    //     configKey: 'timetracker.report.timeRoundingInReports',
    // });
    // const { roundType, roundValue, rounded, refetchRounded } = useRound();
    // const { dateFormat, timeFormat } = useTimeformat();
    // const { value: dowValue } = useFirstWeekDay();

    useEffect(() => {
        setWeekStart(moment().startOf('week'));
    }, []);

    useEffect(() => {
        refetch();
    }, [weekStart]);

    // useEffect(() => {
    //     moment.locale('en', {
    //         week: { dow: dowValue },
    //     });
    //
    //     setWeekStart(moment().startOf('week'));
    // }, [dowValue]);
    //
    const getRecords = useCallback(
        (): Array<ITimeRecord> => (loading || !!!data ? [] : data.getDurationTimeRecords),
        [loading, data],
    );
    const getProjects = useCallback(
        (): Array<IProject_Output> =>
            loadingProjects || !!!projectsData ? [] : projectsData.getProjects,
        [loadingProjects, projectsData],
    );

    const calcDurationReducer = (totalDur, record) =>
        totalDur +
        Math.abs(
            Math.floor((moment(record.endTime).valueOf() - moment(record.startTime).valueOf()) / 1000),
        );

    const generateBarData = () => {
        return Array(7).fill(0).map((itemValue, index) => {
            // filter current day records
            const dayRecords = getRecords().filter(r =>
                moment(r.startTime).format(dateFormat) === moment(weekStart).add(index, 'day').format(dateFormat)
            );
            // calc total duration as seconds
            const totalDuration = dayRecords.reduce(calcDurationReducer, 0);
            return rounded ? roundDuration(totalDuration, roundValue, roundType) : totalDuration;
        });
    };

    const generateLabels = (): Array<string> => {
        return Array(7).fill(0).map((itemValue, itemIndex) =>
            moment(weekStart).add(itemIndex, 'day').format(dateFormat)
        );
    };

    const generateDatasource = () => {
        return getProjects().map((project, index) => {
            const pRecords = getRecords().filter(record => record.projectId === project.id);
            const pTotalDur = pRecords.reduce(calcDurationReducer, 0);
            return {
                projectName: project.name,
                duration: rounded ? roundDuration(pTotalDur, roundValue, roundType) : pTotalDur,
            };
        });
    };

    const generateTableColumns = () => {
        return [
            {
                key: 'projectName',
                dataIndex: 'projectName',
                title: 'Project Name',
            },
            {
                key: 'duration',
                dataIndex: 'duration',
                title: 'Duration',
                render: value => {
                    return <span> {formatDuration(value, timeFormat)}</span>;
                },
            },
        ];
    };

    const generateProjectLabels = () => {
        return getProjects().map((project, index) => {
            return project.name;
        });
    };

    const generateProjectDurations = () => {
        return getProjects().map((project, index) => {
            const pRecords = getRecords().filter(record => record.projectId === project.id);
            const pTotalDur = pRecords.reduce(calcDurationReducer, 0);
            return rounded ? roundDuration(pTotalDur, roundValue, roundType) : pTotalDur;
        });
    };

    const onClick = (e) => {
        const { value } = e.target;
        let newWeekStart;
        if (value === 'today') {
            newWeekStart = moment().startOf('week');
        } else if (value === 'back') {
            newWeekStart = moment(weekStart).add('-1', 'week');
        } else {
            newWeekStart = moment(weekStart).add('1', 'week');
        }
        setWeekStart(newWeekStart);
    }

    return (
        <div className={css(styles.container)}>
            <Card title={'Timetracker Report'} bordered={false}>
                <Row style={{ width: '100%', textAlign: 'center', alignItems: 'baseline' }}>
                    <Col xs={24} md={6} className={css(styles.left)}>
                        <Radio.Group>
                            <Radio.Button onClick={onClick} value={'back'}>
                                <LeftOutlined /><span>Back</span>
                            </Radio.Button>
                            <Radio.Button onClick={onClick} value={'today'}>Today</Radio.Button>
                            <Radio.Button onClick={onClick} value={'next'}>
                                <span>Next</span><RightOutlined/>
                            </Radio.Button>
                        </Radio.Group>
                    </Col>
                    <Col xs={24} md={12}>
                        <span className="duration-start"> {moment(weekStart).format('MMMM DD')}</span> -
                        <span className="duration-end">
                            {moment(weekStart).format('MM') === moment(weekStart).add(6, 'day').format('MM')
                                ? moment(weekStart).add(6, 'day').format('DD')
                                : moment(weekStart).add(6, 'day').format('MMMM DD')}
                        </span>
                    </Col>
                    <Col xs={24} md={6} className={css(styles.right)}>
                        <span className={css(styles.roundingLabel)}>Rounding:</span>
                        <Switch />
                    </Col>
                </Row>
                <div className={css(styles.barChartWrapper)}>
                    <BarChart title="Reports" data={generateBarData()} labels={generateLabels()} />
                </div>
            </Card>
            <div className={css(styles.flex, styles.height)}>
                <Card className={css(styles.tableCard)} title={'Project Table'}>
                    <Table dataSource={generateDatasource()} columns={generateTableColumns()} pagination={{ defaultPageSize: 3 }} />
                </Card>
                <Card className={css(styles.chartCard)} title={'Project Report'}>
                    <DoughnutChart
                        title="Reports"
                        data={generateProjectDurations()}
                        labels={generateProjectLabels()}
                    />
                </Card>
            </div>
        </div>
    );
};

const styles = {
    container: () => ({
        '& .ant-tabs-extra-content': {
           width: '55%',
        },
    }),
    flex: () => ({
        display: 'flex',
    }),
    roundingLabel: () => ({
        margin: '-1px 6px',
        fontWeight: 400,
    }),
    tableCard: () => ({
        width: '50%',
        marginTop: '25px',
        marginRight: '25px',
    }),
    chartCard: () => ({
        width: '50%',
        marginTop: '25px',
    }),
    barChartWrapper: () => ({
        width: '65%',
        margin: '0 auto',
    }),
    right: () => ({
        textAlign: 'right',
    }),
    left: () => ({
        textAlign: 'left',
    }),
    height: () => ({
        height: '400px',
    }),
};
