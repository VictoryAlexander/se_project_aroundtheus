import Card from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import {outsideCloseModal, escCloseModal, openModal, closeModal} from "./utils.js";
import {initialCards, validationSettings} from "./constants.js";

const closeButtons = document.querySelectorAll(".modal__close-button");
const profileNameInput = document.querySelector(".modal__container-input_name");
const profileDescriptionInput = document.querySelector(".modal__container-input_description");
const editProfilePopup = document.querySelector("#editModal");
const addPopup = document.querySelector("#addModal");
const profileName = document.querySelector(".profile__info-name");
const profileDescription = document.querySelector(".profile__info-description");
const cardList = document.querySelector(".cards__list");
const editFormElement = editProfilePopup.querySelector(".modal__container");
const addFormElement = addPopup.querySelector(".modal__container");

const editFormValidator = new FormValidator(validationSettings, editFormElement);
const addFormValidator = new FormValidator(validationSettings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

function renderCard(data) {
  const cardTemplate = "#card-template";
  const cardElement = new Card(data, cardTemplate);
  cardList.prepend(cardElement.getView());
}

initialCards.forEach(renderCard);

function fillProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

const editProfileButton = document.querySelector(".profile__info-button");
const profilePopup = document.querySelector("#edit-profile-form");
const addPopupButton = document.querySelector(".profile__button");
const addCardForm = document.querySelector("#add-card-form");

editProfileButton.addEventListener("click", () => {
  fillProfileForm();
  
  openModal(editProfilePopup);
});
  
profilePopup.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameValue = profileNameInput.value;
  const descriptionValue = profileDescriptionInput.value;
  
  profileName.textContent = nameValue;
  profileDescription.textContent = descriptionValue;
  
  closeModal(editProfilePopup);
});
  
addPopupButton.addEventListener("click", () => openModal(addPopup));
  
addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = event.target.title.value;
  const link = event.target.link.value;
  renderCard({
    name,
    link
  });
  event.target.reset();
  
  closeModal(addPopup);
    
  addFormValidator.toggleButtonState();
});

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});