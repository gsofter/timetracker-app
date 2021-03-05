import React from 'react';

import BarChart from '../../components/BarChart';

const ReportsPage = () => {
  return (
    <>
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
    </>
  );
};

export default ReportsPage;
