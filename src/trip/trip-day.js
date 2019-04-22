import Component from './../component';

class TripDay extends Component {
  constructor(index, day) {
    super();
    this._index = index;
    this._day = day;
  }

  get template() {
    return `<section class="trip-day"><article class="trip-day__info">
        <span class="trip-day__caption">${this._day ? `Day` : ``}</span>
        <p class="trip-day__number">${this._index !== null ? ++this._index : ``}</p>
        <h2 class="trip-day__title ${this._index === null ? `trip-day__title--big` : ``}">${this._day ? this._day : ``}</h2>
      </article><div class="trip-day__items"></div></section>`;
  }

  render() {
    super.render();
    return this._element;
  }
}

export default TripDay;
