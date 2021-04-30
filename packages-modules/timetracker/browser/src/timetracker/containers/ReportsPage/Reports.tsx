import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Button, Switch, Table, message } from 'antd';
import { PageContainer } from '@admin-layout/components';
import { BarChart, DoughnutChart } from '../../components/Charts';
import moment, { Moment } from 'moment';
import { ITimeRecord, IProject_Output } from '@admin-layout/timetracker-core';
import { formatDuration, roundDuration } from '../../services/timeRecordService';
import { useRound, useTimeformat } from '../../hooks';
import * as _ from 'lodash';

interface IReportsProps {
  weekStart: Moment;
  projects: Array<IProject_Output>;
  records: Array<ITimeRecord>;
  setWeekStart: Function;
  updateConfiguration: Function;
}

const Reports: React.FC<IReportsProps> = ({ weekStart, projects, records, setWeekStart, updateConfiguration }) => {
  const [isRounded, setIsRounded] = useState(false);
  const { roundType, roundValue, rounded, refetchRounded } = useRound();
  const { dateFormat, timeFormat } = useTimeformat();
  const onClickBack = (event) => {
    const newWeekStart = moment(weekStart).add('-1', 'week');
    setWeekStart(newWeekStart);
  };

  const onClickNext = (event) => {
    const newWeekStart = moment(weekStart).add('1', 'week');
    setWeekStart(newWeekStart);
  };

  const onClickToday = (event) => {
    const newWeekStart = moment().startOf('week');
    setWeekStart(newWeekStart);
  };

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

  return (
    <PageContainer>
      <Row>
        <Col xs={24} md={6} className="control">
          <Button onClick={onClickToday}> Today </Button>
          <Button onClick={onClickBack}> Back </Button>
          <Button onClick={onClickNext}> Next </Button>
        </Col>
        <Col xs={24} md={12} style={{ textAlign: 'center' }}>
          <span className="duration-start"> {moment(weekStart).format('MMMM DD')}</span> -
          <span className="duration-end">
            {moment(weekStart).format('MM') === moment(weekStart).add(6, 'day').format('MM')
              ? moment(weekStart).add(6, 'day').format('DD')
              : moment(weekStart).add(6, 'day').format('MMMM DD')}
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
