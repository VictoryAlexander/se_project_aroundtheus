import "./index.css";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {FormValidator} from "../components/FormValidator.js";
import {initialCards, validationSettings, selectors} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "e670e45b-056f-48c1-a43f-65723fd263c0",
    "Content-Type": "application/json"
  }
});

let cardSection;
let userId;

const userInfo = new UserInfo({
  userNameSelector: selectors.profileName,
  userJobSelector: selectors.profileDescription,
  userImageSelector: selectors.profileImage
});

const confirmForm = new PopupWithConfirm(selectors.deleteCardPopup);

const renderCard = (item) => {
  const card = new Card(
    item, {
    handleCardClick: () => {
      imagePopup.open(item);
    },
    handleDeleteClick: () => {
      const cardId = card.getId();
      confirmForm.open();
      confirmForm._onSubmit(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            card.handleDeleteButton();
            confirmForm.close();
          });
      })
    },
    handleLikeClick: () => {
      const cardId = card.getId();
      if (card.isLiked()) {
        api
          .removeLike(cardId)
          .then((res) => {
            card.updateLikes(res.likes);
          })
      }
    }
  }, 
    selectors.cardTemplate,
    userId
  );
  return card.getView();
}

api
  .getInitialCards()
  .then((res) => {
    cardSection = new Section({
      items: res,
      renderer: (data) => {
        const cardElement = renderCard(data);
        cardSection.addItem(cardElement);
      }
    },
    selectors.cardList
    )
    cardSection.renderItems();
  })

api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo({
      name: res.name,
      about: res.about
    });
    userInfo.setImage(res.avatar);
    userId = res._id;
  })

const imagePopup = new PopupWithImage(selectors.previewImage);

const editForm = new PopupWithForm({ 
  popupSelector: selectors.editPopup,
  handleFormSubmit: (values) => {
    api
      .editProfile(values)
      .then(() => {
        userInfo.setUserInfo(values);
        editForm.close();
        editFormValidator.toggleButtonState();
      })
  }
});
const addForm = new PopupWithForm({
  popupSelector: selectors.addPopup,
  handleFormSubmit: (item) => {
    renderSave(createFormButton, true);
    api
      .addCard(item)
      .then((res) => {
        renderCard(res);
        addForm.close();
        addFormValidator.toggleButtonState();
      });
  }
});

const changeImageForm = new PopupWithForm({
  popupSelector: selectors.changeImagePopup,
  handleFormSubmit: (item) => {
    renderSave(confirmPopupButton, true);
    api
      .updateImage(item) 
      .then(() => {
        userInfo.setImage(item);
        changeImageForm.close();
        changeFormValidator.toggleButtonState();
      })
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
//const editFormButton = document.querySelector("#edit-save");
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