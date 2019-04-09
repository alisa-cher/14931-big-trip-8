import Component from './../component';

class Filter extends Component {
  constructor(data) {
    super(data);
    this._onChange = null;
    this._clickedFilter = null;
  }

  get template() {
    const arr = this._data;
    return arr.map((el) => `<input type="radio" id="filter-${el.className}" name="filter" value="${el.className}" class="trip-filter__item--active">
    <label class="trip-filter__item" for="filter-${el.className}">${el.name}</label>`).join(``);
  }

  set onChange(fn) {
    this._onChange = fn;
  }

  setActiveFilter(filter) {
    this._clickedFilter = filter;
  }

  get activeFilter() {
    return this._clickedFilter;
  }

  _onFilterChange(evt) {
    if (typeof this._onChange === `function`) {
      this.setActiveFilter(evt.target.id);
      this._onChange(evt);
    }
  }

  render() {
    super.render(`form`);
    this._element.classList.add(`trip-filter`);
    this._element.firstElementChild.checked = true;
    this.setActiveFilter(`filter-everything`);
    return this._element;
  }

  bind() {
    this._element.addEventListener(`change`, this._onFilterChange.bind(this));
  }

  unbind() {
    this._element.removeEventListener(`change`, this._onFilterChange.bind(this));
  }
}

export default Filter;
