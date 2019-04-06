import ChartDataLabels from 'chartjs-plugin-datalabels';
import {moneyChartLabels, moneyChartData, transportChartData, transportChartLabels, timeChartData, timeChartLabels} from './filter-service';

const moneyChartConfigs = (data) => {
  return {
    labels: moneyChartLabels(data),
    data: moneyChartData(data),
    formatter: (val) => `€ ${val}`,
    title: `MONEY`,
  };
};

const transportChartConfigs = (data) => {
  return {
    labels: transportChartLabels(data),
    data: transportChartData(data),
    formatter: (val) => `${val}x`,
    title: `TRANSPORT`,
  };
};

const timeChartConfigs = (data) => {
  return {
    labels: timeChartLabels(data),
    data: timeChartData(data),
    formatter: (val) => `${val}H`,
    title: `TIME SPENT`,
  };
};

const getConfig = (obj) => {
  return {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: obj.labels,
      datasets: [{
        data: obj.data,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          // function
          formatter: obj.formatter,
        }
      },
      title: {
        display: true,
        text: obj.title,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  };
};

export {getConfig, transportChartConfigs, moneyChartConfigs, timeChartConfigs};
