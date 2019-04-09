import {getDataForAllTripPoints} from './../data';
import {getRandomInteger} from './../helpers';
import AllTrips from './trips-container';

const formElement = (element) => element.querySelector(`form`);
const deleteButton = (element) => element.querySelector(`.point__button--delete`);

const generateOffers = (offers) => [...offers].map((offer) => `<li><button class="trip-point__offer">${offer}</button></li>`).join(``);

const generatePictures = (pictures) => pictures.map((picture) => `<img src="${picture}" alt="picture from place" class="point__destination-image">`).join(``);

const getNewTasks = () => new AllTrips(getDataForAllTripPoints(getRandomInteger(1, 10)));

export {generatePictures, generateOffers, getNewTasks, formElement, deleteButton};
