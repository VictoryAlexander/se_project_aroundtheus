import Card from "./Card.js";
import {FormValidator, validationSettings} from "./FormValidator.js";
const profileNameInput = document.querySelector(".modal__container-input_name");
const profileDescriptionInput = document.querySelector(".modal__container-input_description");
const editProfilePopup = document.querySelector("#editModal");
const addPopup = document.querySelector("#addModal");
const profileName = document.querySelector(".profile__info-name");
const profileDescription = document.querySelector(".profile__info-description");

const addFormElement = addPopup.querySelector(".modal__container");
const addFormValidator = new FormValidator(validationSettings, addFormElement);

function renderCard(data) {
  const cardList = document.querySelector(".cards__list");
  const cardTemplate = "#card-template";
  const cardElement = new Card(data, cardTemplate);
  cardList.prepend(cardElement.getView());
};

function outsideCloseModal(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.target);
  };
};
  
function escCloseModal(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closeModal(openedPopup);
  };
};
  
function openModal(popup) {
  popup.classList.add("modal_opened");
  
  popup.addEventListener("mousedown", outsideCloseModal);
  document.addEventListener("keyup", escCloseModal);
};
  
function closeModal(popup) {
  popup.classList.remove("modal_opened");
  
  popup.removeEventListener("mousedown", outsideCloseModal);
  document.removeEventListener("keyup", escCloseModal);
};

function fillProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function setEventHandlers() {
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
    
    const cardFormSubmitButton = document.querySelector("#create");
    addFormValidator.toggleButtonState(cardFormSubmitButton);
  });

}

export {setEventHandlers, outsideCloseModal, escCloseModal, openModal, closeModal, renderCard, editProfilePopup, addPopup, addFormValidator};