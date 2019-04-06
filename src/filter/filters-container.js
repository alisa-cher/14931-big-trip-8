import Filter from './filters';
import {state} from './../trip/state';
import AllTrips from './../trip/trips-container';
import {trips} from './../main';

class FiltersContainer {
  constructor(array) {
    this._array = array;
  }

  filterTasks(allTrips, clickedFilter) {
    switch (clickedFilter) {
      case `filter-everything`:
        return allTrips;

      case `filter-future`:
        return allTrips.filter((it) => it.time.departure > Date.now());

      case `filter-past`:
        return allTrips.filter((it) => it.time.departure < Date.now());
    }
    return allTrips;
  }

  render() {
    const filter = new Filter(this._array);
    filter.render();

    filter.onChange = (evt) => {
      const filteredTripsData = this.filterTasks(state.data, evt.target.id);
      trips.unrender();
      const filteredTrips = new AllTrips(filteredTripsData);
      filteredTrips.render();
    };
  }
}

export default FiltersContainer;
