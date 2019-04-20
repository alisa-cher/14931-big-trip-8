import {groupTripsByDay} from './trip/trip-day-service';

class State {
  constructor() {
    this._stateTrips = [];
    this._stateOpenedTrips = [];
    this._stateData = [];
    this._destinations = [];
    this._filters = {};
    this._offers = {};
    this._filteredTrips = [];
    this._totalPriceInstance = null;
    this._tripDates = [];
  }

  get data() {
    return this._stateData;
  }

  setData(array) {
    this._stateData = array;
  }

  setTripDates(array) {
    this._tripDates = Object.keys(groupTripsByDay(array));
  }

  get tripDates() {
    return this._tripDates;
  }

  setTotalPriceInstance(obj) {
    this._totalPriceInstance = obj;
  }

  get totalPriceInstance() {
    return this._totalPriceInstance;
  }

  setFilteredTrips(array) {
    this._filteredTrips = array;
  }

  get filteredTrips() {
    return this._filteredTrips;
  }

  setDestinations(array) {
    this._destinations = array;
  }

  setOffers(offers) {
    this._offers = offers;
  }

  get destinations() {
    return this._destinations;
  }

  get offers() {
    return this._offers;
  }

  get trips() {
    return this._stateTrips;
  }

  get openedTrips() {
    return this._stateOpenedTrips;
  }

  setTrips(instance) {
    this._stateTrips.push(instance);
  }

  setOpenedTrips(instance) {
    this._stateOpenedTrips.push(instance);
  }

  setFilters(instance) {
    this._filters = instance;
  }

  get filters() {
    return this._filters;
  }

  clear() {
    this._stateTrips = [];
    this._stateOpenedTrips = [];
  }
}

export const state = new State();
