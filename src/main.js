import {getDataForAllTripPoints} from './data';
import AllTrips from './trip/all-trips';
import drawAllFilters from './filters';

export const trips = new AllTrips(getDataForAllTripPoints(7));
trips.render();
drawAllFilters();
