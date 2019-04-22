import API from './data/api';
import AllFilters from './filter/filters-container';
import StatisticsContainer from './statistics/statistics-container';
import SortingPanelContainer from './sorting-panel/sorting-panel-container';
import TotalPrice from './total-price/total-price';
import {TripsContainer, tripDaysWrapper} from './trip/trips-container';
import {bindMenuEvents} from './menu';
import {bindNewEventClick} from './new-event';
import {dataFilters} from './filter/data';
import {state} from './state';

const menuElement = document.querySelector(`.menu`);

const AUTHORIZATION = `Basic deo0w590ik29889a=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const Message = {
  ERROR: `Something went wrong while loading your route info. </br> Check your connection or try again later`,
  LOADING: `Loading route...`,
};

let trips;
let statistics;
let filters;
let totalPrice;

const init = () => {
  tripDaysWrapper.appendChild(TripsContainer.renderMessage(Message.LOADING));

  Promise.all([api.getTrips(), api.getDestinations(), api.getOffers()])
    .then(([tripPoints, destinations, offers]) => {
      tripDaysWrapper.textContent = ``;

      state.setData(tripPoints);
      state.setTripDates(tripPoints);
      state.setDestinations(destinations);
      state.setOffers(offers);

      trips = new TripsContainer(tripPoints, destinations, offers);
      trips.init();

      statistics = new StatisticsContainer(tripPoints);
      statistics.init();

      filters = new AllFilters(dataFilters);
      filters.init();

      totalPrice = new TotalPrice(state.data);
      menuElement.appendChild(totalPrice.render());
      state.setTotalPriceInstance(totalPrice);

      bindMenuEvents(() => {
        statistics.update(tripPoints);
        filters.destroy();
      }, () => filters.init());
    })
    .catch(() => {
      tripDaysWrapper.appendChild(TripsContainer.renderMessage(Message.ERROR));
    });

  const sortPanel = new SortingPanelContainer();
  sortPanel.init();

  bindNewEventClick(() => {
    trips.initNewTrip();
    bindNewEventClick();
  });
};

init();

export {
  trips,
  statistics,
  filters,
  totalPrice,
  api,
  menuElement
};

