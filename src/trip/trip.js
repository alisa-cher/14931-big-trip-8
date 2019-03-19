import {state} from './state';
import {basicTravelPointTemplate} from './trip-template';
import {tripWrapper} from './helpers';
import Component from './component';
import OpenedTripPoint from './trip-opened';

class TripPoint extends Component {
  constructor(data) {
    super(data);
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
    super.render(`trip-point`);
  }

  bind() {
    this._element.addEventListener(`click`, this._onTripPanelClick.bind(this));
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onTripPanelClick.bind(this));
  }
}

export default TripPoint;
