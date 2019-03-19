import {tripWrapper} from './helpers';

class Component {
  constructor(data) {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }
    this._data = data;
    this._element = null;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  render(className) {
    this._element = document.createElement(`article`);
    this._element.classList.add(className);
    this._element.innerHTML = this.template;
    tripWrapper.appendChild(this._element);
    this.bind();
    return this._element;
  }

  bind() {
    throw new Error(`You have to need to define bind method.`);
  }

  unbind() {
    throw new Error(`You have to need to define unbind method.`);
  }

  unrender() {
    if (this._element) {
      this.unbind();
      this._element = null;
    }
  }
}

export default Component;
