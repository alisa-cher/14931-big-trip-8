import TripPoint from './trip';
import OpenedTripPoint from './trip-opened';
import TripDay from './trip-day';
import {ModelTrip} from "../data/model-trip";
import TotalPrice from './../total-price/total-price';
import {groupTripsByDay} from './trip-day-service';
import {api, menuElement} from './../main';
import {state} from '../state';


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
    return Object.keys(sortedByDayTrips).forEach(function (index) {
      const dayCounter = state.tripDates.findIndex((element) => (element === index));
      const trips = sortedByDayTrips[index];
      const tripDay = new TripDay(dayCounter, index);
      tripDay.render();
      this.initTripsDay(trips, tripDay.element);
      tripDaysWrapper.appendChild(tripDay.element);
    }.bind(this));
  }

  init() {
    this.initAllTripsDays(this._tripPoints);
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
    openedTrip.onEscape = () => {
      if (!openedTrip.element) {
        openedTrip.unrender();
      } else {
        itemsWrapper(tripDayElement).appendChild(trip.render());
        itemsWrapper(tripDayElement).replaceChild(trip.element, openedTrip.element);
        openedTrip.unrender();
      }
    };

    openedTrip.onSubmit = (formData) => {
      openedTrip.blockForm();
      openedTrip.modifySaveButtonText(`Saving...`);

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
          openedTrip.shake();
          openedTrip.changeFormBorder(`3px solid red`);
          openedTrip.unlockForm();
          openedTrip.modifySaveButtonText(`Save`);
        });
    };

    openedTrip.onDelete = () => {
      openedTrip.blockForm();
      openedTrip.modifyDeleteButtonText(`Deleting...`);
      api.deleteTrip(editedTrip.id)
        .catch(() => {
          openedTrip.shake();
          openedTrip.changeFormBorder(`3px solid red`);
          openedTrip.unlockForm();
          openedTrip.modifyDeleteButtonText(`Delete`);
        })
        .then(() => api.getTrips())
        .then((tripPoints) => {
          state.setTripDates(tripPoints);
          state.setData(tripPoints);
          this.remove();
          this.initAllTripsDays(state.data);
        });
    };
  }

  remove() {
    tripDaysWrapper.innerHTML = ``;
    state.trips.forEach((trip) => {
      trip.unrender();
    });
  }
}

export {TripsContainer, tripDaysWrapper, itemsWrapper};
