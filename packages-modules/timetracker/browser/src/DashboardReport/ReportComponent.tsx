import React, { useEffect, useState, useMemo } from 'react';
import { useFela } from 'react-fela';
import { Switch, Table, message, Card, Dropdown, Menu, Button, Space, DatePicker, Row, Col } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import moment, { Moment } from 'moment';
import { ITimeRecord, IProject_Output } from '@admin-layout/timetracker-core';
import { BarChart } from './BarChart';
import { DoughnutChart } from './DoughnutChart';
import { formatDuration, roundDuration } from '../timetracker/services/timeRecordService';
import { useRound, useTimeformat } from '../timetracker/hooks';
import { ExportReportAsExcel } from './ExportReportAsExcel';
import { ExportReportAsCSV } from './ExportReportAsCSV';
import { ExportReportAsPDF } from './ExportReportAsPDF';
import * as _ from 'lodash';
const { RangePicker } = DatePicker;
interface IReportsProps {
  range: {
    start: Moment;
    end: Moment;
  };
  projects: Array<IProject_Output>;
  records: Array<ITimeRecord>;
  setRange: Function;
  updateConfiguration: Function;
}

export const Reports: React.FC<IReportsProps> = ({ range, projects, records, setRange, updateConfiguration }) => {
  const [isRounded, setIsRounded] = useState(false);
  const [showType, setShowType] = useState('Show amount')
  const { roundType, roundValue, rounded, refetchRounded } = useRound();
  const { dateFormat, timeFormat } = useTimeformat();
  const { css } = useFela();

  const debounceFunc = useMemo(
    () =>
      _.debounce((checked) => {
        updateConfiguration({ updateKey: 'timetracker.report.timeRoundingInReports', value: checked })
          .then(async () => {
            await refetchRounded();
            message.success('Rounded setting updated');
          })
          .catch((e) => {
            console.log(e.message);
          });
      }, 1000),
    [updateConfiguration],
  );

  const handleSwitchRoundMode = (checked) => {
    setIsRounded(checked);
    debounceFunc(checked);
  };

  const handleChangeRange = (range, str) => {
    const start = moment(range[0]);
    const end = moment(range[1]);
    setRange({ start, end });
  };

  useEffect(() => {
    setIsRounded(rounded);
  }, [rounded]);

  const generateLabels = (): Array<string> => {
    const daysCnt = Math.abs(moment(range.end).diff(range.start, 'days'));
    const labels = Array(daysCnt)
      .fill(0)
      .map((itemValue, itemIndex) => {
        return moment(range.start).add(itemIndex, 'day').format('ddd, MMM D');
      });
    return labels;
  };

  const calcDurationReducer = (totalDur, record) =>
    totalDur + Math.abs(Math.floor((moment(record.endTime).valueOf() - moment(record.startTime).valueOf()) / 1000));

  const generateBarData = () => {
    const daysCnt = Math.abs(moment(range.start).diff(range.end, 'days'));
    const dataSet = Array(daysCnt)
      .fill(0)
      .map((itemValue, itemIndex) => {
        const curDayStr = moment(range.start).add(itemIndex, 'day').format(dateFormat);
        const curDayRecords = records.filter((r) => curDayStr === moment(r.startTime).format(dateFormat));

        const totalDuration = curDayRecords.reduce(calcDurationReducer, 0);
        return rounded ? roundDuration(totalDuration, roundValue, roundType) : totalDuration;
      });
    return dataSet;
  };

  const generateProjectLabels = () => {
    const projectLabels = projects.map((project, index) => {
      const pRecords = records.filter((record) => record.projectId === project.id);
      const pTotalDur = pRecords.reduce(calcDurationReducer, 0);
      const duration = rounded ? roundDuration(pTotalDur, roundValue, roundType) : pTotalDur;
      return `${project.name} - ${formatDuration(duration, timeFormat)}`;
    });
    const unRecord = records.filter((r) => !r.projectId);
    if (unRecord.length) {
      const unTotalDur = unRecord.reduce(calcDurationReducer, 0);
      const unDuration = formatDuration(
        rounded ? roundDuration(unTotalDur, roundValue, roundType) : unTotalDur,
        timeFormat,
      );
      projectLabels.push(`Unknown - ${unDuration}`);
    }
    return projectLabels;
  };

  const generateProjectDurations = () => {
    const projectDurArray = projects.map((project, index) => {
      const pRecords = records.filter((record) => record.projectId === project.id);
      const pTotalDur = pRecords.reduce(calcDurationReducer, 0);
      return rounded ? roundDuration(pTotalDur, roundValue, roundType) : pTotalDur;
    });
    const unRecord = records.filter((r) => !r.projectId);
    if (unRecord.length) {
      const unTotalDur = unRecord.reduce(calcDurationReducer, 0);
      projectDurArray.push(rounded ? roundDuration(unTotalDur, roundValue, roundType) : unTotalDur);
    }
    return projectDurArray;
  };

  const getBillableDuration = () => {
    const projectDurArray = projects.map((project, index) => {
      const pRecords = records.filter((record) => record.projectId === project.id && record.isBillable);
      const pTotalDur = pRecords.reduce(calcDurationReducer, 0);
      return rounded ? roundDuration(pTotalDur, roundValue, roundType) : pTotalDur;
    });
    const unRecords = records.filter((r) => !r.projectId && r.isBillable);
    if (unRecords.length) {
      const unTotalDur = unRecords.reduce(calcDurationReducer, 0);
      projectDurArray.push(rounded ? roundDuration(unTotalDur, roundValue, roundType) : unTotalDur);
    }
    const totalBillableTime =
      projectDurArray.length && projectDurArray.reduce((accumulator, currentValue) => accumulator + currentValue);
    return formatDuration(totalBillableTime, timeFormat);
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
        render: (value) => {
          return <span> {formatDuration(value, timeFormat)}</span>;
        },
      },
    ];
  };

  const generateDatasource = () => {
    const projectDurArray = projects.map((project, index) => {
      const pRecords = records.filter((record) => record.projectId === project.id);
      const pTotalDur = pRecords.reduce(calcDurationReducer, 0);
      return {
        id: index,
        projectName: project.name,
        duration: rounded ? roundDuration(pTotalDur, roundValue, roundType) : pTotalDur,
      };
    });
    const unRecord = records.filter((r) => !r.projectId);
    if (unRecord.length) {
      const unTotalDur = unRecord.reduce(calcDurationReducer, 0);
      projectDurArray.push({
        id: projects.length,
        projectName: 'Unknown',
        duration: rounded ? roundDuration(unTotalDur, roundValue, roundType) : unTotalDur,
      });
    }
    return projectDurArray;
  };

  const saveAsPdf = () => {
    const input = document.getElementById('projects-report');
    if (input) {
      const html2PDF = require('jspdf-html2canvas');

      html2PDF(input, {
        jsPDF: {
          format: 'a4',
        },
        margin: {
          top: 40,
          right: 30,
          bottom: 40,
          left: 30,
        },
        imageType: 'image/jpeg',
        output: 'report_pdf.pdf',
      });
    }
  };

  const exportMenu = () => {
    const menu = (
      <Menu>
        <Menu.Item onClick={saveAsPdf}>Save as PDF</Menu.Item>
        <Menu.Item>
          <ExportReportAsCSV
            records={records}
            projects={projects}
            rounded={rounded}
            roundValue={roundValue}
            roundType={roundType}
            calcDurationReducer={calcDurationReducer}
          />
        </Menu.Item>
        <Menu.Item>
          <ExportReportAsExcel
            range={range}
            records={records}
            projects={projects}
            rounded={rounded}
            roundValue={roundValue}
            roundType={roundType}
            calcDurationReducer={calcDurationReducer}
          />
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} placement="bottomCenter">
        <Button>
          <span>Export</span>
          <CaretDownOutlined />
        </Button>
      </Dropdown>
    );
  };

  const handleMenuClick = (e) => {
    setShowType(e.key);
  }

  const showAmount = () => {
    const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key={'Show amount'}>Show amount</Menu.Item>
          <Menu.Item key={'Show cost'}>Show cost</Menu.Item>
          <Menu.Item key={'Show profit'}>Show profit</Menu.Item>
          <Menu.Item key={'Hide amount'}>Hide amount</Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={menu} placement="bottomCenter">
          <Button>
            <span>{showType}</span>
            <CaretDownOutlined />
          </Button>
        </Dropdown>
    );
  };

  const generateRanges = () => [
    {
      label: 'Today',
      start: moment().startOf('day'),
      end: moment().endOf('day'),
    },
    {
      label: 'Yesterday',

      start: moment().add(-1, 'day').startOf('day'),
      end: moment().add(-1, 'day').endOf('day'),
    },
    {
      label: 'This week',

      start: moment().startOf('week'),
      end: moment().endOf('week'),
    },
    {
      label: 'Last week',

      start: moment().add(-1, 'week').startOf('week'),
      end: moment().add(-1, 'week').endOf('week'),
    },
    {
      label: 'This month',
      start: moment().startOf('month'),
      end: moment().endOf('month'),
    },
    {
      label: 'Last month',
      start: moment().add(-1, 'month').startOf('month'),
      end: moment().add(-1, 'month').endOf('month'),
    },
  ];

  const handleClickRange = (range) => {
    setRange({
      start: moment(range.start),
      end: moment(range.end),
    });
  };

  const totalTime =
      generateProjectDurations().length &&
      generateProjectDurations().reduce((accumulator, currentValue) => accumulator + currentValue);

  const getHeader = () => {
    switch (showType) {
      case 'Show amount':
        return (
            <>
              <span className={css(styles.label)}>Billable:</span>
              <span className={css(styles.value)}>{getBillableDuration()}</span>
              <span className={css(styles.label)}>Amount:</span>
              <span className={css(styles.value)}>0.00 USD</span>
            </>
        );
      case 'Show cost':
        return (
            <>
              <span className={css(styles.label)}>Cost:</span>
              <span className={css(styles.value)}>0.00 USD</span>
            </>
        );
      case 'Show profit':
        return (
            <>
              <span className={css(styles.label)}>Profit:</span>
              <span className={css(styles.value)}>0.00 USD</span>
            </>
        );
      default:
        return null;
    }
  }

  const header = (
      <div>
        <span className={css(styles.label)}>Total:</span>
        <span className={css(styles.value)}>{formatDuration(totalTime, timeFormat)}</span>
        {getHeader()}
      </div>
  );


  const panelRender = (originalPanel: React.ReactNode) => {
    return (
      <Row>
        <Col xs={24} md={5}>
          <Space direction="vertical" style={{ width: '100%' }}>
            {generateRanges().map((range) => {
              return (
                <Button onClick={() => handleClickRange(range)} key={range.label} style={{ width: '100%' }}>
                  {range.label}
                </Button>
              );
            })}
          </Space>
        </Col>
        <Col xs={24} md={18} style={{ paddingRight: '50px' }}>
          {originalPanel}
        </Col>
      </Row>
    );
  };
  return (
    <div className={css(styles.container)}>
      <Card title={'Timetracker Report'} bordered={false} extra={header}>
        <div className={css(styles.flex)}>
          <div className={css(styles.left)}>
            <RangePicker onChange={handleChangeRange} panelRender={panelRender} value={[range.start, range.end]} />
          </div>
          <div className={css(styles.right)}>
            <span className={css(styles.roundingLabel)}>Rounding:</span>
            <Switch size={'small'} checked={isRounded} onChange={handleSwitchRoundMode} />
            <span className={css(styles.m10)}>{exportMenu()}</span>
            <span>{showAmount()}</span>
          </div>
        </div>
        <div className={css(styles.title)}>
          <span className="duration-start"> {moment(range.start).format('MMMM DD')}</span> -
          <span className="duration-end">
            {moment(range.start).format('MM') === moment(range.end).format('MM')
              ? moment(range.end).format('DD')
              : moment(range.end).format('MMMM DD')}
          </span>
        </div>
        <div className={css(styles.barChartWrapper)}>
          <BarChart title="Reports" data={generateBarData()} labels={generateLabels()} />
        </div>
      </Card>
      <div className={css(styles.flexM)}>
        <Card className={css(styles.tableCard)} title={'Project Table'}>
          <Table
            rowKey="id"
            dataSource={generateDatasource()}
            columns={generateTableColumns()}
            pagination={{ defaultPageSize: 3 }}
          />
        </Card>
        <Card className={css(styles.chartCard)} title={'Project Report'}>
          <DoughnutChart title="Reports" data={generateProjectDurations()} labels={generateProjectLabels()} />
        </Card>
      </div>
      <ExportReportAsPDF
        range={range}
        generateBarData={generateBarData}
        generateLabels={generateLabels}
        generateProjectDurations={generateProjectDurations}
        generateProjectLabels={generateProjectLabels}
        generateTableColumns={generateTableColumns}
        generateDatasource={generateDatasource}
        getBillableDuration={getBillableDuration}
      />
    </div>
  );
};

