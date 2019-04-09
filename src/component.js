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

  render(element) {
    this._element = document.createElement(element);
    this._element.innerHTML = this.template;
    this.bind();
    return this._element;
  }

  update(data) {
    this._data = data;
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
