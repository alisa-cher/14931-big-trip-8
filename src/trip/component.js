import Component from './../component';

class TripComponent extends Component {
  constructor(tripPoint) {
    super();
    this._tripPoint = tripPoint;
  }

  get tripPointData() {
    return this._tripPoint;
  }

  update(data) {
    this._tripPoint.travelType = data.travelType;
    this._tripPoint.destination.name = data.destination.name;
    this._tripPoint.time.departure = data.time.departure;
    this._tripPoint.time.arrival = data.time.arrival;
    this._tripPoint.price = data.price;
  }
}

export default TripComponent;