const styles = {
  container: () => ({
    '& .ant-table-cell': {
      padding: '11px',
    },
  }),
  flex: () => ({
    display: 'flex',
  }),
  flexM: () => ({
    '@media (min-width: 800px)': {
      display: 'flex',
    },
  }),
  roundingLabel: () => ({
    margin: '-1px 6px',
    fontWeight: 400,
  }),
  tableCard: () => ({
    '@media (min-width: 800px)': {
      width: '50%',
      marginRight: '25px',
    },
    marginTop: '25px',
  }),
  chartCard: () => ({
    '@media (min-width: 800px)': {
      width: '50%',
    },
    marginTop: '25px',
  }),
  barChartWrapper: () => ({
    margin: '0 auto',
    '@media (min-width: 1200px)': {
      width: '80%',
    },
  }),
  right: () => ({
    textAlign: 'right',
    width: '50%',
  }),
  left: () => ({
    textAlign: 'left',
    width: '50%',
  }),
  title: () => ({
    width: '100%',
    textAlign: 'center',
  }),
  m10: () => ({
    margin: '0 10px',
  }),
  label: () => ({
    color: '#696868',
    marginLeft: '20px',
    marginRight: '5px',
  }),
  value: () => ({
    fontSize: '16px',
    fontWeight: '500',
  }),
};
