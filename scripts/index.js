import {FormValidator, validationSettings} from "./FormValidator.js";
import {setEventHandlers, outsideCloseModal, escCloseModal, openModal, closeModal, editProfilePopup, renderCard, addFormValidator} from "./utils.js";

const initialCards = [
  {
    name: 'Yosemite Valley',
    link: 'https://images.unsplash.com/photo-1549221838-126dc3ebf29f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1429&q=80'
  },
  {
    name: 'Lake Louise',
    link: 'https://images.unsplash.com/photo-1468437012950-7d4960be6383?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1541&q=80'
  },
  {
    name: 'Bald Mountains',
    link: 'https://images.unsplash.com/photo-1641785653036-9e04de2e4015?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2114&q=80'
  },
  {
    name: 'Big Bend',
    link: 'https://images.unsplash.com/photo-1576617839173-7c5960cb568c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80'
  },
  {
    name: 'Grand Canyon',
    link: 'https://images.unsplash.com/photo-1575527048208-6475b441e0a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
  },
  {
    name: 'Crater Lake',
    link: 'https://images.unsplash.com/photo-1465067854253-edf4a67fef86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  }
];

const closeButtons = document.querySelectorAll(".modal__close-button");

const editFormElement = editProfilePopup.querySelector(".modal__container");

const editFormValidator = new FormValidator(validationSettings, editFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

initialCards.forEach(renderCard);

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

setEventHandlers();