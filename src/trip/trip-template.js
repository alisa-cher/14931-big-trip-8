import {capitalizeFirstLetter} from './../helpers';
import {travelIcons} from './data';
import moment from './../../node_modules/moment';
import {getDurationInHoursAndMinutes} from './../helpers';

const MAX_OFFERS_DISPLAYED = 3;

const basicTravelPointTemplate = (travel) => `<article class="trip-point">
          <i class="trip-icon">${travelIcons[travel.travelType]}</i>
          <h3 class="trip-point__title">${capitalizeFirstLetter(travel.travelType) + ` to ` + travel.destination.name}</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">
                ${moment.unix(travel.time.departure / 1000).format(`HH:mm`) + ` - ` + moment.unix(travel.time.arrival / 1000).format(`HH:mm`)}
            </span>
            <span class="trip-point__duration">
                ${getDurationInHoursAndMinutes(travel.time.arrival - travel.time.departure)}
            </span>
          </p>
          <p class="trip-point__price">${travel.price} €</p>
          <ul class="trip-point__offers">${generateOffers(travel.offers)}</ul></article>`;

const extendedTravelPointTemplate = (travel, destinations) => `<article class="point"> <form action="" method="get">
    <header class="point__header">
      <label class="point__date">
        choose day
        <input class="point__input" type="text" placeholder="MAR 18" name="day">
      </label>

      <div class="travel-way">
        <label class="travel-way__label" for="travel-way__toggle-${travel.id}">${travelIcons[travel.travelType]}</label>

        <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle-${travel.id}">

        <div class="travel-way__select">
          <div class="travel-way__select-group">
            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi-${travel.id}" name="travelway" value="taxi">
            <label class="travel-way__select-label" for="travel-way-taxi-${travel.id}">🚕 taxi</label>

            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus-${travel.id}" name="travelway" value="bus">
            <label class="travel-way__select-label" for="travel-way-bus-${travel.id}">🚌 bus</label>

            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train-${travel.id}" name="travelway" value="train">
            <label class="travel-way__select-label" for="travel-way-train-${travel.id}">🚂 train</label>

            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight-${travel.id}" name="travelway" value="flight">
            <label class="travel-way__select-label" for="travel-way-flight-${travel.id}">✈️ flight</label>
          </div>

          <div class="travel-way__select-group">
            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in-${travel.id}" name="travelway" value="check-in">
            <label class="travel-way__select-label" for="travel-way-check-in-${travel.id}">🏨 check-in</label>

            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing-${travel.id}" name="travelway" value="sightseeing">
            <label class="travel-way__select-label" for="travel-way-sightseeing-${travel.id}">🏛 sightseeing</label>
          </div>
        </div>
      </div>

      <div class="point__destination-wrap">
        <label class="point__destination-label" for="destination">${capitalizeFirstLetter(travel.travelType)}</label>
        <input class="point__destination-input" list="destination-select" id="destination" value="${travel.destination.name}" name="destination">
        <datalist id="destination-select">${getDestinationsTemplate(destinations)}</datalist>
      </div>
      
      <div class="point__time">
        choose time
        <input class="point__input" type="text" value="${travel.time.departure}" name="departureTime" placeholder="">
        <input class="point__input" type="text" value="${travel.time.arrival}" name="arrivalTime" placeholder="">
      </div>
     
      <label class="point__price">
        write price
        <span class="point__price-currency">€</span>
        <input class="point__input" type="number" min="1" value="${travel.price}" name="price">
      </label>

      <div class="point__buttons">
        <button class="point__button point__button--save" type="submit">Save</button>
        <button class="point__button point__button--delete" type="reset">Delete</button>
      </div>

      <div class="paint__favorite-wrap">
        <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" ${travel.isFavorite ? `checked` : ``} name="favorite">
        <label class="point__favorite" for="favorite">favorite</label>
      </div>
    </header>

    <section class="point__details">
      <section class="point__offers">
         ${travel.offers.length ? `<h3 class="point__details-title">offers</h3>` : ``}
        <div class="point__offers-wrap"> ${extendedOffersTemplate(travel.offers, travel)}</div>

      </section>
      <section class="point__destination">
        <h3 class="point__details-title">Destination</h3>
        <p class="point__destination-text">${travel.destination.description ? travel.destination.description : ` `}</p>
        <div class="point__destination-images">
          ${travel.destination.pictures ? generatePictures(travel.destination.pictures) : ` `}
        </div>
      </section>
      <input type="hidden" class="point__total-price" name="total-price" value="">
    </section>
  </form></article>`;

const generateOffers = (offers) => (
  [...offers].slice(0, MAX_OFFERS_DISPLAYED).map((offer) => (
    offer.accepted ? `<li><button class="trip-point__offer">${offer.title}</button></li>` : ``
  )).join(``)
);

const generatePictures = (pictures) => (
  pictures.map((picture) => `<img src="${picture.src}" alt="${picture.description}" class="point__destination-image">`).join(``)
);

const extendedOffersTemplate = (offers, travel) => {
  return offers.map((offer) => {
    return `<input
      class="point__offers-input visually-hidden"
      type="checkbox"
      id="${offer.title.replace(/ +/g, `-`).toLowerCase() + travel.id}"
      name="offer" ${offer.accepted ? `checked` : ``}
      value="${capitalizeFirstLetter(offer.title)}">
      <label for="${offer.title.replace(/ +/g, `-`).toLowerCase() + travel.id}" class="point__offers-label">
        <span class="point__offer-service">${offer.title}</span> + €
        <span class="point__offer-price"> ${offer.price} </span>
      </label>`;
  }).join(``);
};

const getDestinationsTemplate = (destinations) => (
  destinations.map((destination) => `<option value="${destination.destination.name}"></option>`).join(``)
);

export {
  basicTravelPointTemplate,
  extendedTravelPointTemplate
};
