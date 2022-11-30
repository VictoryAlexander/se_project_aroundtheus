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

const editProfileButton = document.querySelector(".profile__info-button");
const editProfilePopup = document.querySelector("#editModal");
const profilePopup = document.querySelector("#edit-profile-form");
const profileName = document.querySelector(".profile__info-name");
const profileDescription = document.querySelector(".profile__info-description");
const profileNameInput = document.querySelector(".modal__container-input_name");
const profileDescriptionInput = document.querySelector(".modal__container-input_description");

const cardList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;

const addPopup = document.querySelector("#addModal");
const addPopupButton = document.querySelector(".profile__button");
const addCardForm = document.querySelector("#add-card-form");

const previewImageModalWindow = document.querySelector("#imageModal");
const previewImageElement = document.querySelector(".modal-preview-image");
const previewImageElementDescription = document.querySelector(".modal-preview-description");

const closeButtons = document.querySelectorAll(".modal__close-button");

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

function createCard(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const imageElement = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__tab-title");
    const cardLikeButton = cardElement.querySelector(".card__tab-button");
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");
    imageElement.src = data.link;
    imageElement.alt = data.name;
    cardTitle.textContent = data.name;
    cardLikeButton.addEventListener("click", () => {
      cardLikeButton.classList.toggle("card__tab-button_filled");
    });
    cardDeleteButton.addEventListener("click", () => {
      cardElement.remove();
    });
    imageElement.addEventListener("click", () => {
      previewImageElement.src = data.link;
      previewImageElement.alt = data.name;
      previewImageElementDescription.textContent = data.name;
      openModal(previewImageModalWindow);
    });
    
    return cardElement;
};


function renderCard(data) {
    const cardElement = createCard(data);
    cardList.prepend(cardElement);
};

function fillProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

initialCards.forEach(renderCard);

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

editProfileButton.addEventListener("click", () => {
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

addPopupButton.addEventListener("click", () => {
  openModal(addPopup);
});

addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = event.target.title.value;
  const link = event.target.link.value;
  const inputElements = document.querySelectorAll(config.inputSelector);
  renderCard({
    name,
    link
  });
  event.target.reset();

  closeModal(addPopup);
  enableValidation(config);
});
