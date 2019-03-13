import {getDataForAllTripPoints} from './data';
import AllTrips from './trip/all-trips';
import drawAllFilters from './filters';

export const trips = new AllTrips(getDataForAllTripPoints(7));
trips.initAll();
trips.renderAll();

export const allInstancesOfAllTrips = [];
export const allInstancesOfAllOpenedTrips = [];

allInstancesOfAllTrips.push(trips);
drawAllFilters();
