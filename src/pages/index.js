import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";
import {
  avatarPopupOpenBtn,
  profilePopupOpenBtn,
  cardPopupOpenBtn,
  profilePopupNameInput,
  profilePopupJobInput,
  settingsValidator,
} from "../utils/constans.js";

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
  formValidators["popup__avatar-form"].checkValidationOpenPopup();
});

const handleAvatarFormSubmit = new PopupWithForm(
  "#popup_avatar",
  (newAvatar) => {
    handleAvatarFormSubmit.renderRetention(true);
    api
      .handleAvatar(newAvatar)
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
        handleAvatarFormSubmit.close();
      })
      .catch((err) => console.log(err))
      .finally(() => handleAvatarFormSubmit.renderRetention(false));
  }
);

handleAvatarFormSubmit.setEventListeners();

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

  formValidators["popup__info"].checkValidationOpenPopup();
  handleProfileFormSubmit.open();
});

const handleProfileFormSubmit = new PopupWithForm("#popup", (newProfile) => {
  handleProfileFormSubmit.renderRetention(true);
  api
    .handleUserInfoApi(newProfile)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      handleProfileFormSubmit.close();
    })
    .catch((err) => console.log(err))
    .finally(() => handleProfileFormSubmit.renderRetention(false));
});

handleProfileFormSubmit.setEventListeners();

//Попап КАРТОЧЕК
cardPopupOpenBtn.addEventListener("click", () => {
  handleCardFormSubmit.open();
  formValidators["popup__element-form"].checkValidationOpenPopup();
});

//Добавление новой карточки
const handleCardFormSubmit = new PopupWithForm("#popup_element", (newCard) => {
  handleCardFormSubmit.renderRetention(true);
  api
    .handleAddCard(newCard)
    .then((res) => {
      cardRenderer.addItem(createCard(res));
      handleCardFormSubmit.close();
    })
    .catch((err) => console.log(err))
    .finally(() => handleCardFormSubmit.renderRetention(false));
});

handleCardFormSubmit.setEventListeners();

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

//Валидация
const formValidators = {};

const enableValidation = (settingsValidator) => {
  const formList = Array.from(
    document.querySelectorAll(settingsValidator.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, settingsValidator);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settingsValidator);