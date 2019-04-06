import Chart from 'chart.js';

const statisticsWrapper = document.querySelector(`.statistic`);
const BAR_HEIGHT = 55;

class Statistics {
  constructor(configs, className) {
    this.className = className;
    this._configs = configs;
    this._labels = configs.data.labels;
    this._data = configs.data.datasets[0].data;
    this._element = null;
    this._chart = null;
  }

  get chart() {
    return this._chart;
  }

  init(canvasElement, configs) {
    this._chart = new Chart(canvasElement, configs);
  }

  setChartHeight() {
    const canvasWrapper = statisticsWrapper.querySelector(`.statistic__item--${this.className}`);
    canvasWrapper.style.height = BAR_HEIGHT * this._labels.length + 20 + `px`;
  }

  get template() {
    this._element = document.createElement(`div`);
    this._element.classList.add(`statistic__item`, `statistic__item--${this.className}`);
    this._element.innerHTML = `<canvas class="statistic__${this.className}" width="900"></canvas>`;
    const ctx = this._element.querySelector(`canvas`);
    this.init(ctx, this._configs);
    return this._element;
  }

  render() {
    statisticsWrapper.appendChild(this.template);
    this.setChartHeight();
  }

  update(labels, dataArr) {
    this._chart.config.data.labels = labels;
    this._chart.config.data.datasets[0].data = dataArr;
    this._chart.update();
  }
}

export default Statistics;
