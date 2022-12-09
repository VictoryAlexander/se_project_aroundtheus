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

export {outsideCloseModal, escCloseModal, openModal, closeModal};