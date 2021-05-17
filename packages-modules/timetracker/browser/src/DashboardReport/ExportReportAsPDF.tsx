import * as React from 'react';
import { useFela } from 'react-fela';
import { Divider, Table } from 'antd';
import { BarChart } from './BarChart';
import { DoughnutChart } from './DoughnutChart';
import moment, { Moment } from 'moment';
import { useTimeformat } from '../timetracker/hooks';

interface IExportReportAsPDF {
    weekStart: Moment;
    generateBarData: () => any;
    generateLabels: () => any;
    generateProjectDurations: () => any;
    generateProjectLabels: () => any;
    generateDatasource: () => any;
    generateTableColumns: () => any;
}

export const ExportReportAsPDF = (props: IExportReportAsPDF) => {
    const { weekStart, generateBarData, generateLabels, generateProjectLabels, generateProjectDurations, generateDatasource,
        generateTableColumns } = props;
    const { css } = useFela();
    const { dateFormat } = useTimeformat();

    return (
        <div style={{ display: 'none' }}>
            <div id={'projects-report'} className={css(styles.container)}>
                <div className={css(styles.title)}>Summary Report</div>
                <div className={css(styles.label)}>
                    <span>{moment(weekStart).format(dateFormat)}</span> -
                    <span>{moment(weekStart).add(6, 'day').format(dateFormat)}</span>
                </div>
                <div className={css(styles.barWrapper)}>
                    <BarChart title="Reports" data={generateBarData()} labels={generateLabels()} />
                </div>
                <Divider className={css(styles.divider)} orientation={'left'}>Project</Divider>
                <div className={css(styles.doughnutWrapper)}>
                    <DoughnutChart
                        title="Reports"
                        data={generateProjectDurations()}
                        labels={generateProjectLabels()}
                    />
                </div>
                <Divider className={css(styles.divider)} />
                <div>
                    <Table dataSource={generateDatasource()} columns={generateTableColumns()}/>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: () => ({
        width: '100%',
        background: '#ffffff',
        marginBottom: '10px'
    }),
    title: () => ({
        fontSize: '24px',
    }),
    label: () => ({
        color: '#808080',
    }),
    barWrapper: () => ({
        width: '80%',
        margin: '0px auto',
    }),
    doughnutWrapper: () => ({
       width: '50%',
    }),
    tableWrapper: () => ({
        margin: '0 80px',
    }),
    divider: () => ({
       marginTop: '50px',
    }),
}
