import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, loadingButtonText }) {
    super(popupSelector);
    
    this._popupForm = this._popupElement.querySelector(".modal__container");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = [...this._popupForm.querySelectorAll(".modal__container-input")];
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

  _onSubmit = (event) => {
    event.preventDefault();
    const inputValues = this._getInputValues();
    this._handleFormSubmit(inputValues);
  }

  _getInputValues() {
    const inputValues = {};

    for (const input of this._inputList) {
      inputValues[input.name] = input.value;
    }
    return inputValues;
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

export default PopupWithForm;