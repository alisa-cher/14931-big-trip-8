import Component from './../component';

class TotalPrice extends Component {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return `Total: <span class="trip__total-cost">€ ${this._data}</span>`;
  }

  render() {
    super.render(`p`);
    this._element.classList.add(`trip__total`);
    return this._element;
  }
}

export default TotalPrice;

