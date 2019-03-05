import {transformMsToTime} from './helpers';

export const tripWrapper = document.querySelector(`.trip-day__items`);

const drawTravelPointPanel = (travel) => {
  const travelPointTemplate = `
          <i class="trip-icon">${Object.values(travel.travelType)}</i>
          <h3 class="trip-point__title">${Object.keys(travel.travelType) + ` to ` + travel.city}</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable"> 
                ${transformMsToTime(travel.time.departure) + ` - ` + transformMsToTime(travel.time.arrival)}  
            </span>
            <span class="trip-point__duration">${transformMsToTime(travel.duration)}</span>
          </p>
          <p class="trip-point__price">${travel.price} €</p>
          <ul class="trip-point__offers">${generateOffers(travel.offers)}</ul>`;

  const article = document.createElement(`article`);
  article.classList.add(`trip-point`);
  article.innerHTML = travelPointTemplate;
  tripWrapper.appendChild(article);
};

const generateOffers = (offers) => offers.map((offer) => `<li><button class="trip-point__offer">${offer}</button></li>`).join(``);

const drawTravelPointPanels = (array) => {
  array.forEach((element) => drawTravelPointPanel(element));
};

export default drawTravelPointPanels;
