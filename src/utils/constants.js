const validationSettings = {
  inputSelector: ".modal__container-input",
  submitButtonSelector: ".modal__container-button",
  inactiveButtonClass: "modal__container-button_disabled",
  inputErrorClass: "modal__container-input_type_error",
};

const selectors = {
  cardTemplate: "#card-template",
  cardList: ".cards__list",
  editPopup: "#editModal",
  addPopup: "#addModal",
  deleteCardPopup: "#deleteCardModal",
  profileName: ".profile__info-name",
  profileDescription: ".profile__info-description",
  profileImage: ".profile__image",
  editFormElement: "#edit-profile-form",
  addFormElement: "#add-card-form",
  changeFormElement: "#change-image-form",
  previewImage: "#imageModal",
  changeImagePopup: "#change-image-modal"
}

export {validationSettings, selectors};