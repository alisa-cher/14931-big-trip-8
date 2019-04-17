const newEventButtonElement = document.querySelector(`.new-event`);

export const newTripData = () => {
  return {
    travelType: `sightseeing`,
    destination: {
      name: `New destination`,
      description: `Select destination to get description`,
      pictures: [],
    },
    offers: [],
    time: {
      departure: Date.now(),
      arrival: Date.now(),
    },
    price: 0,
    isFavorite: false
  };
};

export const bindNewEventClick = (cb) => {
  newEventButtonElement.addEventListener(`click`, cb);
};
