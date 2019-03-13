import TripPoint from './trip';
import {tripWrapper} from './helpers';

class AllTrips {
  constructor(array) {
    this._array = array;
    this._trips = [];
  }

  initAll() {
    this._array.forEach((element) => {
      const task = new TripPoint(element);
      this._trips.push(task);
      return this._trips;
    });
  }

  renderAll() {
    this._trips.forEach((trip) => {
      trip.render();
    });
  }

  unrenderAll() {
    this._trips.forEach((trip) => {
      trip.unrender();
    });
    while (tripWrapper.firstChild) {
      tripWrapper.removeChild(tripWrapper.firstChild);
    }
    this._trips = null;
  }
}

export default AllTrips;
