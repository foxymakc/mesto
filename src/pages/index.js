import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";
import "../pages/index.css";

const avatarPopupOpenBtn = document.querySelector("#avatar-edit-button");
const avatarPopupForm = document.querySelector("#popup__avatar-info");
const profilePopupOpenBtn = document.querySelector("#popup_show");
const cardPopupOpenBtn = document.querySelector("#popup_element_show");
const profilePopupNameInput = document.querySelector(".popup__input_name");
const profilePopupJobInput = document.querySelector(".popup__input_about-me");
const profilePopupForm = document.querySelector(".popup__container");
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
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_error-active",
  errorClass: "popup__error",
};

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-41",
  headers: {
    authorization: "240299ab-5d52-47c4-861f-e301564a80f2",
    "Content-Type": "application/json",
  },
});

let userId;

api
  .getInformation()
  .then(([res, cards]) => {
    userInfo.setUserAvatar(res.avatar);
    userInfo.setUserInfo(res.name, res.about);
    userId = res._id;
    cardRenderer.rendererItems(cards);
  })
  .catch((err) => console.log(err));

//Попап АВАТАР-профиля
avatarPopupOpenBtn.addEventListener("click", () => {
  handleAvatarFormSubmit.open();
  validatorAvatarPopupForm.checkValidationOpenPopup();
  handleAvatarFormSubmit.renderRetention(false);
});

const handleAvatarFormSubmit = new PopupWithForm(
  "#popup_avatar",
  (newAvatar) => {
    handleAvatarFormSubmit.renderRetention(true);
    api
      .handleAvatar(newAvatar)
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
      })
      .catch((err) => console.log(err));
  }
);

handleAvatarFormSubmit.setEventListeners();

const validatorAvatarPopupForm = new FormValidator(
  avatarPopupForm,
  settingsValidator
);
validatorAvatarPopupForm.enableValidation();

//Попап ПРОФИЛЯ
const userInfo = new UserInfo({
  selectorProfilePopupName: ".profile__title",
  selectorProfilePopupJob: ".profile__subtitle",
  selectorAvatarPopup: ".profile__avatar",
});
userInfo.getUserInfo();

profilePopupOpenBtn.addEventListener("click", () => {
  const profileInfo = userInfo.getUserInfo();
  profilePopupNameInput.value = profileInfo.userName;
  profilePopupJobInput.value = profileInfo.job;
  validatorProfilePopupForm.checkValidationOpenPopup();
  handleProfileFormSubmit.open();
  handleProfileFormSubmit.renderRetention(false);
});

const handleProfileFormSubmit = new PopupWithForm("#popup", (newProfile) => {
  handleProfileFormSubmit.renderRetention(true);
  api
    .handleUserInfoApi(newProfile)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
    })
    .catch((err) => console.log(err));
});

handleProfileFormSubmit.setEventListeners();

const validatorProfilePopupForm = new FormValidator(
  profilePopupForm,
  settingsValidator
);
validatorProfilePopupForm.enableValidation();

//Попап КАРТОЧЕК
cardPopupOpenBtn.addEventListener("click", () => {
  handleCardFormSubmit.open();
  validatorCardPopupForm.checkValidationOpenPopup();
  handleCardFormSubmit.renderRetention(false);
});

//Добавление новой карточки
const handleCardFormSubmit = new PopupWithForm("#popup_element", (newCard) => {
  handleCardFormSubmit.renderRetention(true);
  api
    .handleAddCard(newCard)
    .then((res) => {
      cardRenderer.addItem(createCard(res));
    })
    .catch((err) => console.log(err));
});

handleCardFormSubmit.setEventListeners();

const validatorCardPopupForm = new FormValidator(
  cardPopupForm,
  settingsValidator
);
validatorCardPopupForm.enableValidation();

//Увеличение карточки
const popupCardClick = new PopupWithImage("#popup__element-image");
popupCardClick.setEventListeners();

//Попап удаление карточки
const popupDeleteCard = new PopupWithConfirmation("#popup_delete-card");
popupDeleteCard.setEventListeners();

//Создание карточки
const createCard = (data) => {
  const card = new Card(
    {
      handleCardClick: () => {
        popupCardClick.open(data.name, data.link);
      },
      handleDeleteCard: () => {
        popupDeleteCard.setSubmitAction(() => {
          api
            .deleteCard(data._id)
            .then(() => {
              card.handleRemoveCard();
              popupDeleteCard.close();
            })
            .catch((err) => console.log(err));
        });
        popupDeleteCard.open();
      },
      data: data,
    },
    "#element-template",
    userId,
    api
  );
  return card.generateCard();
};

// Отображение карточек
const cardRenderer = new Section(
  {
    renderer: (item) => {
      cardRenderer.addItem(createCard(item));
    },
  },
  ".elements"
);