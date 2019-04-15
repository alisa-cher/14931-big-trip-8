export class ModelDestination {
  constructor(data) {
    this.destination = {};
    this.destination.name = data[`name`];
    this.destination.description = data[`description`];
    this.destination.pictures = data[`pictures`].map((picture) => picture);
  }

  static parseDestination(data) {
    return new ModelDestination(data);
  }

  static parseDestinations(data) {
    return data.map(ModelDestination.parseDestination);
  }
}

