const avatarPopupOpenBtn = document.querySelector("#avatar-edit-button");
const profilePopupOpenBtn = document.querySelector("#popup_show");
const cardPopupOpenBtn = document.querySelector("#popup_element_show");
const profilePopupNameInput = document.querySelector(".popup__input_name");
const profilePopupJobInput = document.querySelector(".popup__input_about-me");
const settingsValidator = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_error-active",
  errorClass: "popup__error",
};

export {
  avatarPopupOpenBtn,
  profilePopupOpenBtn,
  cardPopupOpenBtn,
  profilePopupNameInput,
  profilePopupJobInput,
  settingsValidator,
};