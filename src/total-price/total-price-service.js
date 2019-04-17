import {calcTripPointPrice} from './../helpers';

export const calcTripPointsPrices = (data) => {
  return data.map((trip) => calcTripPointPrice(trip)).reduce((previous, next) => previous + next);
};
