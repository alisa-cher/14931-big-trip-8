import {getDataForAllTripPoints} from './data';
import {bindMenuEvents} from './menu';
import AllFilters from './filter/filters-container';
import AllTrips from './trip/trips-container';
import {dataFilters} from './filter/data';
import {state} from './state';
import StatisticsContainer from './statistics/statistics-container';

state.setData(getDataForAllTripPoints(7));

export const trips = new AllTrips(state.data);
trips.init();

export const filters = new AllFilters(dataFilters);
filters.init();

export const statistics = new StatisticsContainer(state.data);
statistics.init();

bindMenuEvents(() => {
  statistics.update(state.data);
  filters.destroy();
}, () => filters.init());
