import React from 'react';
import { Bar } from 'react-chartjs-2';

export const BarChart = ({ labels, title, data }) => {
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
            stepSize: 60,
          },
        },
      ],
    },
    tooltip: {
      custom: function(tooltipModel) {
        console.log(tooltipModel);
      },
    },
  };

  return <Bar data={barData} options={barOptions} width={350} />;
};
