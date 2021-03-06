import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useFela } from 'react-fela';
import { Switch, message, Card, Dropdown, Menu, Button, Space, DatePicker, Row, Col } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import moment, { Moment } from 'moment';
import { IProject_Output, ITimeRecord } from '@admin-layout/timetracker-core';
import { BarChart } from './BarChart';
import { DoughnutChart } from './DoughnutChart';
import { formatDuration, roundDuration } from '../timetracker/services/timeRecordService';
import { useRound, useTimeformat } from '../timetracker/hooks';
import { ExportReportAsExcel } from './ExportReportAsExcel';
import { ExportReportAsCSV } from './ExportReportAsCSV';
import { ExportReportAsPDF } from './ExportReportAsPDF';
import { calculateCost, calculateProfit } from '../utils';
import { ReportTable } from './ReportTable';
import { Timesheet } from './Timesheet/Timesheet';
import * as _ from 'lodash';

const { RangePicker } = DatePicker;

interface IRecord {
  data: Array<ITimeRecord>;
  payRate: number;
  billRate: number;
}
interface IRecordsByUserId extends Partial<Record<string, IRecord>> {}

interface IReportsProps {
  range: {
    start: Moment;
    end: Moment;
  };
  users: any;
  projects: Array<IProject_Output>;
  records: Array<ITimeRecord>;
  setRange: Function;
  updateConfiguration: Function;
  recordsByUserId: IRecordsByUserId;
}

enum ShowType {
  SHOW_AMOUNT = 'Show amount',
  SHOW_COST = 'Show cost',
  SHOW_PROFIT = 'Show profit',
  HIDE_AMOUNT = 'Hide amount',
}

export enum GroupBy {
  USER = 'user',
  DESCRIPTION = 'description',
  PROJECT = 'project',
  TAG = 'tag',
}

