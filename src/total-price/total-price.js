import Component from './../component';
import {calcTripPointsPrices} from './total-price-service';

class TotalPrice extends Component {
  constructor(data) {
    super();
    this._data = calcTripPointsPrices(data);
  }

  get template() {
    return `Total: <span class="trip__total-cost">€ ${this._data}</span>`;
  }

  set onUpdate(fn) {
    this._onUpdate = fn;
  }

  _onUpdate() {
    if (typeof this._onDelete === `function`) {
      this._onUpdate();
    }
  }

  render() {
    super.render(`p`);
    this._element.classList.add(`trip__total`);
    return this._element;
  }
}

export default TotalPrice;

