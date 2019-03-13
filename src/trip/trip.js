import {state} from './state';
import {basicTravelPointTemplate} from './trip-template';
import {tripWrapper} from './helpers';
import OpenedTripPoint from './trip-opened';

class TripPoint {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  get template() {
    return basicTravelPointTemplate(this._data);
  }

  _onTripPanelClick() {
    const openedTrip = new OpenedTripPoint(this._data);
    openedTrip.render();
    tripWrapper.replaceChild(openedTrip._element, this._element);
    this.unrender();
    state.setOpenedTrips(openedTrip);
  }

  render() {
    this._element = document.createElement(`article`);
    this._element.classList.add(`trip-point`);
    this._element.innerHTML = this.template;
    tripWrapper.appendChild(this._element);
    this.bind();
    return this._element;
  }

  bind() {
    this._element.addEventListener(`click`, this._onTripPanelClick.bind(this));
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onTripPanelClick.bind(this));
  }

  unrender() {
    if (this._element) {
      this.unbind();
      this._element = null;
    }
  }
}

export default TripPoint;
