import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Button, Switch, Table, message, DatePicker, Space } from 'antd';
import { PageContainer } from '@admin-layout/components';
import { BarChart, DoughnutChart } from '../../components/Charts';
import moment, { Moment } from 'moment';
import { ITimeRecord, IProject_Output } from '@admin-layout/timetracker-core';
import { formatDuration, roundDuration } from '../../services/timeRecordService';
import { useRound, useTimeformat } from '../../hooks';
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

const Reports: React.FC<IReportsProps> = ({ range, projects, records, setRange, updateConfiguration }) => {
  const [isRounded, setIsRounded] = useState(false);
  const { roundType, roundValue, rounded, refetchRounded } = useRound();
  const { dateFormat, timeFormat } = useTimeformat();

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

  const handleChangeRange = (range, str) => {
    const start = range[0];
    const end = range[1];
    setRange({ startTime: start, endTime: end });
  };

  const generateLabels = (): Array<string> => {
    const daysCnt = moment(range.start).diff(range.end, 'days');

    const labels = Array(daysCnt)
      .fill(0)
      .map((itemValue, itemIndex) => {
        return moment(range.start).add(itemIndex, 'day').format(dateFormat);
      });
    return labels;
  };

  const calcDurationReducer = (totalDur, record) =>
    totalDur + Math.abs(Math.floor((moment(record.endTime).valueOf() - moment(record.startTime).valueOf()) / 1000));

  const generateBarData = () => {
    const daysCnt = moment(range.start).diff(range.end, 'days');
    const DATE_FORMAT = 'YYYY-MM-DD';
    const dataSet = Array(daysCnt)
      .fill(0)
      .map((itemValue, itemIndex) => {
        const curDayStr = moment(range.start).add(itemIndex, 'day').format(DATE_FORMAT);
        const curDayRecords = records.filter((r) => curDayStr === moment(r.startTime).format(DATE_FORMAT));

        const totalDuration = curDayRecords.reduce(calcDurationReducer, 0);
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

  const handleClickRange = (range) => {};
  const panelRender = (originalPanel) => {
    return (
      <Row>
        <Col xs={24} md={6}>
          <Space direction="vertical">
            {generateRanges().map((range) => {
              <Button onClick={() => handleClickRange(range)} key={range.label}>
                {range.label}
              </Button>;
            })}
          </Space>
        </Col>
        <Col xs={24} md={18}>
          {originalPanel}
        </Col>
      </Row>
    );
  };

  return (
    <PageContainer>
      <Row>
        <Col xs={24} md={6} className="control">
          <RangePicker onChange={handleChangeRange} panelRender={panelRender} />
        </Col>
        <Col xs={24} md={12} style={{ textAlign: 'center' }}>
          <span className="duration-start"> {moment(range.start).format('MMMM DD')}</span> -
          <span className="duration-end">
            {moment(range.start).format('MM') === moment(range.end).format('MM')
              ? moment(range.end).format('DD')
              : moment(range.end).format('MMMM DD')}
          </span>
        </Col>
        <Col xs={24} md={6} className="control">
          <span> Rounding: </span>
          <Switch checked={isRounded} onChange={handleSwitchRoundMode} />
        </Col>
      </Row>
      <Row>
        <Col sm={24}>
          <BarChart title="Reports" data={generateBarData()} labels={generateLabels()} />
        </Col>
      </Row>

      <Row style={{ marginTop: '30px' }}>
        <Col xs={24} sm={12}>
          <Table dataSource={generateDatasource()} columns={generateTableColumns()} />
        </Col>
        <Col xs={24} sm={12}>
          <DoughnutChart title="Reports" data={generateProjectDurations()} labels={generateProjectLabels()} />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Reports;
