import {getDataForAllTripPoints} from './../data';
import {getRandomInteger} from './../helpers';
import AllTrips from './all-trips';

const tripWrapper = document.querySelector(`.trip-day__items`);
const saveButton = (element) => element.querySelector(`.point__button--save`);
const deleteButton = (element) => element.querySelector(`.point__button--delete`);

const generateOffers = (offers) => offers.map((offer) => `<li><button class="trip-point__offer">${offer}</button></li>`).join(``);

const getNewTasks = () => new AllTrips(getDataForAllTripPoints(getRandomInteger(1, 10)));

export {generateOffers, tripWrapper, getNewTasks, saveButton, deleteButton};
