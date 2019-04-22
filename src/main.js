import API from './data/api';
import OpenedTripPoint from './trip/trip-opened';
import AllFilters from './filter/filters-container';
import StatisticsContainer from './statistics/statistics-container';
import SortingPanelContainer from './sorting-panel/sorting-panel-container';
import TotalPrice from './total-price/total-price';
import TripDay from './trip/trip-day';
import {TripsContainer, tripDaysWrapper, itemsWrapper} from './trip/trips-container';
import {bindMenuEvents} from './menu';
import {bindNewEventClick, newTripData} from './new-event';
import {dataFilters} from './filter/data';
import {state} from './state';

export const menuElement = document.querySelector(`.menu`);

const AUTHORIZATION = `Basic deo0w590ik29889a=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;

export const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const Message = {
  ERROR: `Something went wrong while loading your route info. </br> Check your connection or try again later`,
  LOADING: `Loading route...`,
};

export let trips;
export let statistics;
export let filters;
export let totalPrice;


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

  const renderNewOpenedEvent = (newTripWrapper, newOpenedTrip) => {
    tripDaysWrapper.insertBefore(newTripWrapper.render(), tripDaysWrapper.firstChild);
    itemsWrapper(newTripWrapper.element).appendChild(newOpenedTrip.render());
  };

  bindNewEventClick(() => {
    const newOpenedTrip = new OpenedTripPoint(newTripData(), state.destinations, state.offers);
    const newTripWrapper = new TripDay();
    renderNewOpenedEvent(newTripWrapper, newOpenedTrip);
    trips.initNewTrip(newOpenedTrip, newTripWrapper);
    bindNewEventClick();
  });
};

init();
