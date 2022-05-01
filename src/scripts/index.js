import  Card  from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import  PopupWithForm  from '../components/PopupWithForm.js';
import  PopupWithImage  from '../components/PopupWithImage.js';
import  Section  from '../components/Section.js';
import  UserInfo  from '../components/UserInfo.js';

const profilePopupOpenBtn = document.querySelector("#popup_show");
const cardPopupOpenBtn = document.querySelector("#popup_element_show");
const profilePopupNameInput = document.querySelector(".popup__input_name");
const profilePopupJobInput = document.querySelector(".popup__input_about-me");
const profilePopupForm = document.querySelector(".popup__container");
const cardPopupImage = document.querySelector(".popup__image");
const cardPopupImageTitle = document.querySelector(".popup__image-title");
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

const settingsValidator = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_error-active',
  errorClass: 'popup__error'
};


//Попап ПРОФИЛЯ
const userInfo = new UserInfo({selectorProfilePopupName: ".profile__title", selectorProfilePopupJob: ".profile__subtitle" });
userInfo.getUserInfo();

profilePopupOpenBtn.addEventListener("click", () => {
  const profileInfo = userInfo.getUserInfo();
  profilePopupNameInput.value = profileInfo.name;
  profilePopupJobInput.value = profileInfo.job;
  validatorProfilePopupForm.checkValidationOpenPopup();
  handleProfileFormSubmit.open();
});

const handleProfileFormSubmit = new PopupWithForm('#popup', () => {
  userInfo.setUserInfo({name: profilePopupNameInput, job: profilePopupJobInput});
});

handleProfileFormSubmit.setEventListeners();

const validatorProfilePopupForm = new FormValidator(profilePopupForm, settingsValidator);
validatorProfilePopupForm.enableValidation();


//Попап КАРТОЧЕК
cardPopupOpenBtn.addEventListener("click", () => {
 handleCardFormSubmit.open();
 validatorCardPopupForm.checkValidationOpenPopup();
});

//Добавление новой карточки
const handleCardFormSubmit = new PopupWithForm("#popup_element", newCard => {
  const card = createCard(newCard);
  const cardElement = card.generateCard();
  cardRenderer.addItem(cardElement)
})

handleCardFormSubmit.setEventListeners();

const validatorCardPopupForm = new FormValidator(cardPopupForm, settingsValidator);
validatorCardPopupForm.enableValidation();


//Увеличение карточки
const popupCardClick = new PopupWithImage("#popup__element-image");

popupCardClick.setEventListeners();


//Создание карточки
const createCard = (data) => {
  const card = new Card( {
    handleCardClick: (name, link) => {
      cardPopupImageTitle.textContent = name;
      cardPopupImage.src = link;
      cardPopupImage.alt = name;
      popupCardClick.open(data.name , data.link)
    },
    data: data},
  '#element-template');
  return card
}


// Отображение карточек
const cardRenderer = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    const cardElement = card.generateCard();
    cardRenderer.addItem(cardElement);}},
  ".elements");

  cardRenderer.rendererItems();