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

let editButton = document.querySelector(".profile__info-button");
let profileEdit = document.querySelector(".modal");
let closeButton = document.querySelector(".modal-button");

function openModal() {
    profileEdit.classList.add("modal_opened");
}

function closeModal() {
    profileEdit.classList.remove("modal_opened");
}

editButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);