class Card {
  constructor( data, { handleCardClick, handleDeleteClick, handleLikeClick }, cardSelector, userId ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._cardSelector = cardSelector;
    this._userId = userId;
  }

  getId() {
    return this._id;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", this._handleLikeClick);
    this._cardDeleteButton.addEventListener("click", this._handleDeleteClick);
    this._imageElement.addEventListener("click", this._handleCardClick);
  }

  renderLikes = () => {
    if (this.isLiked()) {
      this._cardLikeButton.classList.add("card__like-button_filled");
    } else {
      this._cardLikeButton.classList.remove("card__like-button_filled");
    }
    this._cardLikes.textContent = this._likes.length;
  }

  updateLikes(likes) {
    this._likes = likes;
    this.renderLikes();
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  handleDeleteButton = () => {
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
    this._cardLikeButton = this._cardElement.querySelector(".card__like-button");
    this._imageElement = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__tab-title");
    this._cardDeleteButton = this._cardElement.querySelector(".card__delete-button");
    this._cardLikes = this._cardElement.querySelector(".card__like-number");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    cardTitle.textContent = this._name;
    this._setEventListeners();
    this.renderLikes();

    if (this._ownerId !== this._userId) {
      this._cardDeleteButton.remove();
    }

    return this._cardElement;
  }

}

export default Card;