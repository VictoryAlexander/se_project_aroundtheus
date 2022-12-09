import {outsideCloseModal, escCloseModal, openModal, closeModal} from "./utils.js";

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", this._handleLikeButton);
    this._cardDeleteButton.addEventListener("click", this._handleDeleteButton);
    this._imageElement.addEventListener("click", this._handlePreviewImage);
  }

  _handleLikeButton = () => {
    this._cardLikeButton.classList.toggle("card__tab-button_filled");
  }

  _handleDeleteButton = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handlePreviewImage = () => {
    this._previewImageElement = document.querySelector(".modal-preview-image");
    this._previewImageElement.src = this._link;
    this._previewImageElement.alt = this._name;
    this._previewImageElementDescription = document.querySelector(".modal-preview-description");
    this._previewImageElementDescription.textContent = this._name;
    this._previewImageModalWindow = document.querySelector("#imageModal");
    openModal(this._previewImageModalWindow);
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardLikeButton = this._cardElement.querySelector(".card__tab-button");
    this._imageElement = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__tab-title");
    this._cardDeleteButton = this._cardElement.querySelector(".card__delete-button");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    cardTitle.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }

}

export default Card;