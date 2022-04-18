import  Card  from './Card.js';
import {FormValidator, settingsValidator} from './FormValidator.js';

const profilePopupOpenBtn = document.querySelector("#popup_show"); //кнопка открытия
const profilePopup = document.querySelector("#popup"); // сюда прикрепляется Опен класс
const profilePopupCloseBtn = document.querySelector("#popup_close"); //закрытие попап
const cardPopupOpenBtn = document.querySelector("#popup_element_show"); //кнопка открытия
const cardPopup = document.querySelector("#popup_element"); // сюда прикрепляется Опен класс
const cardPopupCloseBtn = document.querySelector("#popup_close-elm"); //закрытие попап
const fullscreenImagePopup = document.querySelector("#popup__element-image"); // сюда прикрепляется Опен класс
const fullscreenImagePopupCloseBtn = document.querySelector("#popup_close-image"); //закрытие попап
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profilePopupNameInput = document.querySelector(".popup__input_name");
const profilePopupJobInput = document.querySelector(".popup__input_about-me");
const profilePopupForm = document.querySelector(".popup__container");
const cardsList = document.querySelector(".elements");
const cardPopupImage = document.querySelector(".popup__image");
const cardPopupImageTitle = document.querySelector(".popup__image-title");
const cardPopupTitleInput = document.querySelector(".popup__input_title-element");
const cardPopupUrlInput = document.querySelector(".popup__input_url-element");
const cardPopupForm = document.querySelector("#popup__element-info");

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


//Функция закрытия любоого попап нажав на Escape
function pressEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
}

//Функция закрытия любоого попап нажав на фон
function pressOverlay(e) {
  const target = e.target
  if (!target.closest('.popup__container') && !target.closest('#popup_close')) {
    closePopup(target);
  };
  if (target.closest('#popup_close') || target.closest('#popup_close-elm') || target.closest('#popup_close-image')) {
    closeProfilePopup(target); //закрыть попап профиля
    closeCardPopup(target); //закрыть попап карточки
    closeFullscreenImagePopup(target); //закрыть попап увеличения карточки
  };
}

//Функция открытия любоого попап
function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', pressEscape);
  element.addEventListener('click', pressOverlay);
}

//Функция закрытия любоого попап
function closePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressEscape);
  element.removeEventListener('click', pressOverlay);
}

//Попап ПРОФИЛЯ

//Открыть попап
profilePopupOpenBtn.addEventListener("click", openProfilePopup);

function openProfilePopup() {
  openPopup(profilePopup);
  profilePopupNameInput.value = profileTitle.textContent;
  profilePopupJobInput.value = profileSubtitle.textContent;
  validatorProfilePopupForm.checkValidationOpenPopup();
}

//Функция закрыть попап
function closeProfilePopup() {
  closePopup(profilePopup);
}

//Вызов события сохранить
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profilePopupNameInput.value;
  profileSubtitle.textContent = profilePopupJobInput.value;
  closeProfilePopup(profilePopup); // Нормальное закрытие попапа
}

profilePopupForm.addEventListener("submit", handleProfileFormSubmit);

//Попап КАРТОЧЕК

//Открыть попап
cardPopupOpenBtn.addEventListener("click", openCardPopup);

function openCardPopup() {
  openPopup(cardPopup);
  cardPopupTitleInput.value = "";
  cardPopupUrlInput.value = "";
  validatorCardPopupForm.checkValidationOpenPopup();
}

//Функция закрыть попап
function closeCardPopup() {
  closePopup(cardPopup);
}

//Функция открытия попап увеличения карточки
function handleCardClick(name, link) {
  openPopup(fullscreenImagePopup);
    cardPopupImageTitle.textContent = name;
    cardPopupImage.src = link;
    cardPopupImage.alt = name;
}

//Функция закрыть попап увеличения карточки
function closeFullscreenImagePopup() {
  closePopup(fullscreenImagePopup);
}

//Вызов события создать
cardPopupForm.addEventListener("submit", addCard);

//Создание новой карточки
function addCard(event) {
  event.preventDefault();

  const newTitleInput = cardPopupTitleInput.value;
  const newUrlInput = cardPopupUrlInput.value;

  renderCards({ name: newTitleInput, link: newUrlInput });

  event.currentTarget.reset();

  closeCardPopup(cardPopup);
}

// Одна карточка
function createCard(item) {
  const card = new Card(item, '#element-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

// Расположение карточек
function renderCards(item) {
  const cardElement = createCard(item);
  cardsList.prepend(cardElement);
}

 //6 Карточек
initialCards.map(renderCards);

//Валидация 
//экземпляр для профиля
const validatorProfilePopupForm = new FormValidator(profilePopupForm, settingsValidator);
validatorProfilePopupForm.enableValidation();

//экземппляр для карточек
const validatorCardPopupForm = new FormValidator(cardPopupForm, settingsValidator);
validatorCardPopupForm.enableValidation();