import {generateOffers, generatePictures} from './helpers';
import {travelIcons} from './../data';
import moment from './../../node_modules/moment';

const basicTravelPointTemplate = (travel) => `
          <i class="trip-icon">${travelIcons[travel.travelType]}</i>
          <h3 class="trip-point__title">${travel.travelType + ` to ` + travel.city}</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">
                ${moment.unix(travel.time.departure).format(`HH:mm`) + ` - ` + moment.unix(travel.time.arrival).format(`HH:mm`)}
            </span>
            <span class="trip-point__duration">
                ${(moment.unix(travel.time.arrival - travel.time.departure).format(`h[H] mm[M]`))}
            </span>
          </p>
          <p class="trip-point__price">${travel.price} €</p>
          <ul class="trip-point__offers">${generateOffers(travel.offers)}</ul>`;

const extendedTravelPointTemplate = (travel) => `<form action="" method="get">
    <header class="point__header">
      <label class="point__date">
        choose day
        <input class="point__input" type="text" placeholder="MAR 18" name="day">
      </label>

      <div class="travel-way">
        <label class="travel-way__label" for="travel-way__toggle">${travelIcons[travel.travelType]}</label>

        <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

        <div class="travel-way__select">
          <div class="travel-way__select-group">
            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi" name="travelway" value="taxi">
            <label class="travel-way__select-label" for="travel-way-taxi">🚕 taxi</label>

            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus" name="travelway" value="bus">
            <label class="travel-way__select-label" for="travel-way-bus">🚌 bus</label>

            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train" name="travelway" value="train">
            <label class="travel-way__select-label" for="travel-way-train">🚂 train</label>

            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight" name="travelway" value="flight">
            <label class="travel-way__select-label" for="travel-way-flight">✈️ flight</label>
          </div>

          <div class="travel-way__select-group">
            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travelway" value="check-in">
            <label class="travel-way__select-label" for="travel-way-check-in">🏨 check-in</label>

            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travelway" value="sightseeing">
            <label class="travel-way__select-label" for="travel-way-sightseeing">🏛 sightseeing</label>
          </div>
        </div>
      </div>

      <div class="point__destination-wrap">
        <label class="point__destination-label" for="destination">${travel.travelType}</label>
        <input class="point__destination-input" list="destination-select" id="destination" value="${travel.city}" name="destination">
        <datalist id="destination-select">
          <option value="airport"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
          <option value="hotel"></option>
        </datalist>
      </div>

      <label class="point__time point__time--hyphen">
        choose time
        <input class="point__input" type="text" value="${moment.unix(travel.time.departure).format(`HH:mm`)}" name="departureTime" placeholder="00:00">
      </label>
      
      <label class="point__time">
        choose time
        <input class="point__input" type="text" value="${moment.unix(travel.time.arrival).format(`HH:mm`)}" name="arrivalTime" placeholder="00:00">
      </label>

      <label class="point__price">
        write price
        <span class="point__price-currency">€</span>
        <input class="point__input" type="text" value="${travel.price}" name="price">
      </label>

      <div class="point__buttons">
        <button class="point__button point__button--save" type="submit">Save</button>
        <button class="point__button point__button--delete" type="reset">Delete</button>
      </div>

      <div class="paint__favorite-wrap">
        <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
        <label class="point__favorite" for="favorite">favorite</label>
      </div>
    </header>

    <section class="point__details">
      <section class="point__offers">
        <h3 class="point__details-title">offers</h3>

        <div class="point__offers-wrap">
          <input class="point__offers-input visually-hidden" type="checkbox" id="add-luggage" name="offer" value="add-luggage">
          <label for="add-luggage" class="point__offers-label">
            <span class="point__offer-service">Add luggage</span> + €<span class="point__offer-price">30</span>
          </label>

          <input class="point__offers-input visually-hidden" type="checkbox" id="switch-to-comfort-class" name="offer" value="switch-to-comfort-class">
          <label for="switch-to-comfort-class" class="point__offers-label">
            <span class="point__offer-service">Switch to comfort class</span> + €<span class="point__offer-price">100</span>
          </label>

          <input class="point__offers-input visually-hidden" type="checkbox" id="add-meal" name="offer" value="add-meal">
          <label for="add-meal" class="point__offers-label">
            <span class="point__offer-service">Add meal </span> + €<span class="point__offer-price">15</span>
          </label>

          <input class="point__offers-input visually-hidden" type="checkbox" id="choose-seats" name="offer" value="choose-seats">
          <label for="choose-seats" class="point__offers-label">
            <span class="point__offer-service">Choose seats</span> + €<span class="point__offer-price">5</span>
          </label>
        </div>

      </section>
      <section class="point__destination">
        <h3 class="point__details-title">Destination</h3>
        <p class="point__destination-text">${travel.description ? travel.description : ` `}</p>
        <div class="point__destination-images">
          ${travel.pictures ? generatePictures(travel.pictures) : ` `}
        </div>
      </section>
      <input type="hidden" class="point__total-price" name="total-price" value="">
    </section>
  </form>`;

export {basicTravelPointTemplate, extendedTravelPointTemplate};
