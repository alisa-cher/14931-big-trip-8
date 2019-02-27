export const tripWrapper = document.querySelector(`.trip-day__items`);

const travelPoint = {icon: `🚕`, eventName: `Taxi to aeroport`, time: `10:00&nbsp; — 11:00`, duration: `1H 30M`, price: `20`, offers: [`Order UBER +€ 20`, `Upgrade to business +€ 20`]};

const drawTravelPointPanel = (travel, offers) => {
  const travelPointTemplate = `
          <i class="trip-icon">${travel.icon}</i>
          <h3 class="trip-point__title">${travel.eventName}</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">${travel.time}</span>
            <span class="trip-point__duration">1h 30m</span>
          </p>
          <p class="trip-point__price">€ ${travel.price}</p>
          <ul class="trip-point__offers">${offers}</ul>`;

  const article = document.createElement(`article`);
  article.classList.add(`trip-point`);
  article.innerHTML = travelPointTemplate;
  tripWrapper.appendChild(article);
};

const generateOffers = () => {
  travelPoint.offers.forEach((offer) => `<li><button class="trip-point__offer">${offer}</button></li>`);
};

const drawTravelPointPanels = (numberOfStops) => {
  for (let i = 0; i < numberOfStops; i++) {
    drawTravelPointPanel(travelPoint, generateOffers());
  }
};

export default drawTravelPointPanels;
