import TripPoint from './trip';
import {tripWrapper} from './helpers';
import OpenedTripPoint from './trip-opened';
import {state} from './state';

class TripsContainer {
  constructor(array) {
    this._array = array;
    this._trips = [];
  }

  render() {
    this._array.forEach((element) => {
      const trip = new TripPoint(element);
      const openedTrip = new OpenedTripPoint(element);
      trip.render();

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
    });
  }

  unrender() {
    this._trips.forEach((trip) => {
      trip.unrender();
    });
    while (tripWrapper.firstChild) {
      tripWrapper.removeChild(tripWrapper.firstChild);
    }
    this._trips = null;
  }
}

export default TripsContainer;
