import {disableNewEventButton, unlockNewEventButton} from './new-event';

const menuItemElements = document.querySelectorAll(`.view-switch__item`);
const activeMenuItemClass = `view-switch__item--active`;
const tableWrapperElement = document.querySelector(`#table`);
const statisticsWrapperElement = document.querySelector(`#stats`);

const hideElement = (element) => element.classList.add(`visually-hidden`);

const showElement = (element) => element.classList.remove(`visually-hidden`);

const removeActiveMenuClass = () => document.querySelector(`.${activeMenuItemClass}`).classList.remove(activeMenuItemClass);

const addActiveMenuClassToClickedElement = (element) => element.classList.add(activeMenuItemClass);

const isStatisticsMenuItem = (element) => element.classList.contains(`view-switch__item--stats`);

const handleMenuElementClick = (evt, cb, anotherCb) => {
  removeActiveMenuClass();
  addActiveMenuClassToClickedElement(evt.target);

  if (isStatisticsMenuItem(evt.target)) {
    cb();
    disableNewEventButton();
    hideElement(tableWrapperElement);
    showElement(statisticsWrapperElement);
  } else {
    anotherCb();
    unlockNewEventButton();
    hideElement(statisticsWrapperElement);
    showElement(tableWrapperElement);
  }
};

export const bindMenuEvents = (cb, anotherCb) => {
  for (let item of menuItemElements) {
    item.addEventListener(`click`, (evt) => handleMenuElementClick(evt, cb, anotherCb));
  }
};
