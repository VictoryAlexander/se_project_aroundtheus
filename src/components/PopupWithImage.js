import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._previewImage = this._popupElement.querySelector(".modal-preview-image");
    this._imageCaption = this._popupElement.querySelector(".modal-preview-description");
  }

  open({ name, link }) {
    this._previewImage.src = link;
    this._previewImage.alt = name;
    this._imageCaption.textContent = name;
    super.open();
  }
}

export default PopupWithImage;