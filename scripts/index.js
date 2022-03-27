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
const cardLike = document.querySelector(".element__like");
const cardPopupImage = document.querySelector(".popup__image");
const cardPopupImageTitle = document.querySelector(".popup__image-title");
const cardPopupTitleInput = document.querySelector(".popup__input_title-element");
const cardPopupUrlInput = document.querySelector(".popup__input_url-element");
const cardPopupForm = document.querySelector("#popup__element-info");
const submitCardPopupBtn = document.querySelector("#popup_submit-elm");

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
  const PopupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(PopupOpened);
  };
}

//Функция закрытия любоого попап нажав на фон
window.addEventListener('click', e => {
  const target = e.target
  if (!target.closest('.popup__container') && !target.closest('#popup_close')) {
    target.classList.remove('popup_opened');
  };
});

//Функция открытия любоого попап
function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', pressEscape);
}

//Функция закрытия любоого попап
function closePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressEscape);
}

//Попап ПРОФИЛЯ

//Открыть попап
profilePopupOpenBtn.addEventListener("click", profilePopupOpen);

function profilePopupOpen() {
  openPopup(profilePopup);
  profilePopupNameInput.value = profileTitle.textContent;
  profilePopupJobInput.value = profileSubtitle.textContent;
}

//Закрыть попап
profilePopupCloseBtn.addEventListener("click", profilePopupClose);

function profilePopupClose() {
  hideInputError(profilePopupForm, profilePopupNameInput);
  hideInputError(profilePopupForm, profilePopupJobInput);
  closePopup(profilePopup);
}

//Вызов события сохранить
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profilePopupNameInput.value;
  profileSubtitle.textContent = profilePopupJobInput.value;
  profilePopupClose(profilePopup); // Нормальное закрытие попапа
}

profilePopupForm.addEventListener("submit", handleProfileFormSubmit);

//Попап КАРТОЧЕК

//Открыть попап
cardPopupOpenBtn.addEventListener("click", openCardPopup);

function openCardPopup() {
  disableButton(submitCardPopupBtn)
  openPopup(cardPopup);
  cardPopupTitleInput.value = "";
  cardPopupUrlInput.value = "";
}

//Закрыть попап
cardPopupCloseBtn.addEventListener("click", closeCardPopup);

function closeCardPopup() {
  hideInputError(cardPopupForm, cardPopupTitleInput);
  hideInputError(cardPopupForm, cardPopupUrlInput);
  closePopup(cardPopup);
}

//Карточка
function createCard(item) {
  const cardItem = document
    .querySelector("#element-template")
    .content.firstElementChild.cloneNode(true);

  const cardTitle = cardItem.querySelector(".element__title");
  const cardImage = cardItem.querySelector(".element__image");

  cardTitle.textContent = item.name || item;
  cardImage.src = item.link || item;
  cardImage.alt = item.name || item;

  //Лайк карточки

  cardItem
    .querySelector(".element__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
    });

  //Открыть Попап увеличение картинки
  cardImage.addEventListener("click", function () {
    openPopup(fullscreenImagePopup);
    cardPopupImageTitle.textContent = item.name || item;
    cardPopupImage.src = item.link || item;
    cardPopupImage.alt = item.name || item;
  });

  //Удаление карточки
  cardItem.querySelector(".element__delete").addEventListener("click", removeCard);

  return cardItem;
}

//Функция удаление карточки
function removeCard(event) {
  const card = event.currentTarget.closest(".element");

  card.remove();
}

//Зыкрыть Попап увеличение картинки
fullscreenImagePopupCloseBtn.addEventListener(
  "click",
  closeFullscreenImagePopup
);
function closeFullscreenImagePopup() {
  closePopup(fullscreenImagePopup);
}

//Вызов события создать

cardPopupForm.addEventListener("submit", addCard);

//Создание карточки
function addCard(event) {
  event.preventDefault();

  const newTitleInput =
    event.currentTarget.querySelector("#title-element").value;
  const newUrlInput = event.currentTarget.querySelector("#url-element").value;

  renderCards({ name: newTitleInput, link: newUrlInput });

  event.currentTarget.reset();

  closeCardPopup(cardPopup);
}

//6 Карточек
function renderCards(item) {
  const element = createCard(item);
  cardsList.prepend(element);
}

initialCards.map(renderCards);
