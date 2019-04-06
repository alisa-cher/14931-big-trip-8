import {getDataForAllTripPoints} from './data';
import {bindMenuEvents} from './menu';
import AllFilters from './filter/filters-container';
import AllTrips from './trip/trips-container';
import {dataFilters} from './filter/data';
import {state} from './trip/state';
import Statistics from './statistics/statistics';
import {getConfig, moneyChartConfigs, transportChartConfigs, timeChartConfigs} from './statistics/config';

state.setData(getDataForAllTripPoints(7));
export const trips = new AllTrips(state.data);
trips.render();

const filters = new AllFilters(dataFilters);
filters.render();

const moneyChart = new Statistics(getConfig(moneyChartConfigs(state.data)), `money`);
const transportChart = new Statistics(getConfig(transportChartConfigs(state.data)), `transport`);
const timeChart = new Statistics(getConfig(timeChartConfigs(state.data)), `time`);

bindMenuEvents();

moneyChart.render();
transportChart.render();
timeChart.render();

export {moneyChart, transportChart, timeChart};
