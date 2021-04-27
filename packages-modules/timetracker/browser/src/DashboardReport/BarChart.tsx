import * as React from 'react';
import { Bar } from 'react-chartjs-2';
import { formatDuration } from '../timetracker/services/timeRecordService';
// import { useTimeformat } from '../timetracker/hooks'

export const BarChart = ({ labels, title, data }) => {
    // const { timeFormat } = useTimeformat();
    const barData = {
        labels,
        datasets: [
            {
                label: title,
                backgroundColor: 'rgba(54, 162, 235, 1)',
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
                            return formatDuration(value, 'HH:mm:ss');
                        },
                    },
                },
            ],
        },
        tooltips: {
            enabled: true,
            callbacks: {
                label: function(tooltipItem, data) {
                    return formatDuration(tooltipItem.yLabel, 'HH:mm:ss');
                },
            },
        },
    };

    return <Bar data={barData} options={barOptions} width={350} />;
};
