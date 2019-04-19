export class ModelTrip {
  constructor(data) {
    this.id = data[`id`];
    this.isFavorite = data[`is_favorite`];
    this.travelType = data[`type`];
    this.time = {};
    this.time.departure = data[`date_from`];
    this.time.arrival = data[`date_to`];
    this.destination = {};
    this.destination.name = data[`destination`][`name`];
    this.destination.description = data[`destination`][`description`];
    this.destination.pictures = data[`destination`][`pictures`].map((picture) => picture);
    this.price = data[`base_price`];
    this.offers = data[`offers`];
  }
  
  static copy(data) {
    return {
      id: data.id,
      isFavorite: data.isFavorite,
      travelType: data.travelType,
      time: {
        departure: data.time.departure,
        arrival: data.time.arrival,
      },
      destination: {
        name: data.destination.name,
        description: data.destination.description,
        pictures: data.destination.pictures.map((picture) => picture),
      },
      price: data.price,
      offers: data.offers.map((offer) => ({
        title: offer.title,
        price: offer.price,
        accepted: offer.accepted
      }))
    };
  }

  static toRAW(data) {
    return {
      'id': data.id,
      'is_favorite': data.isFavorite,
      'type': data.travelType,
      'date_from': data.time.departure,
      'date_to': data.time.arrival,
      'destination': data.destination,
      'offers': data.offers,
      'base_price': data.price,
    };
  }

  static parseTrip(data) {
    return new ModelTrip(data);
  }

  static parseTrips(data) {
    return data.map(ModelTrip.parseTrip);
  }
}
