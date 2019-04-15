import Filter from './filters';
import {state} from '../state';
import {TripsContainer} from './../trip/trips-container';
import {trips} from './../main';
import {filterTasks} from "./filter-service";

const filterWrapper = document.querySelector(`.trip-controls__menus`);

class FiltersContainer {
  constructor(array) {
    this._array = array;
  }

  init() {
    const filter = new Filter(this._array);
    filterWrapper.appendChild(filter.render());
    state.setFilters(filter);

    filter.onChange = () => {
      const filteredTripsData = filterTasks(state.data, filter.activeFilter);
      state.setFilteredTrips(filteredTripsData);
      trips.remove();
      const filteredTrips = new TripsContainer(filteredTripsData, state.destinations);
      filteredTrips.init();
    };
  }

  destroy() {
    state.filters.element.remove();
    state.filters.unrender();
  }
}

export default FiltersContainer;
