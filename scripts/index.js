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
const closeButton = editProfilePopup.querySelector(".modal-button");
const profilePopup = document.querySelector("#edit-profile-form");
const profileName = document.querySelector(".profile__info-name");
const profileDescription = document.querySelector(".profile__info-description");
const profileNameInput = document.querySelector(".modal__container-name");
const profileDescriptionInput = document.querySelector(".modal__container-description");

const cardList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;

const addPopup = document.querySelector("#addModal");
const addPopupButton = document.querySelector(".profile__button");
const addPopupCloseButton = addPopup.querySelector(".modal-button");
const addCardForm = document.querySelector("#add-card-form");

const previewImageModalWindow = document.querySelector("#imageModal");
const previewImageModalWindowCloseButton = previewImageModalWindow.querySelector(".modal-button");
const previewImageElement = document.querySelector(".modal-preview-image");
const previewImageElementDescription = document.querySelector(".modal-preview-description");

function openModal(popup) {
  popup.classList.add("modal_opened");
};

function closeModal(popup) {
  popup.classList.remove("modal_opened");
};

function fillButton(){
likeButton.classList.add("card__tab-button_filled");
};

function unFillButton(){
likeButton.classList.remove("card__tab-button_filled");
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

initialCards.forEach(renderCard);

editProfileButton.addEventListener("click", () => {
  openModal(editProfilePopup);
});

function fillProfileForm() {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
}

editProfileButton.addEventListener("click", () => {
    fillProfileForm();

    openModal(editProfilePopup);
});

closeButton.addEventListener("click", () => {
  closeModal(editProfilePopup);
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

addPopupCloseButton.addEventListener("click", () => {
  closeModal(addPopup);
});

addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = event.target.title.value;
  const link = event.target.link.value;
  renderCard({
    name,
    link
  });

  closeModal(addPopup);
});

previewImageModalWindowCloseButton.addEventListener("click", () => {
  closeModal(previewImageModalWindow);
});