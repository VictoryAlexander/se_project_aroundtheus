class Card {
  constructor( data, { handleCardClick }, cardSelector ) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", this._handleLikeButton);
    this._cardDeleteButton.addEventListener("click", this._handleDeleteButton);
    this._imageElement.addEventListener("click", this._handleCardClick);
  }

  _handleLikeButton = () => {
    this._cardLikeButton.classList.toggle("card__tab-button_filled");
  }

  _handleDeleteButton = () => {
    this._cardElement.remove();
    this._cardElement = null;
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