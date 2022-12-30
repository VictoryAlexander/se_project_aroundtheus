import "./index.css";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {FormValidator} from "../components/FormValidator.js";
import {initialCards, validationSettings, selectors} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

const userInfo = new UserInfo({
  userNameSelector: selectors.profileName,
  userJobSelector: selectors.profileDescription
});

const renderCard = (item) => {
  const card = new Card(
    item, {
    handleCardClick: () => {
      imagePopup.open(item);
    }
  }, selectors.cardTemplate);
  const cardElement = card.getView();
  cardRenderer.addItem(cardElement);
}

const cardRenderer = new Section({
    renderer: renderCard,
  },
  selectors.cardList
);

const imagePopup = new PopupWithImage(selectors.previewImage);

const editForm = new PopupWithForm({ 
  popupSelector: selectors.editPopup, 
  handleFormSubmit: (values) => {
    userInfo.setUserInfo(values);
    editForm.close();
    editFormValidator.toggleButtonState();
  }
});
const addForm = new PopupWithForm({
  popupSelector: selectors.addPopup, 
  handleFormSubmit: (item) => {
    renderCard(item);
    addForm.close();
    addFormValidator.toggleButtonState();
  }
});

const editFormValidator = new FormValidator(validationSettings, selectors.editFormElement);
const addFormValidator = new FormValidator(validationSettings, selectors.addFormElement);

cardRenderer.renderItems(initialCards.reverse());
editFormValidator.enableValidation();
addFormValidator.enableValidation();

const editProfileButton = document.querySelector(".profile__info-button");
const addPopupButton = document.querySelector(".profile__button");
const profileNameInput = document.querySelector("#name");
const profileAboutInput = document.querySelector("#description");

function fillProfileForm() {
  const profileInfo = userInfo.getUserInfo();
  profileNameInput.value = profileInfo.name;
  profileAboutInput.value = profileInfo.about;
}

editProfileButton.addEventListener("click", () => {
  fillProfileForm();
  
  editForm.open();
});
addPopupButton.addEventListener("click", () => addForm.open());