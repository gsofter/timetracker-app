import React from 'react';
import { Bar } from 'react-chartjs-2';
import { formatDuration } from '../../services/timeRecordService';
import moment from 'moment';
import { useTimeformat } from '../../hooks'
export const BarChart = ({ labels, title, data }) => {
  const { timeFormat } = useTimeformat();
  const barData = {
    labels,
    datasets: [
      {
        label: title,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data,
        barThickness: 50,
        maxBarThickness: 50,
      },
    ],
  };

  const barOptions = {
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 3600,
            suggestedMin: 0,
            suggestedMax: 3600,
            callback: value => {
              return formatDuration(value, timeFormat);
            },
          },
        },
      ],
    },
    tooltips: {
      enabled: true,

      callbacks: {
        label: function(tooltipItem, data) {
          return formatDuration(tooltipItem.yLabel, timeFormat);
        },
      },
    },
  };

  return <Bar data={barData} options={barOptions} width={350} />;
};
