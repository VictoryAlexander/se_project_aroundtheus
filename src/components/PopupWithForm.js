import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    
    this._popupForm = this._popupElement.querySelector(".modal__container");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    return {
      nameValue: this._popupForm.querySelector(".modal__container-input_name").value,
      descriptionValue: this._popupForm.querySelector(".modal__container-input_description").value
    }
  }

  setEventListeners() {
    super.setEventListeners();
    const formCloseButton = this._popupForm.querySelector(".modal__close-button");
    
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
    formCloseButton.addEventListener("click", this.close);
  }

  close() {
    this._popupForm.reset();

    super.close();
  }
}

export default PopupWithForm;