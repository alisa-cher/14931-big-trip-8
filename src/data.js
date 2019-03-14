import {getRandomInteger, getRandomTimeStampWithinADay, getRandomElementFromArray} from './helpers';

const getTravelDescription = () => `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna,
non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.
Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus,
purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.
Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.
In rutrum ac purus sit amet tempus`.split(`. `).map((a) => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map((a) => a[1]).splice(0, Math.floor(Math.random() * 3));

const getOffers = () => [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`].slice(0, Math.floor(Math.random() * 4));

const allCities = [`New-York`, `Tbilisi`, `Amsterdam`, `Berlin`, `Sidney`];

const travelTypes = [
  {'Taxi': `🚕`},
  {'Bus': `🚌`},
  {'Train': `🚂`},
  {'Ship': `🛳`},
  {'Transport': `🚊`},
  {'Drive': `🚗`},
  {'Flight': `✈`},
  {'Check-in': `🏨`},
  {'Sightseeing': `🏛`},
  {'Restaurant': `🍴`},
];

const getAllData = () => ({
  travelType: getRandomElementFromArray(travelTypes),
  picture: `http://picsum.photos/300/150?r=${Math.random()}`,
  description: getTravelDescription(),
  city: getRandomElementFromArray(allCities),
  offers: getOffers(),
  price: getRandomInteger(20, 100),
  time: {
    departure: getRandomTimeStampWithinADay(),
    arrival: getRandomTimeStampWithinADay(),
  },
  duration: getRandomTimeStampWithinADay(),
});

const getDataForAllTripPoints = (length) => (new Array(length).fill(``).map(()=> getAllData()));

export {getAllData, getDataForAllTripPoints};
