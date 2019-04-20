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
  const formatTime = (timeUnit) => timeUnit < 10 ? (`0` + timeUnit) : timeUnit;
  const days = Math.floor(moment.duration(duration).asDays());
  const hours = Math.floor(moment.duration(duration).hours());
  const minutes = moment.duration(duration).minutes();

  const getDays = () => days ? formatTime(days) + `D` : ``;
  const getHours = () => {
    if (days) {
      return formatTime(hours) + `H`;
    } else {
      return hours ? formatTime(hours) + `H` : ``;
    }
  };
  const getMinutes = () => {
    if (hours) {
      return formatTime(minutes) + `M`;
    } else {
      return minutes ? formatTime(minutes) + `M` : ``;
    }
  };

  const formattedMinutes = getMinutes();
  const formattedDays = getDays();
  const formattedHours = getHours();

  return formattedDays + ` ` + formattedHours + ` ` + formattedMinutes;
};

export {getRandomInteger, getRandomElementFromArray, getRandomTimeStampWithinADay, capitalizeFirstLetter,
  sortObjectKeys, getDurationInHoursAndMinutes, checkIfHasProperty, filterEmptyData, findIndexOfProperty,
  getTotalOffersCost, calcTripPointPrice};
