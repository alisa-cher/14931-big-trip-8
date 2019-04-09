import moment from './../node_modules/moment';

const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getRandomElementFromArray = (array) => array[getRandomInteger(0, array.length - 1)];
const getRandomTimeStampWithinADay = () => (1 + Math.floor(Math.random() * 24 * 60 * 60 * 1000));

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const lowercaseFirstLetter = (string) => string.charAt(0).toLowerCase() + string.slice(1);

const sortObjectKeys = (obj) => Object.keys(obj).sort((a, b) => obj[b] - obj[a]);

const checkIfHasProperty = (obj, property) => obj.hasOwnProperty(property);

const filterEmptyData = (arr) => arr.filter((item) => item !== null);

const getDurationInHoursAndMinutes = (duration) => {
  const hours = Math.floor(moment.duration(duration).asHours());
  const minutes = moment.duration(duration).minutes();
  if (hours) {
    return hours + `H ` + minutes + `M`;
  } else {
    return minutes + `M`;
  }
};

export {getRandomInteger, getRandomElementFromArray, getRandomTimeStampWithinADay, capitalizeFirstLetter, lowercaseFirstLetter,
  sortObjectKeys, getDurationInHoursAndMinutes, checkIfHasProperty, filterEmptyData};
