class State {
  constructor() {
    this._stateTrips = {};
    this._stateOpenedTrips = [];
  }

  get trips() {
    return this._stateTrips;
  }

  get openedTrips() {
    return this._stateOpenedTrips;
  }

  setStateOfTrips(instance) {
    this._stateTrips = instance;
  }

  setOpenedTrips(instance) {
    this._stateOpenedTrips.push(instance);
  }

  clear() {
    this._stateTrips = null;
    this._stateOpenedTrips = [];
  }
}

export const state = new State();
