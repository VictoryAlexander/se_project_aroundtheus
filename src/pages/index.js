import "./index.css";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {FormValidator} from "../components/FormValidator.js";
import {initialCards, validationSettings, cardList} from "../components/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

const closeButtons = document.querySelectorAll(".modal__close-button");
const profileNameInput = document.querySelector(".modal__container-input_name");
const profileDescriptionInput = document.querySelector(".modal__container-input_description");
//const editProfilePopup = document.querySelector("#editModal");
const editPopup = "editModal";
//const addPopup = document.querySelector("#addModal");
const addPopup = "addModal";
const profileName = "profile__info-name"; //use this
const profileDescription = "profile__info-description"; //use this
const editFormElement = "edit-profile-form";
const addFormElement = "add-card-form";
const previewImage = "imageModal";

const userInfo = new UserInfo({
  userNameSelector: profileName,
  userJobSelector: profileDescription
});

const cardRenderer = new Section({
    renderer: (item) => {
      const cardTemplate = "#card-template";
      const card = new Card(
        item,
        {handleCardClick: () => {
          imagePopup.open(item);
        }
      }, cardTemplate);
      const cardElement = card.getView();
      cardRenderer.addItem(cardElement);
    }
  },
  cardList
);

const imagePopup = new PopupWithImage(previewImage);

/*const editForm = new PopupWithForm({ 
  popupSelector: editPopup, 
  handleFormSubmit: () => {
    userInfo.setUserInfo();
  }
});*/
const addForm = new PopupWithForm({
  popupSelector: addPopup, 
  handleFormSubmit: (item) =>{
    const cardTemplate = "#card-template";
    const card = new Card(
      item,
      {handleCardClick: () => {
        imagePopup.open(item);
      }
    }, cardTemplate);
    const cardElement = card.getView();
    cardRenderer.addItem(cardElement);
  }
});

const editFormValidator = new FormValidator(validationSettings, editFormElement);
const addFormValidator = new FormValidator(validationSettings, addFormElement);

imagePopup.setEventListeners();
//editForm.setEventListeners();
addForm.setEventListeners();

cardRenderer.renderItems(initialCards);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

/*function fillProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}*/

const editProfileButton = document.querySelector(".profile__info-button");
const profilePopup = document.querySelector("#edit-profile-form");
const addPopupButton = document.querySelector(".profile__button");
const addCardForm = document.querySelector("#add-card-form");

editProfileButton.addEventListener("click", () => {
  fillProfileForm();
  
  editForm.open();
});
addPopupButton.addEventListener("click", () => addForm.open());