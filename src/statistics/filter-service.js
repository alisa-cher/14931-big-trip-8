import {travelIcons, matchOffersWithPrices, transportTypes} from './../data';
import {sortObjectKeys} from './../helpers';
import moment from './../../node_modules/moment';

// TODO: подумать, как в целом отрефакторить этот файл

// chart transport type + money spent
const getTotalOffersCost = (arr) => arr.map((offer) => matchOffersWithPrices[offer]).reduce((cost, offer) => cost + offer);

const calcTripPointPrice = (tripPointData) => {
  const offersArray = [...tripPointData.offers];
  return offersArray.length ? tripPointData.price + getTotalOffersCost(offersArray) : tripPointData.price;
};

const moneyStatisticObj = (dataToFilter) => {
  const moneyStatistic = {};
  for (const tripPoint of dataToFilter) {
    const hasTravelType = moneyStatistic.hasOwnProperty(tripPoint.travelType);
    moneyStatistic[tripPoint.travelType] = hasTravelType ? +calcTripPointPrice(tripPoint) : calcTripPointPrice(tripPoint);
  }
  return moneyStatistic;
};

const moneyChartData = (data) => sortObjectKeys(moneyStatisticObj(data)).map((type) => moneyStatisticObj(data)[type]);
const moneyChartLabels = (data) => sortObjectKeys(moneyStatisticObj(data)).map((type) => `${travelIcons[type]} ${type}`);

// chart transport type + usage
const transportStatisticObj = function (dataToFilter) {
  const transportObj = {};
  const transportArray = (data) => data.filter((tripPoint) => transportTypes.includes(tripPoint.travelType));
  for (const tripPoint of transportArray(dataToFilter)) {
    const hasTravelType = transportObj.hasOwnProperty(tripPoint.travelType);
    transportObj[tripPoint.travelType] = hasTravelType ? ++transportObj[tripPoint.travelType] : 1;
  }
  return transportObj;
};

const transportChartData = (data) => sortObjectKeys(transportStatisticObj(data)).map((type) => transportStatisticObj(data)[type]);
const transportChartLabels = (data) => sortObjectKeys(transportStatisticObj(data)).map((type) => `${travelIcons[type]} ${type}`);

// chart trip point + time spent
const timeStatisticObj = function (dataToFilter) {
  const transportObj = {};
  for (const tripPoint of dataToFilter) {
    let icon = travelIcons[tripPoint.travelType];
    // TODO: не понимаю, почему работает именно так + как указать длительность в часах + минутах т.к возможны случаи, когда длительность меньше часа
    let duration = Math.abs(moment.duration(moment(tripPoint.time.arrival).diff(tripPoint.time.departure, `hours`), `hours`).asHours());
    if (duration) {
      transportObj[icon + ` ` + tripPoint.travelType + ` to ` + tripPoint.city] = duration;
    }
  }
  return transportObj;
};

const timeChartData = (data) => sortObjectKeys(timeStatisticObj(data)).map((type) => timeStatisticObj(data)[type]);
const timeChartLabels = (data) => sortObjectKeys(timeStatisticObj(data)).map((type) => `${type}`);

export {moneyChartData, moneyChartLabels, transportChartData, transportChartLabels, timeChartData, timeChartLabels};

