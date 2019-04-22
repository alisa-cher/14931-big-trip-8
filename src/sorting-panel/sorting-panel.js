import Component from './../component';
import {capitalizeFirstLetter} from './../helpers';

const filterNames = [`event`, `time`, `price`];

class SortingPanel extends Component {
  constructor() {
    super();
    this._onChange = null;
    this._clickedFilter = null;
  }

  get template() {
    const sortingInputs = () => filterNames.map((el) => `<input type="radio" name="trip-sorting" id="sorting-${el}" value="${el}">
    <label class="trip-sorting__item trip-sorting__item--${el}" for="sorting-${el}">${capitalizeFirstLetter(el)}</label>`).join(``) + `<span class="trip-sorting__item trip-sorting__item--offers">Offers</span>`;
    return `<form class="trip-sorting">${sortingInputs()}</form>`;
  }

  set onChange(fn) {
    this._onChange = fn;
  }

  setActiveSort(filter) {
    this._clickedFilter = filter;
  }

  get activeSort() {
    return this._clickedFilter;
  }

  _onFilterChange(evt) {
    if (typeof this._onChange === `function`) {
      this.setActiveSort(evt.target.id);
      this._onChange(evt);
    }
  }

  render() {
    super.render();
    this._element.firstElementChild.checked = true;
    this.setActiveSort(`event`);
    return this._element;
  }

  bind() {
    this._element.addEventListener(`change`, this._onFilterChange.bind(this));
  }

  unbind() {
    this._element.removeEventListener(`change`, this._onFilterChange.bind(this));
  }
}

export default SortingPanel;
