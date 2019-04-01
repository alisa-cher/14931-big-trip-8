import {extendedTravelPointTemplate} from './trip-template';
import {formElement, deleteButton} from './helpers';
import {capitalizeFirstLetter, lowercaseFirstLetter} from './../helpers';
import Component from './component';
import flatpickr from './../../node_modules/flatpickr';
import moment from './../../node_modules/moment';

class OpenedTripPoint extends Component {
  constructor(data) {
    super(data);
    this._onSubmit = null;
    this._onDelete = null;
  }

  get template() {
    return extendedTravelPointTemplate(this._data);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  static createMapper(target) {
    return {
      destination: (value) => (target.city = value),
      travelway: (value) => (target.travelType = capitalizeFirstLetter(value)),
      departureTime: (value) => (target.time.departure = moment(value.split(` `)[0], `HH:mm`).unix()),
      arrivalTime: (value) => (target.time.arrival = moment(value.split(` `)[0], `HH:mm`).unix()),
      price: (value) => (target.price = value),
      offer: (value) => (target.offers.add(capitalizeFirstLetter(value.replace(/-/g, ` `)))),
    };
  }

  _processForm(formData) {
    const entry = {
      travelType: ``,
      city: ``,
      time: {
        departure: ``,
        arrival: ``,
      },
      price: ``,
      offers: new Set(),
    };

    const tripEditMapper = OpenedTripPoint.createMapper(entry);
    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (tripEditMapper[property]) {
        tripEditMapper[property](value);
      }
    }
    return entry;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.point form`));
    const newData = this._processForm(formData);

    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }
    this.update(newData);
  }

  _onDeleteButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onDelete === `function`) {
      this._onDelete();
    }
  }

  _onSelectTravelWayChange(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.point form`));
    const newData = this._processForm(formData);
    this._data.travelType = capitalizeFirstLetter(evt.target.value);
    this.update(newData);
    this._partialUpdate();
  }

  _checkActiveTravelType() {
    const travelTypeInput = this._element.querySelector(`${`#travel-way-` + lowercaseFirstLetter(this._data.travelType)}`);
    travelTypeInput.checked = true;
  }

  _partialUpdate() {
    this.unbind();
    this._element.innerHTML = this.template;
    this._checkActiveTravelType();
    this.bind();
  }

  render() {
    super.render(`point`);
    this._checkActiveTravelType();
  }

  bind() {
    formElement(this._element).addEventListener(`submit`, this._onSubmitButtonClick.bind(this));
    deleteButton(this._element).addEventListener(`click`, this._onDeleteButtonClick.bind(this));
    this._element.querySelector(`.travel-way__select`).addEventListener(`change`, this._onSelectTravelWayChange.bind(this));
    flatpickr(`.point__time input`, {enableTime: true, noCalendar: true, altInput: true, altFormat: `H:i`, dateFormat: `H:i`});
  }

  unbind() {
    formElement(this._element).removeEventListener(`submit`, this._onSubmitButtonClick.bind(this));
    deleteButton(this._element).removeEventListener(`click`, this._onDeleteButtonClick.bind(this));
    this._element.querySelector(`.travel-way__select`).removeEventListener(`change`, this._onSelectTravelWayChange.bind(this));
  }
}

export default OpenedTripPoint;
