class State {
  constructor() {
    this._stateTrips = [];
    this._stateOpenedTrips = [];
    this._stateData = [];
    this._filters = {};
  }

  get data() {
    return this._stateData;
  }

  setData(array) {
    this._stateData = array;
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
