import * as React from 'react';
import { Bar } from 'react-chartjs-2';

export const BarChart = ({ labels, title, data }) => {
    const barData = {
        labels,
        datasets: [
            {
                label: title,
                backgroundColor: 'rgba(54, 162, 235, 1)',
                data,
                maxBarThickness: 30,
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
                            const seconds = Math.abs(value);
                            const hours = (seconds / 3600).toFixed(2);
                            return `${hours} h`;
                        },
                    },
                },
            ],
        },
        tooltips: {
            enabled: true,
            callbacks: {
                label: function(tooltipItem, data) {
                    const seconds = Math.abs(tooltipItem.yLabel);
                    const hours = (seconds / 3600).toFixed(2);
                    return `${hours} h`;
                },
            },
        },
        responsive: true,
    };

    return <Bar data={barData} options={barOptions} width={350} />;
};
