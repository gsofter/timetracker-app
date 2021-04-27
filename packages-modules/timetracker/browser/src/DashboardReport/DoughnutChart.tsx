import * as React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { formatDuration } from '../timetracker/services/timeRecordService';
// import { useTimeformat } from '../timetracker/hooks'

export const DoughnutChart = ({ data, labels, title }) => {
  // const { timeFormat } = useTimeformat();
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      },
    ],
  };

  const chartOptions = {
    tooltips: {
      enabled: true,

      callbacks: {
        label: function(tooltipItem, data) {
          const duration = data.datasets[tooltipItem.datasetIndex].data[0];
          return formatDuration(duration, 'HH:mm:ss');
        },
      },
    },
  };

  return <Doughnut data={chartData} options={chartOptions} />;
};
