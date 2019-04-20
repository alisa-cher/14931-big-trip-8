import Component from './../component';

class TripDay extends Component {
  constructor(index, day) {
    super();
    this._index = index;
    this._day = day;
  }

  get template() {
    return `<article class="trip-day__info">
        <span class="trip-day__caption">${this._day ? `Day` : ``}</span>
        <p class="trip-day__number">${this._index >= 0 ? this._index++ : ``}</p>
        <h2 class="trip-day__title">${this._day ? this._day : ``}</h2>
      </article><div class="trip-day__items"></div>`;
  }

  render() {
    super.render(`section`);
    this._element.classList.add(`trip-day`);
    this._element.innerHTML = this.template;
    return this._element;
  }
}

export default TripDay;
