import * as React from 'react';
import { useFela } from 'react-fela';
import { Divider, Table } from 'antd';
import { BarChart } from './BarChart';
import { DoughnutChart } from './DoughnutChart';
import moment, { Moment } from 'moment';
import { useTimeformat } from '../timetracker/hooks';
import { formatDuration } from '../timetracker/services/timeRecordService';

interface IExportReportAsPDF {
  range: {
    start: Moment;
    end: Moment;
  };
  generateBarData: () => any;
  generateLabels: () => any;
  generateProjectDurations: () => any;
  generateProjectLabels: () => any;
  generateDatasource: () => any;
  generateTableColumns: () => any;
  getBillableDuration: () => any;
}

export const ExportReportAsPDF = (props: IExportReportAsPDF) => {
  const {
    range,
    generateBarData,
    generateLabels,
    generateProjectLabels,
    generateProjectDurations,
    generateDatasource,
    generateTableColumns,
    getBillableDuration,
  } = props;
  const { css } = useFela();
  const { dateFormat, timeFormat } = useTimeformat();

  const totalTime =
    generateProjectDurations().length &&
    generateProjectDurations().reduce((accumulator, currentValue) => accumulator + currentValue);

  return (
    <div className={css(styles.container)}>
      <div id={'projects-report'}>
        <div className={css(styles.title)}>Summary Report</div>
        <div className={css(styles.label)}>
          {`${moment(range.start).format(dateFormat)} - ${moment(range.end).add(6, 'day').format(dateFormat)}`}
        </div>
        <div className={css(styles.duration)}>
          <span className={css(styles.label)}>Total:</span>
          <span className={css(styles.value)}>{formatDuration(totalTime, timeFormat)}</span>
          <span className={css(styles.label)}>Billable:</span>
          <span className={css(styles.value)}>{getBillableDuration()}</span>
        </div>
        <div className={css(styles.barWrapper)}>
          <BarChart title="Reports" data={generateBarData()} labels={generateLabels()} />
        </div>
        <Divider className={css(styles.divider)} orientation={'left'}>
          Project
        </Divider>
        <div className={css(styles.doughnutWrapper)}>
          <DoughnutChart title="Reports" data={generateProjectDurations()} labels={generateProjectLabels()} />
        </div>
        <Divider className={css(styles.divider)} />
        <div>
          <Table rowKey="id" dataSource={generateDatasource()} columns={generateTableColumns()} pagination={false} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: () => ({
    width: '100%',
    opacity: '0',
  }),
  title: () => ({
    fontSize: '36px',
  }),
  duration: () => ({
    margin: '5px 0px',
  }),
  label: () => ({
    color: '#696868',
    fontSize: '18px',
  }),
  value: () => ({
    fontSize: '22px',
    marginLeft: '5px',
    marginRight: '50px',
  }),
  barWrapper: () => ({
    width: '100%',
    margin: '70px 0px',
  }),
  doughnutWrapper: () => ({
    width: '50%',
  }),
  tableWrapper: () => ({
    margin: '0 80px',
  }),
  divider: () => ({
    margin: '30px 0px !important',
    borderTopColor: '#929292 !important',
  }),
};
