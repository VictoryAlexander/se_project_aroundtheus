import Popup from "./Popup.js";

class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    
    this._popupForm = this._popupElement.querySelector(".modal__container");
  }

  _onSubmit = (event) => {
    event.preventDefault();
    this._handleFormSubmit();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._onSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._popupForm.removeEventListener("submit", this._onSubmit);
  }

  close() {
    this._popupForm.reset();

    super.close();
  }
}

export default PopupWithConfirm;