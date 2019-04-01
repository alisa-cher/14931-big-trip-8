import TripPoint from './trip';
import {tripWrapper} from './helpers';
import OpenedTripPoint from './trip-opened';
import {state} from './state';

class TripsContainer {
  constructor(array) {
    this._array = array;
  }

  render() {
    this._array.forEach((element) => {
      const trip = new TripPoint(element);
      const openedTrip = new OpenedTripPoint(element);
      trip.render();
      state.setTrips(trip);

      trip.onEdit = () => {
        openedTrip.render();
        tripWrapper.replaceChild(openedTrip.element, trip.element);
        trip.unrender();
        state.setOpenedTrips(openedTrip);
      };

      openedTrip.onSubmit = (newObject) => {
        trip.update(newObject);
        trip.render();
        tripWrapper.replaceChild(trip.element, openedTrip.element);
        openedTrip.unrender();
      };

      openedTrip.onDelete = () => {
        tripWrapper.removeChild(openedTrip.element);
        openedTrip.unrender();
        const index = this._array.findIndex((it) => it === element);
        this._array[index] = null;
      };
    });
  }

  unrender() {
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

export default TripsContainer;
