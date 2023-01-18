import "./index.css";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {FormValidator} from "../components/FormValidator.js";
import {validationSettings, selectors} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../utils/Api.js";
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

const confirmForm = new PopupWithConfirm(selectors.deleteCardPopup, "Deleting...");

const createCard = (item) => {
  const card = new Card(
    item, {
    handleCardClick: () => {
      imagePopup.open(item);
    },
    handleDeleteClick: () => {
      const cardId = card.getId();
      confirmForm.open();
      confirmForm.setSubmitCallback(() => {
        confirmForm.showLoading();
        api
          .deleteCard(cardId)
          .then(() => {
            card.handleDeleteButton();
            confirmForm.close();
          })
          .catch((err) => console.log(err))
          .finally(() => {
            confirmForm.hideLoading();
          })
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
          .catch((err) => console.log(err));
      } else {
        api
          .addLike(cardId)
          .then((res) => {
            card.updateLikes(res.likes);
          })
          .catch((err) => console.log(err));
      }
    }
  }, 
    selectors.cardTemplate,
    userId
  );
  return card.getView();
}

api
  .getAppInfo()
  .then(([userRes, cardRes]) => {
    userInfo.setUserInfo({
      name: userRes.name,
      about: userRes.about
    });
    userInfo.setImage(userRes.avatar);
    userId = userRes._id;
    cardRes.reverse();
    cardSection = new Section({
      items: cardRes,
      renderer: (data) => {
        const cardElement = createCard(data);
        cardSection.addItem(cardElement);
      }
    },
    selectors.cardList
    )
    cardSection.renderItems();
  })
  .catch((err) => console.log(err))

function renderCard(data) {
  const newCard = createCard(data);
  cardSection.addItem(newCard);
}

const imagePopup = new PopupWithImage(selectors.previewImage);

const editForm = new PopupWithForm({ 
  popupSelector: selectors.editPopup,
  handleFormSubmit: (values) => {
    editForm.showLoading();
    api
      .editProfile(values)
      .then(() => {
        userInfo.setUserInfo(values);
        editForm.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        editForm.hideLoading();
      })
  },
  loadingButtonText: "Saving..."
});
const addForm = new PopupWithForm({
  popupSelector: selectors.addPopup,
  handleFormSubmit: (item) => {
    addForm.showLoading();
    api
      .addCard(item)
      .then((res) => {
        renderCard(res);
        addForm.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        addForm.hideLoading();
      })
  },
  loadingButtonText: "Saving..."
});

const changeImageForm = new PopupWithForm({
  popupSelector: selectors.changeImagePopup,
  handleFormSubmit: (item) => {
    changeImageForm.showLoading()
    api
      .updateImage(item) 
      .then(() => {
        userInfo.setImage(item);
        changeImageForm.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        changeImageForm.hideLoading();
      })
  },
  loadingButtonText: "Saving..."
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

function fillProfileForm() {
  const profileInfo = userInfo.getUserInfo();
  profileNameInput.value = profileInfo.name;
  profileAboutInput.value = profileInfo.about;
}

function fillAvatarForm() {
  const avatarInfo = userInfo.getAvatar();
  profileImageInput.value = avatarInfo.image;
}

editProfileButton.addEventListener("click", () => {
  fillProfileForm();
  editFormValidator.toggleButtonState();
  editForm.open();
});
addPopupButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  addForm.open()
});

changeProfileImageButton.addEventListener("click", () => {
  fillAvatarForm();
  changeFormValidator.toggleButtonState();
  changeImageForm.open();
});