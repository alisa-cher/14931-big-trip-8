export const filterTasks = (allTrips, clickedFilter) => {
  switch (clickedFilter) {
    case `filter-everything`:
      return allTrips;

    case `filter-future`:
      return allTrips.filter((it) => it.time.departure > Date.now());

    case `filter-past`:
      return allTrips.filter((it) => it.time.departure < Date.now());
  }
  return allTrips;
};
