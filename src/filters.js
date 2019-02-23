import {randomInteger} from './helpers';
import drawTravelPointPanels, {tripWrapper} from './trip-point';

const filterWrapper = document.querySelector(`.trip-filter`);

const filters = [
  {className: `everything`, name: `EVERYTHING`, check: 1},
  {className: `future`, name: `FUTURE`, check: 0},
  {className: `past`, name: `PAST`, check: 0}
];

const filterClickHandler = (evt) => {
  evt.preventDefault();
  while (tripWrapper.firstChild) {
    tripWrapper.removeChild(tripWrapper.firstChild);
  }
  drawTravelPointPanels(randomInteger(1, 10));
};

const drawFilter = (filterClass, name, check) => {
  const filterInput = document.createElement(`input`);
  const labelTemplate = `<label class="trip-filter__item" for="filter-${filterClass}">${name}</label>`;
  filterInput.type = `radio`;
  filterInput.id = `filter-${filterClass}`;
  filterInput.name = `filter`;
  filterInput.value = `${filterClass}`;
  filterInput.checked = check;
  filterInput.addEventListener(`click`, filterClickHandler);
  filterWrapper.appendChild(filterInput);
  filterWrapper.insertAdjacentHTML(`beforeend`, labelTemplate);
};

const drawAllFilters = () => {
  for (let i = 0; i < filters.length; i++) {
    drawFilter(filters[i].className, filters[i].name, filters[i].check);
  }
};

export default drawAllFilters;
