import {getDataForAllTripPoints} from './../data';
import {getRandomInteger} from './../helpers';
import AllTrips from './all-trips';

const tripWrapper = document.querySelector(`.trip-day__items`);
const formElement = (element) => element.querySelector(`.point form`);
const deleteButton = (element) => element.querySelector(`.point__button--delete`);

const generateOffers = (offers) => [...offers].map((offer) => `<li><button class="trip-point__offer">${offer}</button></li>`).join(``);

const generatePictures = (pictures) => pictures.map((picture) => `<img src="${picture}" alt="picture from place" class="point__destination-image">`).join(``);

const getNewTasks = () => new AllTrips(getDataForAllTripPoints(getRandomInteger(1, 10)));

export {generatePictures, generateOffers, tripWrapper, getNewTasks, formElement, deleteButton};
