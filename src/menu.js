import {moneyChart, transportChart, timeChart} from './main';
import {state} from './trip/state';
import {moneyChartLabels, moneyChartData, transportChartData, transportChartLabels, timeChartData, timeChartLabels} from './statistics/filter-service';
const menuItemElements = document.querySelectorAll(`.view-switch__item`);
const activeMenuItemClass = `view-switch__item--active`;
const tableWrapperElement = document.querySelector(`#table`);
const statisticsWrapperElement = document.querySelector(`#stats`);

const onMenuElementClick = (evt) => {
  document.querySelector(`.${activeMenuItemClass}`).classList.remove(activeMenuItemClass);
  evt.target.classList.add(activeMenuItemClass);

  if (evt.target.classList.contains(`view-switch__item--stats`)) {

    const filterEmptyData = (arr) => arr.filter((item) => item !== null);
    const updatedData = filterEmptyData(state.data);

    moneyChart.update(moneyChartLabels(updatedData), moneyChartData(updatedData));
    transportChart.update(transportChartLabels(updatedData), transportChartData(updatedData));
    timeChart.update(timeChartLabels(updatedData), timeChartData(updatedData));

    tableWrapperElement.classList.add(`visually-hidden`);
    statisticsWrapperElement.classList.remove(`visually-hidden`);
  } else {
    statisticsWrapperElement.classList.add(`visually-hidden`);
    tableWrapperElement.classList.remove(`visually-hidden`);
  }

};

export const bindMenuEvents = () => {
  for (let item of menuItemElements) {
    item.addEventListener(`click`, onMenuElementClick);
  }
};
