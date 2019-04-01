const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getRandomElementFromArray = (array) => array[getRandomInteger(0, array.length - 1)];
const getRandomTimeStampWithinADay = () => (1 + Math.floor(Math.random() * 24 * 60 * 60 * 1000));

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const lowercaseFirstLetter = (string) => string.charAt(0).toLowerCase() + string.slice(1);

export {getRandomInteger, getRandomElementFromArray, getRandomTimeStampWithinADay, capitalizeFirstLetter, lowercaseFirstLetter};
