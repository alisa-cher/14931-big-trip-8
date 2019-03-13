import {extendedTravelPointTemplate} from './trip-template';
import {tripWrapper, saveButton, deleteButton} from './helpers';
import TripPoint from './trip';

class OpenedTripPoint {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  get template() {
    return extendedTravelPointTemplate(this._data);
  }

  _replaceOpenedTrip() {
    const trip = new TripPoint(this._data);
    trip.render();
    tripWrapper.replaceChild(trip._element, this._element);
    this.unrender();
  }

  _OnSubmit(evt) {
    evt.preventDefault();
    this._replaceOpenedTrip();
  }

  _OnDelete(evt) {
    evt.preventDefault();
    this._replaceOpenedTrip();
  }

  render() {
    this._element = document.createElement(`article`);
    this._element.classList.add(`point`);
    this._element.innerHTML = this.template;
    tripWrapper.appendChild(this._element);
    this.bind();
    return this._element;
  }

  unrender() {
    if (this._element) {
      this.unbind();
      this._element = null;
    }
  }

  bind() {
    saveButton(this._element).addEventListener(`submit`, this._OnSubmit.bind(this));
    deleteButton(this._element).addEventListener(`click`, this._OnDelete.bind(this));
  }

  unbind() {
    saveButton(this._element).removeEventListener(`submit`, this._OnSubmit.bind(this));
    deleteButton(this._element).removeEventListener(`click`, this._OnDelete.bind(this));
  }
}

export default OpenedTripPoint;
