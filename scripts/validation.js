const config = {
    formSelector: ".modal__container",
    inputSelector: ".modal__container-input",
    submitButtonSelector: ".modal__container-button",
    inactiveButtonClass: "modal__container-button_disabled",
    inputErrorClass: "modal__container-input_type_error",
}

function showInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorMessageElement.textContent = '';
  errorMessageElement.classList.remove(errorClass);
}

function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    return showInputError(formElement, inputElement, options);
  }
  
  hideInputError(formElement, inputElement, options);

}

function hasInvalidInput(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid);
}

function toggleButtonState(inputElements, submitButton, {inactiveButtonClass}) {

  if (hasInvalidInput(inputElements)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
  }

  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;

}

function setEventListeners(formElement, options) {
  const {inputSelector} = options;
  const {submitButtonSelector} = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(submitButtonSelector);
  inputElements.forEach((inputElement) => {
    toggleButtonState(inputElements,submitButton, options);

    inputElement.addEventListener("input", (event) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements,submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    setEventListeners(formElement, options);
  });
}

enableValidation(config);