import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Button, Switch, Table, message, Card, Radio } from 'antd';
import { PageContainer } from '@admin-layout/components';
import { BarChart } from './BarChart';
import { DoughnutChart } from './DoughnutChart';
import moment, { Moment } from 'moment';
import { ITimeRecord, IProject_Output } from '@admin-layout/timetracker-core';
import { formatDuration, roundDuration } from '../timetracker/services/timeRecordService';
import { useFirstWeekDay, useRound, useTimeformat } from '../timetracker/hooks';
import * as _ from 'lodash';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useFela } from 'react-fela';

interface IReportsProps {
  weekStart: Moment;
  projects: Array<IProject_Output>;
  records: Array<ITimeRecord>;
  setWeekStart: Function;
  updateConfiguration: Function;
}

export const Reports: React.FC<IReportsProps> = ({
  weekStart,
  projects,
  records,
  setWeekStart,
  updateConfiguration,
}) => {
  const [isRounded, setIsRounded] = useState(false);
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

  useEffect(() => {
    setIsRounded(rounded);
  }, [rounded]);

  const generateLabels = (): Array<string> => {
    const labels = Array(7)
      .fill(0)
      .map((itemValue, itemIndex) => {
        return moment(weekStart).add(itemIndex, 'day').format(dateFormat);
      });
    return labels;
  };

  const calcDurationReducer = (totalDur, record) =>
    totalDur + Math.abs(Math.floor((moment(record.endTime).valueOf() - moment(record.startTime).valueOf()) / 1000));

  const generateBarData = () => {
    const dataSet = Array(7)
      .fill(0)
      .map((itemValue, index) => {
        // filter current day records
        const dayRecords = records.filter(
          (r) => moment(r.startTime).format(dateFormat) === moment(weekStart).add(index, 'day').format(dateFormat),
        );

        // calc total duration as seconds
        const totalDuration = dayRecords.reduce(calcDurationReducer, 0);
        return rounded ? roundDuration(totalDuration, roundValue, roundType) : totalDuration;
      });
    return dataSet;
  };

  const generateProjectLabels = () => {
    const projectLabels = projects.map((project, index) => {
      return project.name;
    });
    return projectLabels;
  };

  const generateProjectDurations = () => {
    const projectDurArray = projects.map((project, index) => {
      const pRecords = records.filter((record) => record.projectId === project.id);
      const pTotalDur = pRecords.reduce(calcDurationReducer, 0);
      return rounded ? roundDuration(pTotalDur, roundValue, roundType) : pTotalDur;
    });
    return projectDurArray;
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
        projectName: project.name,
        duration: rounded ? roundDuration(pTotalDur, roundValue, roundType) : pTotalDur,
      };
    });
    return projectDurArray;
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
  };

  return (
    <div className={css(styles.container)}>
      <Card title={'Timetracker Report'} bordered={false}>
        <Row style={{ width: '100%', textAlign: 'center', alignItems: 'baseline' }}>
          <Col xs={24} md={6} className={css(styles.left)}>
            <Radio.Group>
              <Radio.Button onClick={onClick} value={'back'}>
                <LeftOutlined />
                <span>Back</span>
              </Radio.Button>
              <Radio.Button onClick={onClick} value={'today'}>
                Today
              </Radio.Button>
              <Radio.Button onClick={onClick} value={'next'}>
                <span>Next</span>
                <RightOutlined />
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
            <Switch checked={isRounded} onChange={handleSwitchRoundMode} />
          </Col>
        </Row>
        <div className={css(styles.barChartWrapper)}>
          <BarChart title="Reports" data={generateBarData()} labels={generateLabels()} />
        </div>
      </Card>
      <div className={css(styles.flex)}>
        <Card className={css(styles.tableCard)} title={'Project Table'}>
          <Table
            dataSource={generateDatasource()}
            columns={generateTableColumns()}
            pagination={{ defaultPageSize: 3 }}
          />
        </Card>
        <Card className={css(styles.chartCard)} title={'Project Report'}>
          <DoughnutChart title="Reports" data={generateProjectDurations()} labels={generateProjectLabels()} />
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
    '& .ant-table-cell': {
      padding: '11px',
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
    // width: '65%',
    margin: '0 auto',
  }),
  right: () => ({
    textAlign: 'right',
  }),
  left: () => ({
    textAlign: 'left',
  }),
};
