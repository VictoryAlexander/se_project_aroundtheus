import Popup from "./Popup.js";

class PopupWithConfirm extends Popup {
  constructor(popupSelector, loadingButtonText) {
    super(popupSelector);
    
    this._popupForm = this._popupElement.querySelector(".modal__container");
    this._submitButton = this._popupElement.querySelector(".modal__container-button");
    this._buttonText = this._submitButton.textContent;
    this._loadingButtonText = loadingButtonText;
  }

  showLoading() {
    this._submitButton.textContent = this._loadingButtonText;
  }

  hideLoading() {
    this._submitButton.textContent = this._buttonText;
  }

  setSubmitCallback(event) {
    this._handleFormSubmit = event;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
        event.preventDefault();
        this._handleFormSubmit();
    });
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._popupForm.removeEventListener("submit", this.setSubmitCallback);
  }

  close() {
    this._popupForm.reset();

    super.close();
  }
}

export default PopupWithConfirm;