import React from 'react';
import { Row, Col } from 'antd';
import { BarChart, DoughnutChart } from '../../components/Charts';

const ReportsPage = () => {
  return (
    <>
      <Row>
        <Col sm={24}>
          <BarChart
            title="Reports"
            data={[4, 5, 6, 7, 4, 2, 9]}
            labels={[
              '2021-03-02',
              '2021-03-03',
              '2021-03-04',
              '2021-03-05',
              '2021-03-06',
              '2021-03-07',
              '2021-03-08',
            ]}
          />
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
    </>
  );
};

export default ReportsPage;
