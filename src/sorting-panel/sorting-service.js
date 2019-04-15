import {calcTripPointPrice} from './../helpers';

export const sortTrips = (allTrips, clickedFilter) => {
  switch (clickedFilter) {
    case `sorting-event`:
      return allTrips;

    case `sorting-time`:
      return sortByTime(allTrips);

    case `sorting-price`:
      return sortByPrice(allTrips);
  }
  return allTrips;
};

const sortByTime = (trips) => [...trips].sort((a, b) => (a.time.arrival - a.time.departure) - (b.time.arrival - b.time.departure));

const sortByPrice = (trips) => [...trips].sort((a, b) => (calcTripPointPrice(b) - calcTripPointPrice(a)));
