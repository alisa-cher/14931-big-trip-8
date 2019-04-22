import {extendedTravelPointTemplate} from './trip-template';
import Component from './../component';
import flatpickr from './../../node_modules/flatpickr';
import {findIndexOfProperty} from './../helpers';

const formElement = (element) => element.querySelector(`form`);
const deleteButtonElement = (element) => element.querySelector(`.point__button--delete`);
const saveButtonElement = (element) => element.querySelector(`.point__button--save`);
const destinationInputElement = (element) => element.querySelector(`.point__destination-input`);
const travelWaySelectElement = (element) => element.querySelector(`.travel-way__select`);
const favoriteInputElement = (element) => element.querySelector(`.point__favorite-input`);
const offersWrapperElement = (element) => element.querySelector(`.point__offers-wrap`);

const ESC_BUTTON = 27;

class OpenedTripPoint extends Component {
  constructor(tripPoint, destinations, offers) {
    super();
    this._tripPoint = tripPoint;
    this._destinations = destinations;
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

    entry.offers = this._tripPoint.offers;
    entry.destination.pictures = this._tripPoint.destination.pictures;
    entry.destination.description = this._tripPoint.destination.description;
    entry.isFavorite = this._tripPoint.isFavorite;

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
      departureTime: (value) => (target.time.departure = value),
      arrivalTime: (value) => (target.time.arrival = value),
      price: (value) => (target.price = value)
    };
  }

  _getFormData() {
    const formData = new FormData(formElement(this._element));
    return this._processForm(formData);
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    if (this._validateChosenDestination(destinationInputElement(this._element), destinationInputElement(this._element).value)) {
      if (typeof this._onSubmit === `function`) {
        this._onSubmit(this._getFormData());
      }
    }
  }

  _onEscapeKeyPress(evt) {
    if (evt.keyCode === ESC_BUTTON && typeof this._onEscape === `function`) {
      this._onEscape();
    }
  }

  _onDeleteButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onDelete === `function`) {
      this._onDelete();
    }
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
    const travelTypeInput = this._element.querySelector(`${`#travel-way-` + this._tripPoint.travelType + `-` + this._tripPoint.id}`);
    travelTypeInput.checked = true;
  }

  _partialUpdate() {
    this.unbind();
    const templateElement = document.createElement(`template`);
    templateElement.innerHTML = this.template;
    this._elementCopy = templateElement.content.firstChild;
    this._element.parentNode.replaceChild(this._elementCopy, this._element);
    this._element = this._elementCopy;
    this._checkActiveTravelType();
    this.bind();
  }

  render() {
    super.render();
    this._checkActiveTravelType();
    return this._element;
  }

  get timepickerConfigs() {
    return {
      enableTime: true,
      dateFormat: `u`,
      altInput: true,
      altFormat: `H:i`,
    };
  }

  initTimePickers() {
    const endDatePickerConfigs = Object.assign({}, this.timepickerConfigs, {
      onChange: (selectedDates, dateStr) => {
        startDatePicker.set(`maxDate`, dateStr);
      },
    });

    const startDatePickerConfigs = Object.assign({}, this.timepickerConfigs, {
      onClose: () => {
        endDatePicker.open(endDatePicker.element);
      },
      onChange: (selectedDates, dateStr) => {
        endDatePicker.set(`minDate`, dateStr);
        endDatePicker.setDate(dateStr);
      },
    });
    const endDatePicker = flatpickr(this._element.querySelector(`input[name="arrivalTime"]`), endDatePickerConfigs);
    const startDatePicker = flatpickr(this._element.querySelector(`input[name="departureTime"]`), startDatePickerConfigs);
  }

  bind() {
    formElement(this._element).addEventListener(`submit`, this._onSubmitButtonClick.bind(this));
    deleteButtonElement(this._element).addEventListener(`click`, this._onDeleteButtonClick.bind(this));
    travelWaySelectElement(this._element).addEventListener(`change`, this._onSelectTravelWayChange.bind(this));
    destinationInputElement(this._element).addEventListener(`change`, this._onDestinationChange.bind(this));
    favoriteInputElement(this._element).addEventListener(`change`, this._onIsFavoriteChange.bind(this));
    offersWrapperElement(this._element).addEventListener(`change`, this._onOffersSelect.bind(this));
    document.addEventListener(`keydown`, this._onEscapeKeyPress.bind(this));
    this.initTimePickers();
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

  _renderErrorState() {
    this.shake();
    this.changeFormBorder(`3px solid red`);
    this.unlockForm();
  }

  renderSaveErrorState() {
    this._renderErrorState();
    this.modifySaveButtonText(`Save`);
  }

  renderDeleteErrorState() {
    this._renderErrorState();
    this.modifyDeleteButtonText(`Delete`);
  }

  renderSavingState() {
    this.blockForm();
    this.modifySaveButtonText(`Saving...`);
  }

  shake() {
    const ANIMATION_TIMEOUT = 600;
    this._element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._element.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }

  update(data) {
    this._tripPoint = data;
  }

}

export default OpenedTripPoint;
