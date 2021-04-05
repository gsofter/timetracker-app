import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Button, Table, Switch, message } from 'antd';
import moment from 'moment';
import { PageContainer } from '@admin-layout/components';
import { BarChart, DoughnutChart } from '../../components/Charts';
import { useGetDurationTimeRecordsQuery, useGetProjectsQuery } from '../../../generated-models';
import { ITimeRecord, IProject_Output } from '@admin-layout/timetracker-core';
import { formatDuration, roundDuration } from '../../services/timeRecordService';
import { useRound, useTimeformat, useFirstWeekDay } from '../../hooks';
import { useSetting } from '@adminide-stack/react-shared-components';
const ReportsPage = () => {
  const [weekStart, setWeekStart] = useState(moment().startOf('week'));
  const { roundType, roundValue, rounded, refetchRounded } = useRound();
  const { dateFormat, timeFormat } = useTimeformat();
  const { data, loading, refetch, error } = useGetDurationTimeRecordsQuery({
    variables: {
      startTime: weekStart,
      endTime: moment(weekStart).add(1, 'week'),
    },
  });
  const { value: dowValue } = useFirstWeekDay();
  useEffect(() => {
    moment.locale('en', {
      week: {
        dow: dowValue,
      },
    });

    setWeekStart(moment().startOf('week'));
  }, [dowValue]);

  const { updateConfiguration } = useSetting({
    configKey: 'timetracker.report.timeRoundingInReports',
  });
  // getter for time records
  const getRecords = useCallback(
    (): Array<ITimeRecord> => (loading || !!!data ? [] : data.getDurationTimeRecords),
    [loading, data],
  );

  const { data: projectsData, loading: loadingProjects } = useGetProjectsQuery();
  const getProjects = useCallback(
    (): Array<IProject_Output> =>
      loadingProjects || !!!projectsData ? [] : projectsData.getProjects,
    [loadingProjects, projectsData],
  );

  useEffect(() => {
    setWeekStart(moment().startOf('week'));
  }, []);

  useEffect(() => {
    refetch();
  }, [weekStart]);

  const onClickBack = event => {
    const newWeekStart = moment(weekStart).add('-1', 'week');
    setWeekStart(newWeekStart);
  };

  const onClickNext = event => {
    const newWeekStart = moment(weekStart).add('1', 'week');
    setWeekStart(newWeekStart);
  };

  const onClickToday = event => {
    const newWeekStart = moment().startOf('week');
    setWeekStart(newWeekStart);
  };

  const generateLabels = (): Array<string> => {
    const labels = Array(7)
      .fill(0)
      .map((itemValue, itemIndex) => {
        return moment(weekStart)
          .add(itemIndex, 'day')
          .format(dateFormat);
      });
    return labels;
  };

  const calcDurationReducer = (totalDur, record) =>
    totalDur +
    Math.abs(
      Math.floor((moment(record.endTime).valueOf() - moment(record.startTime).valueOf()) / 1000),
    );

  const generateBarData = () => {
    const records = getRecords();
    console.log('records', records);
    const dataSet = Array(7)
      .fill(0)
      .map((itemValue, index) => {
        // filter current day records
        const dayRecords = records.filter(
          r =>
            moment(r.startTime).format(dateFormat) ===
            moment(weekStart)
              .add(index, 'day')
              .format(dateFormat),
        );

        // calc total duration as seconds
        const totalDuration = dayRecords.reduce(calcDurationReducer, 0);
        return rounded ? roundDuration(totalDuration, roundValue, roundType) : totalDuration;
      });
    return dataSet;
  };

  const generateProjectLabels = () => {
    const projects = getProjects();
    const projectLabels = projects.map((project, index) => {
      return project.name;
    });
    return projectLabels;
  };

  const generateProjectDurations = () => {
    const projects = getProjects();
    const timeRecords = getRecords();
    const projectDurArray = projects.map((project, index) => {
      const pRecords = timeRecords.filter(record => record.projectId === project.id);
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
        render: value => {
          return <span> {formatDuration(value, timeFormat)}</span>;
        },
      },
    ];
  };

  const generateDatasource = () => {
    const projects = getProjects();
    const timeRecords = getRecords();
    const projectDurArray = projects.map((project, index) => {
      const pRecords = timeRecords.filter(record => record.projectId === project.id);
      const pTotalDur = pRecords.reduce(calcDurationReducer, 0);
      return {
        projectName: project.name,
        duration: rounded ? roundDuration(pTotalDur, roundValue, roundType) : pTotalDur,
      };
    });
    return projectDurArray;
  };

  const handleSwitchRoundMode = checked => {
    updateConfiguration({ updateKey: 'timetracker.report.timeRoundingInReports', value: checked })
      .then(async () => {
        await refetchRounded();
        console.log('rounded => ', rounded);
        message.success('Rounded setting updated');
      })
      .catch(e => {
        console.log(e.message);
      });
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
            {moment(weekStart).format('MM') ===
            moment(weekStart)
              .add(6, 'day')
              .format('MM')
              ? moment(weekStart)
                  .add(6, 'day')
                  .format('DD')
              : moment(weekStart)
                  .add(6, 'day')
                  .format('MMMM DD')}
          </span>
        </Col>
        <Col xs={24} md={6} className="control">
          <span> Switch Mode: </span>
          <Switch
            checkedChildren="Rounding"
            unCheckedChildren="Standard"
            checked={rounded}
            onChange={handleSwitchRoundMode}
          />
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
          <DoughnutChart
            title="Reports"
            data={generateProjectDurations()}
            labels={generateProjectLabels()}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ReportsPage;
