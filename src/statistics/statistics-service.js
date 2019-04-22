import {travelIcons, transportTypes} from '../trip/data';
import {sortObjectKeys, checkIfHasProperty, capitalizeFirstLetter, calcTripPointPrice} from './../helpers';

const getTripTransportPoints = (tripPoints) => tripPoints.filter((tripPoint) => transportTypes.includes(tripPoint.travelType));

// chart transport type + money spent
const getMoneyStatistics = (tripPoints) => {
  const statistics = {};
  for (const tripPoint of tripPoints) {
    if (!checkIfHasProperty(statistics, tripPoint.travelType)) {
      statistics[tripPoint.travelType] = calcTripPointPrice(tripPoint);
    } else {
      statistics[tripPoint.travelType] += calcTripPointPrice(tripPoint);
    }
  }
  return statistics;
};

// chart transport type + usage
const getTransportStatistics = function (tripPoints) {
  const statistics = {};
  const tripPointsWithTransportTravelType = getTripTransportPoints(tripPoints);

  for (const tripPoint of tripPointsWithTransportTravelType) {
    if (!checkIfHasProperty(statistics, tripPoint.travelType)) {
      statistics[tripPoint.travelType] = 0;
    }
    statistics[tripPoint.travelType]++;
  }
  return statistics;
};

// chart trip point + time spent
const getTimeStatistics = function (tripPoints) {
  const statistics = {};
  for (const tripPoint of tripPoints) {
    const icon = travelIcons[tripPoint.travelType];
    const key = icon + ` ` + capitalizeFirstLetter(tripPoint.travelType) + ` to ` + tripPoint.destination.name;
    statistics[key] = Math.abs(tripPoint.time.arrival - tripPoint.time.departure);
  }
  return statistics;
};

const timeChartData = (data) => sortObjectKeys(getTimeStatistics(data)).map((type) => getTimeStatistics(data)[type]);
const timeChartLabels = (data) => sortObjectKeys(getTimeStatistics(data)).map((type) => `${type}`);

const moneyChartData = (data) => sortObjectKeys(getMoneyStatistics(data)).map((type) => getMoneyStatistics(data)[type]);
const moneyChartLabels = (data) => sortObjectKeys(getMoneyStatistics(data)).map((type) => `${travelIcons[type]} ${capitalizeFirstLetter(type)}`);

const transportChartData = (data) => sortObjectKeys(getTransportStatistics(data)).map((type) => getTransportStatistics(data)[type]);
const transportChartLabels = (data) => sortObjectKeys(getTransportStatistics(data)).map((type) => `${travelIcons[type]} ${capitalizeFirstLetter(type)}`);

export {moneyChartData, moneyChartLabels, transportChartData, transportChartLabels, timeChartData, timeChartLabels};

