import {getDataForAllTripPoints} from './data';
import drawTravelPointPanels from './trip-point';
import drawAllFilters from './filters';

drawTravelPointPanels(getDataForAllTripPoints(7));
drawAllFilters();
