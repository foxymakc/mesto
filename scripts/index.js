/* Попап профиля */

const OpenPopupContainer = document.querySelector("#popup_show");
OpenPopupContainer.addEventListener("click", OpenPopup);
function OpenPopup() {
  const popup = document.querySelector("#popup");
  popup.classList.add("popup_opened");
  nameInput.value = ProfileTitle.textContent;
  jobInput.value = ProfileSubtitle.textContent;
}

const ClosePopupContainer = document.querySelector("#popup_close");
ClosePopupContainer.addEventListener("click", ClosePopup);
function ClosePopup() {
  const popup = document.querySelector("#popup");
  popup.classList.remove("popup_opened");
}

const formElement = document.querySelector(".popup__container");
const nameInput = document.querySelector(".popup__input_name");
const jobInput = document.querySelector(".popup__input_about-me");
const PopupSumbit = document.querySelector(".popup__sumbit");
const ProfileTitle = document.querySelector(".profile__title");
const ProfileSubtitle = document.querySelector(".profile__subtitle");

/*Изменение данных профиля*/

function formSubmitHandler(evt) {
  evt.preventDefault();
  ProfileTitle.textContent = nameInput.value;
  ProfileSubtitle.textContent = jobInput.value;
}

formElement.addEventListener("submit", formSubmitHandler);
PopupSumbit.addEventListener("click", ClosePopup);

/* Попап картинки */

const OpenPopupContainerElement = document.querySelector("#popup_element_show");
OpenPopupContainerElement.addEventListener("click", OpenPopupElement);
function OpenPopupElement() {
  const popupElement = document.querySelector("#popup_element");
  popupElement.classList.add("popup_opened");
  document.querySelector(".popup__input_title-element").value = "";
  document.querySelector(".popup__input_url-element").value = "";
}

const ClosePopupContainerElement = document.querySelector("#popup_close-elm");
ClosePopupContainerElement.addEventListener("click", ClosePopupElement);
function ClosePopupElement() {
  const popupElement = document.querySelector("#popup_element");
  popupElement.classList.remove("popup_opened");
}

/* Карточки */

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const elementsList = document.querySelector(".elements");
const elementSubmit = document.querySelector("#popup_submit-elm");
const elementForm = document.querySelector("#popup__element-info");

elementForm.addEventListener("submit", addElement);
elementSubmit.addEventListener("click", ClosePopupElement);

function renderElements(item) {
  const element = document
    .querySelector("#element-template")
    .content.querySelector(".element")
    .cloneNode(true);

  element.querySelector(".element__title").textContent = item.name || item;
  element.querySelector(".element__image").src = item.link || item;

  /*Лайк карточки*/
  element
    .querySelector(".element__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
    });

  /*Открыть Попап увеличение картинки*/
  element
    .querySelector(".element__image")
    .addEventListener("click", function () {
      const popupElementImage = document.querySelector("#popup__element-image");
      popupElementImage.classList.add("popup_opened");
      document.querySelector(".popup__image").src = item.link || item;
      document.querySelector(".popup__image-title").textContent =
        item.name || item;
    });

  setElementActionListeners(element);

  elementsList.prepend(element);
}

/*Создание карточки*/

function addElement(event) {
  event.preventDefault();

  const newElementTitle =
    event.currentTarget.querySelector("#title-element").value;
  const newElementImage =
    event.currentTarget.querySelector("#url-element").value;

  renderElements({ name: newElementTitle, link: newElementImage });

  event.currentTarget.reset();
}

/*Удаление карточки*/

function removeElement(event) {
  const element = event.currentTarget.closest(".element");

  element.remove();
}

function setElementActionListeners(element) {
  element
    .querySelector(".element__delete")
    .addEventListener("click", removeElement);
}

initialCards.map(renderElements);

/*Зыкрыть Попап увеличение картинки*/

const ClosePopupFullscreenImage = document.querySelector("#popup_close-image");
ClosePopupFullscreenImage.addEventListener("click", ClosePopupFullscreen);
function ClosePopupFullscreen() {
  const popupElementImage = document.querySelector("#popup__element-image");
  popupElementImage.classList.remove("popup_opened");
}
