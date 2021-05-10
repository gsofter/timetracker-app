import * as React from 'react';
import { Doughnut  } from 'react-chartjs-2';
import { Chart } from 'chart.js'
import { formatDuration } from '../timetracker/services/timeRecordService';
import { useTimeformat } from '../timetracker/hooks'

const bgColor = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
];

const originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw: function() {
    originalDoughnutDraw.apply(this, arguments);

    const chart = this.chart.chart;
    const ctx = chart.ctx;
    const width = chart.width;
    const height = chart.height;

    const fontSize = (height / 154).toFixed(2);
    ctx.font = fontSize + 'em Verdana';
    ctx.color = 'rgba(54, 162, 235, 1)';
    ctx.textBaseline = 'bottom';

    const text = chart.config.data.text || '',
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;

    ctx.fillText(text, textX, textY);
  }
});

export const DoughnutChart = ({ data, labels, title }) => {
  const { timeFormat } = useTimeformat();

  let newLabels = [];
  let backgroundColor = [];
  let count = 0;
  const newData = data.filter((d, i) => {
    if (d) {
      newLabels.push(labels[i]);
      backgroundColor.push(bgColor[(count++) % bgColor.length]);
    }
    return d;
  });
  const totalTime = newData.length && newData.reduce((accumulator, currentValue) => accumulator + currentValue);
  const chartData = {
    labels: newLabels,
    datasets: [
      {
        label: title,
        data: newData,
        backgroundColor,
      },
    ],
    text: totalTime ? formatDuration(totalTime, timeFormat) : '',
  };

  const chartOptions = {
    tooltips: {
      enabled: true,
      callbacks: {
        label: function (tooltipItem, data) {
          const duration = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          return formatDuration(duration, timeFormat);
        },
      },
    },
    cutoutPercentage: 70,
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 15,
      },
    },
  };

  return (
      <Doughnut data={chartData} options={chartOptions} />
  );
};
