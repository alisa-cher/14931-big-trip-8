const transformMsToTime = (duration, format) => {
  let minutes = parseInt(((duration / (1000 * 60)) % 60), 10);
  let hours = parseInt(((duration / (1000 * 60 * 60)) % 24), 10);

  if (!format) {
    hours = (hours < 10) ? `0` + hours : hours;
  }

  minutes = (minutes < 10) ? `0` + minutes : minutes;

  return (format) ? hours + `H ` + minutes + `M` : hours + `:` + minutes;
};

const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getRandomElementFromArray = (array) => array[getRandomInteger(0, array.length - 1)];
const getRandomTimeStampWithinADay = () => (1 + Math.floor(Math.random() * 24 * 60 * 60 * 1000));

export {getRandomInteger, transformMsToTime, getRandomElementFromArray, getRandomTimeStampWithinADay};
