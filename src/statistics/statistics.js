import Chart from 'chart.js';
import Component from './../component';

const BAR_HEIGHT = 55;

class Statistics extends Component {
  constructor(configs, className) {
    super();
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

  get template() {
    return `<div class="statistic__item statistic__item--${this.className}"><canvas class="statistic__${this.className}" width="900"></canvas></div>`;
  }

  render() {
    super.render();
    const ctx = this._element.querySelector(`canvas`);
    this.init(ctx, this._configs);
    this._element.style.height = BAR_HEIGHT * this._labels.length +  `px`;
    return this._element;
  }

  update(labels, dataArr) {
    this._chart.config.data.labels = labels;
    this._chart.config.data.datasets[0].data = dataArr;
    this._chart.update();
  }
}

export default Statistics;
