import {state} from '../state';
import {sortTrips} from './sorting-service';
import SortingPanel from './sorting-panel';
import {trips} from './../main';

const sortingPanelWrapper = document.querySelector(`.main`);

class SortingPanelContainer {
  constructor(array) {
    this._array = array;
  }

  init() {
    const sortingPanel = new SortingPanel();
    sortingPanelWrapper.insertBefore(sortingPanel.render(), sortingPanelWrapper.firstChild);

    sortingPanel.onChange = () => {
      const dataToSort = state.filteredTrips.length ? state.filteredTrips : state.data;
      const sortedData = sortTrips(dataToSort, sortingPanel.activeSort);
      trips.remove();
      trips.update(sortedData);
      if (sortingPanel.activeSort === `sorting-event`) {
        trips.init();
      } else {
        trips.initAllTrips(sortedData);
      }
    };
  }
}

export default SortingPanelContainer;
