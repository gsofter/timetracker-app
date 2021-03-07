import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import moment from 'moment';
import { PageContainer } from '@admin-layout/components';
import { BarChart, DoughnutChart } from '../../components/Charts';
import { useGetTimesheetsQuery, useGetDurationTimeRecordsQuery } from '../../../generated-models';
import { ITimeRecord } from '@admin-layout/timetracker-core';

const ReportsPage = () => {
  const [weekStart, setWeekStart] = useState(moment());
  const { data, loading, refetch, error } = useGetDurationTimeRecordsQuery({
    variables: {
      startTime: weekStart,
      endTime: moment(weekStart).add(1, 'week'),
    },
  });

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
    const recordsData: Array<ITimeRecord> = loading || !!!data ? [] : data.getDurationTimeRecords;
    const dataSet = Array(7)
      .fill(0)
      .map((itemValue, index) => {
        // filter current day records
        const dayRecords = recordsData.filter(
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

        console.log(
          `${moment(weekStart)
            .add(index, 'day')
            .format('YYYY-MM-DD')} => ${totalDuration}`,
        );

        return totalDuration;
      });
    return dataSet;
  };

  return (
    <PageContainer>
      <Row>
        <Col xs={24} md={6} className="control">
          <Button onClick={onClickToday}> Today </Button>
          <Button onClick={onClickBack}> Back </Button>
          <Button onClick={onClickNext}> Next </Button>
        </Col>
      </Row>
      <Row>
        <Col sm={24}>
          <BarChart title="Reports" data={generateBarData()} labels={generateLabels()} />
        </Col>
      </Row>

      <Row>
        <Col sm={12}></Col>
        <Col sm={12}>
          <DoughnutChart
            title="Reports"
            data={[4, 5, 6, 7, 4, 2, 9]}
            labels={[
              'projectA',
              'projectB',
              'projectC',
              'projectD',
              'projectE',
              'projectF',
              'projectB',
            ]}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ReportsPage;
