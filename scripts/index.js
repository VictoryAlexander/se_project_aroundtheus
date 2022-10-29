const initialCards = [
    {
      name: 'Yosemite Valley',
      link: '../images/yosemite-valley.jpg'
    },
    {
      name: 'Lake Louise',
      link: '../images/lake-louise.jpg'
    },
    {
      name: 'Bald Mountains',
      link: '../images/bald-mountains.jpg'
    },
    {
      name: 'Latemar',
      link: '../images/latemar.jpg'
    },
    {
      name: 'Vanoise National Park',
      link: '../images/vanoise-national-park.jpg'
    },
    {
      name: 'Lago di Braies',
      link: '../images/lago-di-braies.jpg'
    }
];

const editProfileButton = document.querySelector(".profile__info-button");
const editProfilePopup = document.querySelector(".modal");
const closeButton = document.querySelector(".modal-button");
const profilePopup = document.querySelector(".modal__container");
const profileName = document.querySelector(".profile__info-name");
const profileDescription = document.querySelector(".profile__info-description");
const profileNameInput = document.querySelector(".modal__container-name");
const profileDescriptionInput = document.querySelector(".modal__container-description");

const cardList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;

function createCard(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const imageElement = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__tab-title");
    imageElement.src = data.link;
    imageElement.alt = data.name;
    cardTitle.textContent = data.name;
    return cardElement;
};

function renderCard(data) {
    const cardElement = createCard(data);
    cardList.prepend(cardElement);
}

initialCards.forEach(renderCard);

function openModal() {
    editProfilePopup.classList.add("modal_opened");
}

function closeModal() {
    editProfilePopup.classList.remove("modal_opened");
}

editProfileButton.addEventListener("click", openModal);

function fillProfileForm() {
    profileDescriptionInput.value = profileDescription.textContent;
}

editProfileButton.addEventListener("click", () => {
    profileNameInput.value = profileName.textContent;
    fillProfileForm();

    openModal();
})

closeButton.addEventListener("click", closeModal);

profilePopup.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameValue = profileNameInput.value;
    const descriptionValue = profileDescriptionInput.value;

    profileName.textContent = nameValue;
    profileDescription.textContent = descriptionValue;

    closeModal();
});