import {extendedTravelPointTemplate} from './trip-template';
import TripComponent from './component';
import flatpickr from './../../node_modules/flatpickr';
import moment from './../../node_modules/moment';
import {findIndexOfProperty} from './../helpers';

const formElement = (element) => element.querySelector(`form`);
const deleteButtonElement = (element) => element.querySelector(`.point__button--delete`);
const saveButtonElement = (element) => element.querySelector(`.point__button--save`);
const destinationInputElement = (element) => element.querySelector(`.point__destination-input`);
const travelWaySelectElement = (element) => element.querySelector(`.travel-way__select`);
const favoriteInputElement = (element) => element.querySelector(`.point__favorite-input`);
const offersWrapperElement = (element) => element.querySelector(`.point__offers-wrap`);

const escapeKeyCode = 27;

class OpenedTripPoint extends TripComponent {
  constructor(tripPoint, destinations, offers) {
    super(tripPoint);
    this._destinations = destinations;
    this._offersForAllDestinations = offers;
    this._offersForAllDestinations = offers;
    this._onSubmit = null;
    this._onDelete = null;
    this._onEscape = null;
  }

  _processForm(formData) {

    const entry = {
      travelType: ``,
      destination: {
        name: ``,
      },
      time: {
        departure: ``,
        arrival: ``,
      },
      price: ``
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

  get template() {
    return extendedTravelPointTemplate(this._tripPoint, this._destinations);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  set onEscape(fn) {
    this._onEscape = fn;
  }

  static createMapper(target) {
    return {
      destination: (value) => (target.destination.name = value),
      travelway: (value) => (target.travelType = value),
      departureTime: (value) => (target.time.departure = moment(value.split(` `)[0], `HH:mm`).unix()),
      arrivalTime: (value) => (target.time.arrival = moment(value.split(` `)[0], `HH:mm`).unix()),
      price: (value) => (target.price = value)
    };
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    if (this._validateChosenDestination(destinationInputElement(this._element), destinationInputElement(this._element).value)) {
      this.update(this._getFormData());

      if (typeof this._onSubmit === `function`) {
        this._onSubmit(this._getFormData());
      }
    }
  }

  _onEscapeKeyPress(evt) {
    if (evt.keyCode === escapeKeyCode && typeof this._onEscape === `function`) {
      this._onEscape();
    }
  }

  _onDeleteButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onDelete === `function`) {
      this._onDelete();
    }
  }

  _getFormData() {
    const formData = new FormData(formElement(this._element));
    return this._processForm(formData);
  }

  _findIndexOfNewTravelType(travelType) {
    return findIndexOfProperty(this._offersForAllDestinations, `type`, travelType);
  }

  _findIndexOfChosenDestination(destination) {
    return this._destinations.map((item) => item.destination.name).indexOf(destination);
  }

  _validateChosenDestination(element, destination) {
    if (this._findIndexOfChosenDestination(destination) > -1) {
      element.setCustomValidity(``);
      return true;
    } else {
      element.setCustomValidity(`Unfortunately, this destination is not available. Please, choose another one.`);
      return false;
    }
  }

  _findIndexOfChosenOffer(offer) {
    return findIndexOfProperty(this._tripPoint.offers, `title`, offer);
  }

  _onOffersSelect(evt) {
    const chosenOffer = this._tripPoint.offers[this._findIndexOfChosenOffer(evt.target.value)];
    chosenOffer.accepted = !chosenOffer.accepted;
  }

  _mapOffers(travelType) {
    const newOffers = this._offersForAllDestinations[this._findIndexOfNewTravelType(travelType)].offers;
    return newOffers.map((offer) => ({title: offer.name, price: offer.price, accepted: false}));
  }

  _onSelectTravelWayChange(evt) {
    evt.preventDefault();
    this.update(this._getFormData());
    this._tripPoint.travelType = evt.target.value;
    this._tripPoint.offers = this._mapOffers(evt.target.value);
    this._partialUpdate();
  }

  _onDestinationChange(evt) {
    if (this._validateChosenDestination(evt.target, evt.target.value)) {
      this.update(this._getFormData());
      this._tripPoint.destination = this._destinations[this._findIndexOfChosenDestination(evt.target.value)].destination;
      this._partialUpdate();
    }
  }

  _onIsFavoriteChange() {
    this._tripPoint.isFavorite = !this._tripPoint.isFavorite;
  }

  _checkActiveTravelType() {
    const travelTypeInput = this._element.querySelector(`${`#travel-way-` + this._tripPoint.travelType}`);
    travelTypeInput.checked = true;
  }

  _partialUpdate() {
    this.unbind();
    this._element.innerHTML = this.template;
    this._checkActiveTravelType();
    this.bind();
  }

  render() {
    super.render(`article`);
    this._element.classList.add(`point`);
    this._checkActiveTravelType();
    return this._element;
  }

  bind() {
    formElement(this._element).addEventListener(`submit`, this._onSubmitButtonClick.bind(this));
    deleteButtonElement(this._element).addEventListener(`click`, this._onDeleteButtonClick.bind(this));
    travelWaySelectElement(this._element).addEventListener(`change`, this._onSelectTravelWayChange.bind(this));
    destinationInputElement(this._element).addEventListener(`change`, this._onDestinationChange.bind(this));
    favoriteInputElement(this._element).addEventListener(`change`, this._onIsFavoriteChange.bind(this));
    offersWrapperElement(this._element).addEventListener(`change`, this._onOffersSelect.bind(this));
    flatpickr(this._element.querySelectorAll(`.point__time input`), {enableTime: true, noCalendar: true, altInput: true, altFormat: `H:i`, dateFormat: `H:i`});
    document.addEventListener(`keydown`, this._onEscapeKeyPress.bind(this));
  }

  unbind() {
    formElement(this._element).removeEventListener(`submit`, this._onSubmitButtonClick.bind(this));
    deleteButtonElement(this._element).removeEventListener(`click`, this._onDeleteButtonClick.bind(this));
    travelWaySelectElement(this._element).removeEventListener(`change`, this._onSelectTravelWayChange.bind(this));
    destinationInputElement(this._element).removeEventListener(`change`, this._onDestinationChange.bind(this));
    favoriteInputElement(this._element).removeEventListener(`change`, this._onIsFavoriteChange.bind(this));
    offersWrapperElement(this._element).removeEventListener(`change`, this._onOffersSelect.bind(this));
    document.removeEventListener(`keydown`, this._onEscapeKeyPress.bind(this));
  }

  blockForm() {
    saveButtonElement(this._element).disabled = true;
    deleteButtonElement(this._element).disabled = true;
  }

  unlockForm() {
    saveButtonElement(this._element).disabled = false;
    saveButtonElement(this._element).disabled = false;
  }

  changeFormBorder(border) {
    this._element.style.border = border;
  }

  modifySaveButtonText(text) {
    saveButtonElement(this._element).innerHTML = text;
  }

  modifyDeleteButtonText(text) {
    deleteButtonElement(this._element).innerHTML = text;
  }

  shake() {
    const ANIMATION_TIMEOUT = 600;
    this._element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._element.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }

}

export default OpenedTripPoint;
