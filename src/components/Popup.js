class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(`#${popupSelector}`);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    this.setEventListeners;
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    this.removeEventListeners;
  }

  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    };
  }

  _handleShadedClose = (event) => {
    if (event.target === event.currentTarget) {
      this.close();
    };
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", this._handleShadedClose);
    document.addEventListener("keyup", this._handleEscClose);
  }

  removeEventListeners() {
    this._popupElement.removeEventListener("mousedown", this._handleShadedClose);
    document.removeEventListener("keyup", this._handleEscClose);
  }
}

export default Popup;