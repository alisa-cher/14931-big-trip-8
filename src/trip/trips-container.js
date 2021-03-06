import TripPoint from './trip';
import OpenedTripPoint from './trip-opened';
import TripDay from './trip-day';
import {ModelTrip} from "../data/model-trip";
import TotalPrice from './../total-price/total-price';
import {groupTripsByDay, addTripDayProperty} from './trip-day-service';
import {api, menuElement} from './../main';
import {state} from '../state';
import {newTripData} from './../new-event';


const itemsWrapper = (tripDayElement) => tripDayElement.querySelector(`.trip-day__items`);
const tripDaysWrapper = document.querySelector(`.trip-points`);

class TripsContainer {
  constructor(tripPoints, destinations, offers) {
    this._tripPoints = tripPoints;
    this._destinations = destinations;
    this._offers = offers;
    this._messageElement = null;
  }

  update(data) {
    this._tripPoints = data;
  }

  static renderMessage(message) {
    tripDaysWrapper.innerHTML = ``;
    this._messageElement = document.createElement(`p`);
    this._messageElement.classList.add(`trip-points__message`);
    this._messageElement.innerHTML = message;
    return this._messageElement;
  }

  initTripsDay(data, tripDayElement) {
    data.forEach((element) => {
      const trip = new TripPoint(element);
      itemsWrapper(tripDayElement).appendChild(trip.render());
      this.initTripPoint(trip, element, tripDayElement);
    });
  }

  initAllTripsDays(data) {
    const sortedByDayTrips = groupTripsByDay(data);

    Object.keys(sortedByDayTrips).forEach((index) => {
      const dayCounter = state.tripDates.findIndex((element) => (element === index));
      const trips = sortedByDayTrips[index];
      const tripDay = new TripDay(dayCounter, index);
      tripDay.render();
      this.initTripsDay(trips, tripDay.element);
      tripDaysWrapper.appendChild(tripDay.element);
    });
  }

  initAllTrips(data) {
    const tripsWithDayProperty = addTripDayProperty(data);

    tripsWithDayProperty.forEach((item) => {
      const tripDay = new TripDay(null, item.day);
      const trip = new TripPoint(item);
      tripDay.render();
      itemsWrapper(tripDay.element).appendChild(trip.render());
      this.initTripPoint(trip, item, tripDay.element);
      tripDaysWrapper.appendChild(tripDay.element);
    });
  }

  initTripPoint(trip, element, tripDayElement) {
    trip.onEdit = () => {
      const editedTrip = ModelTrip.copy(element);
      const openedTrip = new OpenedTripPoint(editedTrip, this._destinations, this._offers);
      this.initOpenedTrip(trip, openedTrip, editedTrip, tripDayElement);
      openedTrip.render();
      itemsWrapper(tripDayElement).replaceChild(openedTrip.element, trip.element);
      trip.unrender();
    };
  }

  initOpenedTrip(trip, openedTrip, editedTrip, tripDayElement) {
    openedTrip.onEscape = () => this.onOpenedTripEscape(openedTrip, trip, tripDayElement);
    openedTrip.onSubmit = (formData) => this.onOpenedTripSubmit(formData, openedTrip, editedTrip, tripDayElement);
    openedTrip.onDelete = () => this.onOpenedTripDelete(openedTrip, editedTrip);
  }

  onOpenedTripEscape(openedTrip, trip, tripDayElement) {
    if (!openedTrip.element) {
      openedTrip.unrender();
    } else {
      itemsWrapper(tripDayElement).appendChild(trip.render());
      itemsWrapper(tripDayElement).replaceChild(trip.element, openedTrip.element);
      openedTrip.unrender();
    }
  }

  onOpenedTripSubmit(formData, openedTrip, editedTrip, tripDayElement) {
    openedTrip.renderSavingState();

    api.updateTrip({id: editedTrip.id, data: ModelTrip.toRAW(formData)})
      .then((newTripPointData) => {
        state.data[newTripPointData.id].price = +newTripPointData.price;

        const newTotalPrice = new TotalPrice(state.data);
        menuElement.replaceChild(newTotalPrice.render(), state.totalPriceInstance.element);
        state.setTotalPriceInstance(newTotalPrice);

        const newTrip = new TripPoint(newTripPointData);
        this.initTripPoint(newTrip, newTripPointData, tripDayElement);
        itemsWrapper(tripDayElement).replaceChild(newTrip.render(), openedTrip.element);

        openedTrip.unrender();
      })
      .catch(() => {
        openedTrip.renderSaveErrorState();
      });
  }

  onOpenedTripDelete(openedTrip, editedTrip) {
    openedTrip.blockForm();
    openedTrip.modifyDeleteButtonText(`Deleting...`);
    api.deleteTrip(editedTrip.id)
      .catch(() => {
        openedTrip.renderDeleteErrorState();
      })
      .then(() => api.getTrips())
      .then((tripPoints) => {
        state.setTripDates(tripPoints);
        state.setData(tripPoints);
        this.remove();
        this.initAllTripsDays(state.data);
      });
  }

  onNewTripSubmit(newOpenedTrip) {
    newOpenedTrip.renderSavingState();

    api.createTrip(ModelTrip.toRAW(newOpenedTrip._tripPoint))
      .then(() => api.getTrips())
      .then((data) => {
        state.setTripDates(data);
        state.setData(data);
        newOpenedTrip.unrender();
        this.remove();
        this.update(data);
        this.init();
      })
      .catch(() => {
        newOpenedTrip.renderSaveErrorState();
      });
  }

  onNewTripEscape(newOpenedTrip, newTripWrapper) {
    if (!newOpenedTrip.element) {
      newOpenedTrip.unrender();
    }
    tripDaysWrapper.removeChild(newTripWrapper.element);
  }

  onNewTripDelete(newOpenedTrip, newTripWrapper) {
    newOpenedTrip.unrender();
    tripDaysWrapper.removeChild(newTripWrapper.element);
  }

  renderNewOpenedEvent(newTripWrapper, newOpenedTrip) {
    tripDaysWrapper.insertBefore(newTripWrapper.render(), tripDaysWrapper.firstChild);
    itemsWrapper(newTripWrapper.element).appendChild(newOpenedTrip.render());
  }

  initNewTrip() {
    const newOpenedTrip = new OpenedTripPoint(newTripData(), state.destinations, state.offers);
    const newTripWrapper = new TripDay(null);
    this.renderNewOpenedEvent(newTripWrapper, newOpenedTrip);
    newOpenedTrip.onSubmit = () => this.onNewTripSubmit(newOpenedTrip);
    newOpenedTrip.onEscape = () => this.onNewTripEscape(newOpenedTrip, newTripWrapper);
    newOpenedTrip.onDelete = () => this.onNewTripDelete(newOpenedTrip, newTripWrapper);
  }

  init() {
    this.initAllTripsDays(this._tripPoints);
  }

  remove() {
    tripDaysWrapper.innerHTML = ``;
    state.trips.forEach((trip) => {
      trip.unrender();
    });
  }
}

export {
  TripsContainer,
  tripDaysWrapper,
  itemsWrapper
};
