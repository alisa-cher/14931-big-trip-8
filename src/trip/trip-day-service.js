import moment from './../../node_modules/moment';

const addTripDayProperty = (arr) => arr.map((trip) => {
  trip = {...trip, day: moment(trip.time.arrival).format(`DD MMM`)};
  return trip;
});

const groupDataByTripDay = (xs, day) => {
  return xs.reduce((rv, x) => {
    (rv[x[day]] = rv[x[day]]|| []).push(x);
    return rv;
  }, {});
};

export {addTripDayProperty, groupDataByTripDay};