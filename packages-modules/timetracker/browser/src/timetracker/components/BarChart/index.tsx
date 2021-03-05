import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ labels, title, data }) => {
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
            stepSize: 2500,
          },
        },
      ],
    },
  };

  return <Bar data={barData} options={barOptions} width={350} />;
};

export default BarChart;