export const Reports: React.FC<IReportsProps> = ({ range, projects, records,
                                                   recordsByUserId, setRange, updateConfiguration, users }) => {
  const [isRounded, setIsRounded] = useState(false);
  const [showType, setShowType] = useState(ShowType.SHOW_AMOUNT);
  const [groupBy, setGroupBy] = useState(GroupBy.PROJECT);
  const [groupByRecords, setGroupByRecords] = useState([]);
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

  useEffect(() => {
    let list = [];
    switch (groupBy) {
      case GroupBy.PROJECT:
        list = _.chain(records)
            .groupBy('projectId')
            .map((value, key) => {
              const name = projects?.find(p => (p.id === key))?.name || 'Unknown';
              return ({ id: key, name, records: value });
            })
            .value();
        break;
      case GroupBy.USER:
        list = _.chain(records)
            .groupBy('userId')
            .map((value, key) => {
              const name = users?.find((u) => (u.userId === key))?.name || '(Without user)';
              return ({ id: key, name, records: value });
            })
            .value();
        break;
      case GroupBy.DESCRIPTION:
        list = _.chain(records)
            .groupBy('description')
            .map((value, key) => {
              const name = (key && key !== 'null') ? key : '(Without description)';
              return ({ id: key, name, records: value })
            })
            .value();
        break;
      case GroupBy.TAG:
        list = _.chain(records)
            .groupBy('tags')
            .map((value, key) => {
              return ({ id: key, name: key || '(Without tag)', records: value })
            })
            .value();
        break;
      default:
        break;
    }
    setGroupByRecords(list);
  }, [groupBy, records, projects, users]);

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
    const pLabels = groupByRecords.map((item, index) => {
      const pTotalDur = item.records.reduce(calcDurationReducer, 0);
      const duration = rounded ? roundDuration(pTotalDur, roundValue, roundType) : pTotalDur;
      return `${item.name} - ${formatDuration(duration, timeFormat)}`;
    });
    return pLabels;
  };

  const generateProjectDurations = () => {
    const pDurArray = groupByRecords.map((item, index) => {
      const pTotalDur = item.records.reduce(calcDurationReducer, 0);
      return rounded ? roundDuration(pTotalDur, roundValue, roundType) : pTotalDur;
    });
    return pDurArray;
  };

  const getBillableDuration = (records) => {
    const billableRecords = records.filter((record) => record.isBillable);
    const totalDur = billableRecords.reduce(calcDurationReducer, 0);
    return rounded ? roundDuration(totalDur, roundValue, roundType) : totalDur;
  };

  const generateTableColumns = () => {
    return [
      {
        key: 'title',
        dataIndex: 'title',
        title: 'Title',
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
    const pDuration = groupByRecords.map((item, index) => {
      const pTotalDur = item.records.reduce(calcDurationReducer, 0);
      return {
        id: index,
        title: item.name,
        duration: rounded ? roundDuration(pTotalDur, roundValue, roundType) : pTotalDur,
      };
    });
    return pDuration;
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
            groupBy={groupBy}
            groupByRecords={groupByRecords}
            rounded={rounded}
            roundValue={roundValue}
            roundType={roundType}
            calcDurationReducer={calcDurationReducer}
          />
        </Menu.Item>
        <Menu.Item>
          <ExportReportAsExcel
            range={range}
            groupBy={groupBy}
            groupByRecords={groupByRecords}
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
          <Menu.Item key={ShowType.SHOW_AMOUNT}>{ShowType.SHOW_AMOUNT}</Menu.Item>
          <Menu.Item key={ShowType.SHOW_COST}>{ShowType.SHOW_COST}</Menu.Item>
          <Menu.Item key={ShowType.SHOW_PROFIT}>{ShowType.SHOW_PROFIT}</Menu.Item>
          <Menu.Item key={ShowType.HIDE_AMOUNT}>{ShowType.HIDE_AMOUNT}</Menu.Item>
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

  const getAmount = useCallback(() => {
    let amount = 0;
    let cost = 0;
    let profit = 0;
    Object.values(recordsByUserId)?.forEach((record: IRecord) => {
      const { data, payRate = 0, billRate = 0 } = record;
      if (data) {
        const billable = getBillableDuration(data);
        const hours = (billable / 3600);
        amount += (hours * payRate);
        cost += calculateCost(payRate, hours);
        profit += calculateProfit(payRate, billRate, hours);
      }
    });
    return { amount, cost, profit };
  }, [recordsByUserId])

  const totalTime =
      generateProjectDurations().length &&
      generateProjectDurations().reduce((accumulator, currentValue) => accumulator + currentValue);

  const getHeader = (labelStyle, valueStyle) => {
    const { amount, cost, profit } = getAmount();
    switch (showType) {
      case ShowType.SHOW_AMOUNT:
        return (
            <>
              <span className={css(labelStyle)}>Billable:</span>
              <span className={css(valueStyle)}>{formatDuration(getBillableDuration(records), timeFormat)}</span>
              <span className={css(labelStyle)}>Amount:</span>
              <span className={css(valueStyle)}>{amount.toFixed(2)} USD</span>
            </>
        );
      case ShowType.SHOW_COST:
        return (
            <>
              <span className={css(labelStyle)}>Cost:</span>
              <span className={css(valueStyle)}>{cost.toFixed(2)} USD</span>
            </>
        );
      case ShowType.SHOW_PROFIT:
        return (
            <>
              <span className={css(labelStyle)}>Profit:</span>
              <span className={css(valueStyle)}>{profit?.toFixed(2)} USD</span>
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
        {getHeader(styles.label, styles.value)}
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
        <ReportTable
            groupBy={groupBy}
            setGroupBy={setGroupBy}
            generateDatasource={generateDatasource}
            generateTableColumns={generateTableColumns}
        />
        <Card className={css(styles.chartCard)} title={'Report'}>
          <DoughnutChart title="Reports" data={generateProjectDurations()} labels={generateProjectLabels()} />
        </Card>
      </div>
      <Timesheet/>
      <ExportReportAsPDF
        range={range}
        generateBarData={generateBarData}
        generateLabels={generateLabels}
        generateProjectDurations={generateProjectDurations}
        generateProjectLabels={generateProjectLabels}
        generateTableColumns={generateTableColumns}
        generateDatasource={generateDatasource}
        getHeader={getHeader}
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
