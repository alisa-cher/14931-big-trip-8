import moment from './../node_modules/moment';

const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getRandomElementFromArray = (array) => array[getRandomInteger(0, array.length - 1)];
const getRandomTimeStampWithinADay = () => (1 + Math.floor(Math.random() * 24 * 60 * 60 * 1000));

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const sortObjectKeys = (obj) => Object.keys(obj).sort((a, b) => obj[b] - obj[a]);

const checkIfHasProperty = (obj, property) => obj.hasOwnProperty(property);

const findIndexOfProperty = (array, property, targetProperty) => (array.map((item) => item[property]).indexOf(targetProperty));

const filterEmptyData = (arr) => arr.filter((item) => item !== null);

const getTotalOffersCost = (arr) => arr.map((offer) => offer.price).reduce((cost, offer) => cost + offer);

const calcTripPointPrice = (tripPointData) => {
  const offersArray = [...tripPointData.offers].filter((offer) => offer.accepted);
  return offersArray.length ? tripPointData.price + getTotalOffersCost(offersArray) : tripPointData.price;
};


const getDurationInHoursAndMinutes = (duration) => {
  const hours = Math.floor(moment.duration(duration).asHours());
  const minutes = moment.duration(duration).minutes();
  const formattedMinutes = minutes < 10 ? (`0` + minutes) : minutes;
  if (hours) {
    return hours + `H ` + formattedMinutes + `M`;
  } else {
    return formattedMinutes + `M`;
  }
};

export {getRandomInteger, getRandomElementFromArray, getRandomTimeStampWithinADay, capitalizeFirstLetter,
  sortObjectKeys, getDurationInHoursAndMinutes, checkIfHasProperty, filterEmptyData, findIndexOfProperty,
  getTotalOffersCost, calcTripPointPrice};
