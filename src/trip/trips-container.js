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
      const openedTrip = new OpenedTripPoint(element, this._destinations, this._offers);

      tripWrapper.appendChild(trip.render());
      state.setTrips(trip);

      trip.onEdit = () => {
        state.setOpenedTrips(element);
        openedTrip.render();
        tripWrapper.replaceChild(openedTrip.element, trip.element);
        trip.unrender();
      };

      // тут у меня проблемы
      openedTrip.onEscape = () => {
        if (!openedTrip.element) {
          openedTrip.unrender();
        } else {
          tripWrapper.appendChild(trip.render());
          tripWrapper.replaceChild(trip.element, openedTrip.element);
          openedTrip.unrender();
        }
      };

      openedTrip.onSubmit = () => {
        openedTrip.blockForm();
        openedTrip.modifySaveButtonText(`Saving...`);
        api.updateTrip({id: element.id, data: ModelTrip.toRAW(element)})
          .then((newTripPointData) => {
            trip.update(newTripPointData);
            tripWrapper.appendChild(trip.render());
            tripWrapper.replaceChild(trip.element, openedTrip.element);
            openedTrip.unrender();
            // по айди получить элемент, поменять цену
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
        api.deleteTrip(element.id)
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
    });
  }

  remove() {
    tripWrapper.innerHTML = ``;
    state.trips.forEach((trip) => {
      trip.unrender();
    });
    state.openedTrips.forEach((trip) => {
      trip.unrender();
    });
    state.clear();
  }
}

export {TripsContainer, tripWrapper};
