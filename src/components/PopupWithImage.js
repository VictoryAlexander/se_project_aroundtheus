import Popup from './Popup.js';

class PopupWithImage extends Popup {
  open({ name, link }) {
    const previewImage = this._popupElement.querySelector(".modal-preview-image");
    previewImage.src = link;
    previewImage.alt = name;
    this._popupElement.querySelector(".modal-preview-description").textContent = name;
    super.open();
  }
}

export default PopupWithImage;