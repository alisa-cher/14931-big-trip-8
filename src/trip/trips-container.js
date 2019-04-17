import TripPoint from './trip';
import OpenedTripPoint from './trip-opened';
import {state} from '../state';
import {api} from './../main';
import {ModelTrip} from "../data/model-trip";

const tripWrapper = document.querySelector(`.trip-day__items`);

class TripsContainer {
  constructor(tripPoints, destinations, offers) {
    this._tripPoints = tripPoints;
    this._destinations = destinations;
    this._offers = offers;
  }

  update(data) {
    this._tripPoints = data;
  }

  init() {
    this._tripPoints.forEach((element) => {
      const trip = new TripPoint(element);
      tripWrapper.appendChild(trip.render());
      state.setTrips(trip);
      this.initTripPoint(trip, element);
    });
  }

  initTripPoint(trip, element) {
    trip.onEdit = () => {
      const editedTrip = element.copy();
      const openedTrip = new OpenedTripPoint(editedTrip, this._destinations, this._offers);
      this.initOpenedTrip(trip, openedTrip, editedTrip);

      state.setOpenedTrips(element);
      openedTrip.render();
      tripWrapper.replaceChild(openedTrip.element, trip.element);
      trip.unrender();
    };
  }

  initOpenedTrip(trip, openedTrip, editedTrip) {
    openedTrip.onEscape = () => {
      if (!openedTrip.element) {
        openedTrip.unrender();
      } else {
        tripWrapper.appendChild(trip.render());
        tripWrapper.replaceChild(trip.element, openedTrip.element);
        openedTrip.unrender();
      }
    };

    openedTrip.onSubmit = (formData) => {
      openedTrip.blockForm();
      openedTrip.modifySaveButtonText(`Saving...`);

      api.updateTrip({id: editedTrip.id, data: ModelTrip.toRAW(formData)})
        .then((newTripPointData) => {
          const newTrip = new TripPoint(newTripPointData);
          this.initTripPoint(newTrip, newTripPointData);
          tripWrapper.replaceChild(newTrip.render(), openedTrip.element);
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
        .then((tripPoints) => state.setData(tripPoints))
        .then(() => {
          tripWrapper.removeChild(openedTrip.element);
          openedTrip.unrender();
        });
    };
  }

  remove() {
    tripWrapper.innerHTML = ``;
    state.trips.forEach((trip) => {
      trip.unrender();
    });
  }
}

export {TripsContainer, tripWrapper};
