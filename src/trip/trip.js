import {basicTravelPointTemplate} from './trip-template';
import Component from './../component';

class TripPoint extends Component {
  constructor(data) {
    super(data);
  }

  get template() {
    return basicTravelPointTemplate(this._data);
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  _onTripPanelClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  render() {
    super.render(`article`);
    this._element.classList.add(`trip-point`);
    return this._element;
  }

  bind() {
    this._element.addEventListener(`click`, this._onTripPanelClick.bind(this));
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onTripPanelClick.bind(this));
  }
}

export default TripPoint;
