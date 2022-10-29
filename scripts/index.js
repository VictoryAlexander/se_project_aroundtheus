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

const editButton = document.querySelector(".profile__info-button");
const profileEdit = document.querySelector(".modal");
const closeButton = document.querySelector(".modal-button");
const editProfile = document.querySelector(".modal__container");
const profileName = document.querySelector(".profile__info-name");
const profileDescription = document.querySelector(".profile__info-description");
const profileNameInput = document.querySelector(".modal__container-name");
const profileDescriptionInput = document.querySelector(".modal__container-description");
const cardList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;


initialCards.forEach(function (data) {
    const cardElement = cardTemplate.cloneNode(true);
    const imageElement = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__tab-title");
    imageElement.src = data.link;
    imageElement.alt = data.name;
    cardTitle.textContent = data.name;
    cardList.appendChild(cardElement);
});


function openModal() {
    profileEdit.classList.add("modal_opened");
}

function closeModal() {
    profileEdit.classList.remove("modal_opened");
}

editButton.addEventListener("click", openModal);

editButton.addEventListener("click", () => {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;

    openModal();
})

closeButton.addEventListener("click", closeModal);

editProfile.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameValue = event.target.name.value;
    const descriptionValue = event.target.description.value;

    profileName.textContent = nameValue;
    profileDescription.textContent = descriptionValue;

    closeModal();
});