import {trips} from './trip/../main';
import {getNewTasks} from './trip/helpers';

const filterWrapper = document.querySelector(`.trip-filter`);

const filters = [
  {className: `everything`, name: `EVERYTHING`, check: 1},
  {className: `future`, name: `FUTURE`, check: 0},
  {className: `past`, name: `PAST`, check: 0}
];

const activeFilterClass = `trip-filter__item--active`;

const filterClickHandler = (evt) => {
  evt.preventDefault();

  const checkboxes = document.querySelectorAll(`.trip-filter input`);
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].classList.remove(activeFilterClass);
  }
  evt.target.classList.add(activeFilterClass);

  trips.unrender();
  let newTrips = getNewTasks();
  newTrips.render();
};

const drawFilter = (filterClass, name) => {
  const filterInput = document.createElement(`input`);
  const labelTemplate = `<label class="trip-filter__item" for="filter-${filterClass}">${name}</label>`;
  filterInput.type = `radio`;
  filterInput.id = `filter-${filterClass}`;
  filterInput.name = `filter`;
  filterInput.value = `${filterClass}`;
  filterInput.addEventListener(`click`, filterClickHandler);
  filterWrapper.appendChild(filterInput);
  filterWrapper.insertAdjacentHTML(`beforeend`, labelTemplate);
};

const drawAllFilters = () => {
  filters.forEach((element) => {
    drawFilter(element.className, element.name);
  });
  filterWrapper.firstElementChild.checked = true;
  filterWrapper.firstElementChild.classList.add(activeFilterClass);
};

export default drawAllFilters;
