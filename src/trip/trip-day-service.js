import moment from './../../node_modules/moment';

const addTripDayProperty = (arr) => arr.map((trip) => {
  return Object.assign({}, trip, {day: moment(trip.time.arrival).format(`DD MMM`)});
});

const groupDataByProperty = (arr, key) => {
  return arr.reduce((previousObj, currentObj) => {
    (previousObj[currentObj[key]] = previousObj[currentObj[key]] || []).push(currentObj);
    return previousObj;
  }, {});
};

const groupTripsByDay = (trips) => {
  return groupDataByProperty(addTripDayProperty(trips), `day`);
};

export {
  addTripDayProperty,
  groupTripsByDay
};
