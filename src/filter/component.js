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

  get element() {
    return this._element;
  }

  render(wrapper) {
    this._element = document.createElement(`form`);
    this._element.classList.add(`trip-filter`);
    this._element.innerHTML = this.template;
    this._element.firstElementChild.checked = true;
    wrapper.appendChild(this._element);
    this.bind();
    return this._element;
  }

  bind() {}

  unbind() {}

  unrender() {
    if (this._element) {
      this.unbind();
      this._element = null;
    }
  }
}

export default Component;
