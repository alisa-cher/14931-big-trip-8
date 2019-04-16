import Component from './../component';

class TripComponent extends Component {
  constructor(tripPoint) {
    super();
    this._tripPoint = tripPoint;
  }

  update(data) {
    this._tripPoint = data;
  }
}

export default TripComponent;
