const transportTypes = [`taxi`, `bus`, `train`, `flight`, `ship`];
const travelTypes = [...transportTypes, `Check-in`, `Sightseeing`];

const travelIcons = {
  'taxi': `🚕`,
  'bus': `🚌`,
  'train': `🚂`,
  'ship': `🛳`,
  'transport': `🚊`,
  'drive': `🚗`,
  'flight': `✈`,
  'check-in': `🏨`,
  'sightseeing': `🏛`,
  'restaurant': `🍴`,
};

export {travelIcons, travelTypes, transportTypes};
