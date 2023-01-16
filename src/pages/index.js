import "./index.css";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {FormValidator} from "../components/FormValidator.js";
import {initialCards, validationSettings, selectors} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "e670e45b-056f-48c1-a43f-65723fd263c0",
    "Content-Type": "application/json"
  }
});

const userInfo = new UserInfo({
  userNameSelector: selectors.profileName,
  userJobSelector: selectors.profileDescription,
  userImageSelector: selectors.profileImage
});

const confirmForm = new PopupWithForm({
  popupSelector: selectors.deleteCardPopup,
  handleFormSubmit: () => {
    confirmForm.close(); /* currently does not delete card on submit*/
  }
});

const renderCard = (item) => {
  const card = new Card(
    item, {
    handleCardClick: () => {
      imagePopup.open(item);
    },
    handleDeleteClick: () => {
      confirmForm.open(() => {
        renderSave(confirmPopupButton, true);
        api
          .deleteCard(item._id)
          .then(() => {
            confirmForm.close();
            card.handleDeleteButton();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            renderSave(confirmPopupButton, false);
          })
      });
    },
    handleLikeClick: () => {
      if (card.isLiked()) {
        api
          .removeLike(card._id)
          .then((response) => {
            card.updateLikes(response.likes);
          })
          .catch((err) => console.log(err));
      } else {
        api
          .addLike(card._id)
          .then((response) => {
            card.updateLikes(response.likes);
          })
          .catch((err) => console.log(err));
      }
    }
  }, 
    selectors.cardTemplate,
    userId
  );
  const cardElement = card.getView();
  cardRenderer.addItem(cardElement);
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setImage(userData.image);
    let userId = userData._id;
    const cardRenderer = new Section({
      renderer: renderCard,
    },
      selectors.cardList
    );
    cardRenderer.renderItems(initialCards.reverse());
  })
  .catch((err) => console.log(err));

const imagePopup = new PopupWithImage(selectors.previewImage);

const editForm = new PopupWithForm({ 
  popupSelector: selectors.editPopup,
  handleFormSubmit: (values) => {
    renderSave(editFormButton, true);
    api
      .editProfile(values)
      .then(() => {
        userInfo.setUserInfo(values);
        editForm.close();
        editFormValidator.toggleButtonState();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderSave(editFormButton, false);
      });
  }
});
const addForm = new PopupWithForm({
  popupSelector: selectors.addPopup, 
  handleFormSubmit: (item) => {
    renderSave(createFormButton, true);
    api
      .addCard(item)
      .then(() => {
        renderCard(item);
        addForm.close();
        addFormValidator.toggleButtonState();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderSave(createFormButton, false);
      });
  }
});

const changeImageForm = new PopupWithForm({
  popupSelector: selectors.changeImagePopup,
  handleFormSubmit: (item) => {
    renderSave(confirmPopupButton, true);
    api
      .editProfile(item) //change this later, this doesnt do anything atm
      .then(() => {
        userInfo.setImage(item);
        changeImageForm.close();
        changeFormValidator.toggleButtonState();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderSave(confirmPopupButton, false);
      });
  }
})

const editFormValidator = new FormValidator(validationSettings, selectors.editFormElement);
const addFormValidator = new FormValidator(validationSettings, selectors.addFormElement);
const changeFormValidator = new FormValidator(validationSettings, selectors.changeFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
changeFormValidator.enableValidation();

const editProfileButton = document.querySelector(".profile__info-button");
const addPopupButton = document.querySelector(".profile__button");
const profileNameInput = document.querySelector("#name");
const profileAboutInput = document.querySelector("#description");
const profileImageInput = document.querySelector("#profile-link");
const changeProfileImageButton = document.querySelector(".profile__overlay-button");
const confirmPopupButton = document.querySelector("#confirm-save");
const editFormButton = document.querySelector("#edit-save");
const createFormButton = document.querySelector("#create");

function fillProfileForm() {
  const profileInfo = userInfo.getUserInfo();
  profileNameInput.value = profileInfo.name;
  profileAboutInput.value = profileInfo.about;
  profileImageInput.value = profileInfo.image;
}

function renderSave(button, saving) {
  let initialText = button.textContent;
  if (saving) {
    button.textContent = "Saving...";
  } else {
    button.textContent = initialText;
  }
}

editProfileButton.addEventListener("click", () => {
  fillProfileForm();
  
  editForm.open();
});
addPopupButton.addEventListener("click", () => addForm.open());

changeProfileImageButton.addEventListener("click", () => {
  fillProfileForm();

  changeImageForm.open();
});