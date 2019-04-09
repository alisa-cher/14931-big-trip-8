import Statistics from './../statistics/statistics';
import {getConfig, moneyChartConfigs, transportChartConfigs, timeChartConfigs} from './../statistics/config';
import {moneyChartLabels, moneyChartData, transportChartData, transportChartLabels, timeChartData, timeChartLabels} from './statistics-service';
import {filterEmptyData} from './../helpers';

const statisticsWrapper = document.querySelector(`.statistic`);

class StatisticsContainer {
  constructor(data) {
    this._data = data;
    this._moneyChart = null;
    this._transportChart = null;
    this._timeChart = null;
  }

  init() {
    this._moneyChart = new Statistics(getConfig(moneyChartConfigs(this._data)), `money`);
    this._transportChart = new Statistics(getConfig(transportChartConfigs(this._data)), `transport`);
    this._timeChart = new Statistics(getConfig(timeChartConfigs(this._data)), `time`);

    statisticsWrapper.appendChild(this._moneyChart.render());
    statisticsWrapper.appendChild(this._transportChart.render());
    statisticsWrapper.appendChild(this._timeChart.render());
  }

  update(updatedData) {
    this._data = filterEmptyData(updatedData);
    this._moneyChart.update(moneyChartLabels(this._data), moneyChartData(this._data));
    this._transportChart.update(transportChartLabels(this._data), transportChartData(this._data));
    this._timeChart.update(timeChartLabels(this._data), timeChartData(this._data));
  }
}

export default StatisticsContainer;
