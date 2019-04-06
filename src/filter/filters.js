import Component from './component';

const filterWrapper = document.querySelector(`.trip-controls__menus`);

class Filter extends Component {
  constructor(data) {
    super(data);
    this._onChange = null;
  }

  get template() {
    const arr = this._data;
    return arr.map((el) => `<input type="radio" id="filter-${el.className}" name="filter" value="${el.className}" class="trip-filter__item--active">
    <label class="trip-filter__item" for="filter-${el.className}">${el.name}</label>`).join(``);
  }

  set onChange(fn) {
    this._onChange = fn;
  }

  _onFilterChange(evt) {
    if (typeof this._onChange === `function`) {
      this._onChange(evt);
    }
  }

  render() {
    super.render(filterWrapper);
  }

  bind() {
    this._element.addEventListener(`change`, this._onFilterChange.bind(this));
  }

  unbind() {
    this._element.removeEventListener(`change`, this._onFilterChange.bind(this));
  }
}

export default Filter;
