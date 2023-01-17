class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach(this._renderer);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;