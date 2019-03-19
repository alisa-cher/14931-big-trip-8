import {extendedTravelPointTemplate} from './trip-template';
import {tripWrapper, saveButton, deleteButton} from './helpers';
import Component from './component';
import TripPoint from './trip';

class OpenedTripPoint extends Component {
  constructor(data) {
    super(data);
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
    super.render(`point`);
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
