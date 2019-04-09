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
    return `<canvas class="statistic__${this.className}" width="900"></canvas>`;
  }

  render() {
    super.render(`div`);
    this._element.classList.add(`statistic__item`, `statistic__item--${this.className}`);
    const ctx = this._element.querySelector(`canvas`);
    ctx.height = BAR_HEIGHT * this._labels.length;
    this.init(ctx, this._configs);
    return this._element;
  }

  update(labels, dataArr) {
    this._chart.config.data.labels = labels;
    this._chart.config.data.datasets[0].data = dataArr;
    this._chart.update();
  }
}

export default Statistics;
