import React from 'react';
import Highcharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';
import styles from './AnswerChart.module.scss';

const AnswerChart = data => {
  const options = {
    chart: {
      zoomType: 'x',
    },

    title: {
      text: 'Calculated Prediction',
    },

    xAxis: [
      {
        categories: data.map(item => `Question ${item.id}`),
        crosshair: true,
      },
    ],

    yAxis: [
      {
        title: {
          text: 'Mark',
          style: {
            color: Highcharts.getOptions().colors[0],
          },
        },
        labels: {
          // format: "{value} u",
          style: {
            color: Highcharts.getOptions().colors[0],
          },
        },
      },
      {
        title: {
          text: '',
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
        labels: {
          // format: "{value} b",
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
        opposite: true,
      },
    ],

    tooltip: {
      shared: true,
    },

    legend: {
      layout: 'vertical',
      align: 'left',
      x: 120,
      verticalAlign: 'top',
      y: 100,
      floating: true,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || // theme
        'rgba(255,255,255,0.25)',
    },

    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: false,
      },
    },

    navigation: {
      buttonOptions: {
        enabled: true,
      },
    },

    series: [
      {
        name: 'Calculated Prediction Mark',
        // type: 'spline',
        data: data.map(item => item.prediction),
        tooltip: {
          valueSuffix: ' point',
        },
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <div className={styles.anserchart}>
      <HighChartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default AnswerChart;
