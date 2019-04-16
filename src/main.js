import {bindMenuEvents} from './menu';
import {bindNewEventClick, newTripData} from './new-event';
import OpenedTripPoint from './trip/trip-opened';
import AllFilters from './filter/filters-container';
import {TripsContainer, tripWrapper} from './trip/trips-container';
import {dataFilters} from './filter/data';
import {state} from './state';
import StatisticsContainer from './statistics/statistics-container';
import SortingPanelContainer from './sorting-panel/sorting-panel-container';
import API from './data/api';
import {ModelTrip} from './data/model-trip';
import {calcTripPointsPrices} from './total-price/total-price-service';
import TotalPrice from './total-price/total-price';

const menuElement = document.querySelector(`.menu`);

const AUTHORIZATION = `Basic deo0w590ik29889a=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;

export const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

export let trips;
export let statistics;
export let filters;
export let totalPrice;


const init = () => {
  tripWrapper.textContent = `Loading route...`;

  Promise.all([api.getTrips(), api.getDestinations(), api.getOffers()])
    .then(([tripPoints, destinations, offers]) => {
      tripWrapper.textContent = ``;

      state.setData(tripPoints);
      state.setDestinations(destinations);
      state.setOffers(offers);

      trips = new TripsContainer(tripPoints, destinations, offers);
      trips.init();
      
      statistics = new StatisticsContainer(tripPoints);
      statistics.init();

      filters = new AllFilters(dataFilters);
      filters.init();

      totalPrice = new TotalPrice(calcTripPointsPrices(state.data));
      menuElement.appendChild(totalPrice.render());

      bindMenuEvents(() => {
        statistics.update(tripPoints);
        filters.destroy();
      }, () => filters.init());
    })
    .catch(() => {
      tripWrapper.textContent = `Something went wrong while loading your route info. Check your connection or try again later`;
    });

  const sortPanel = new SortingPanelContainer();
  sortPanel.init();

  bindNewEventClick(() => {
    const newOpenedTrip = new OpenedTripPoint(newTripData(), state.destinations, state.offers);
    tripWrapper.prepend(newOpenedTrip.render());

    newOpenedTrip.onSubmit = () => {
      newOpenedTrip.blockForm();
      newOpenedTrip.modifySaveButtonText(`Saving...`);

      api.createTrip(ModelTrip.toRAW(newOpenedTrip._tripPoint))
        .then(() => api.getTrips())
        .then((data) => {
          state.setData(data);
          newOpenedTrip.unrender();
          trips.remove();
          trips.update(data);
          trips.init();
        })
        .catch(() => {
          newOpenedTrip.shake();
          newOpenedTrip.changeFormBorder(`3px solid red`);
          newOpenedTrip.unlockForm();
          newOpenedTrip.modifySaveButtonText(`Save`);
        });
    };
    newOpenedTrip.onEscape = () => {
      if (!newOpenedTrip.element) {
        newOpenedTrip.unrender();
      }
      tripWrapper.removeChild(newOpenedTrip.element);
    };
    bindNewEventClick();
  });
};

init();
