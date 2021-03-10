import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Button, Table } from 'antd';
import moment from 'moment';
import { PageContainer } from '@admin-layout/components';
import { BarChart, DoughnutChart } from '../../components/Charts';
import { useGetDurationTimeRecordsQuery, useGetProjectsQuery } from '../../../generated-models';
import { ITimeRecord, IProject_Output } from '@admin-layout/timetracker-core';
import { formatDuration } from '../../services/timeRecordService';

const ReportsPage = () => {
  const [weekStart, setWeekStart] = useState(moment().startOf('week'));
  const { data, loading, refetch, error } = useGetDurationTimeRecordsQuery({
    variables: {
      startTime: weekStart,
      endTime: moment(weekStart).add(1, 'week'),
    },
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
          .format('YYYY-MM-DD');
      });
    return labels;
  };

  const generateBarData = () => {
    const records = getRecords();
    console.log('records', records);
    const dataSet = Array(7)
      .fill(0)
      .map((itemValue, index) => {
        // filter current day records
        const dayRecords = records.filter(
          r =>
            moment(r.startTime).format('YYYY-MM-DD') ===
            moment(weekStart)
              .add(index, 'day')
              .format('YYYY-MM-DD'),
        );

        // calc total duration as seconds
        const totalDuration = dayRecords.reduce(
          (totalDur, record) =>
            totalDur +
            Math.floor(
              (moment(record.endTime).valueOf() - moment(record.startTime).valueOf()) / 1000,
            ),
          0,
        );
        return totalDuration;
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
      const pTotalDur = pRecords.reduce(
        (totalDur, pRecord) =>
          totalDur +
          Math.floor(
            (moment(pRecord.endTime).valueOf() - moment(pRecord.startTime).valueOf()) / 1000,
          ),
        0,
      );
      return pTotalDur;
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
      },
    ];
  };

  const generateDatasource = () => {
    const projects = getProjects();
    const timeRecords = getRecords();
    const projectDurArray = projects.map((project, index) => {
      const pRecords = timeRecords.filter(record => record.projectId === project.id);
      const pTotalDur = pRecords.reduce(
        (totalDur, pRecord) =>
          totalDur +
          Math.floor(
            (moment(pRecord.endTime).valueOf() - moment(pRecord.startTime).valueOf()) / 1000,
          ),
        0,
      );
      return { projectName: project.name, duration: pTotalDur };
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
        <Col xs={24} md={6} className="control"></Col>
      </Row>
      <Row>
        <Col sm={24}>
          <BarChart title="Reports" data={generateBarData()} labels={generateLabels()} />
        </Col>
      </Row>

      <Row>
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
