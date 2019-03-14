import TripPoint from './trip';
import {tripWrapper} from './helpers';

class TripsContainer {
  constructor(array) {
    this._array = array;
    this._trips = [];
  }

  init() {
    this._array.forEach((element) => {
      const task = new TripPoint(element);
      this._trips.push(task);
      return this._trips;
    });
  }

  render() {
    this._trips.forEach((trip) => {
      trip.render();
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
