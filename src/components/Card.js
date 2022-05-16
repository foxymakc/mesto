export default class Card {
  constructor(
    { handleCardClick, handleDeleteCard, data },
    cardSelector,
    userId,
    api
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._userId = userId;
    this._idCardCreator = data.owner._id;
    this._idCard = data._id;
    this._api = api;
    this._likes = data.likes;
  }

  //Поиск карточки
  _getTemplateCard() {
    this._item = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
  }

  //Отрисовка карточки
  generateCard() {
    this._getTemplateCard();
    this._setEventListeners();

    this._cardImage = this._item.querySelector(".element__image");
    this._item.querySelector(".element__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._item.querySelector(".element__like-number").textContent =
      this._likes.length;

    this._checkDeleteCard();
    this._checkLikeCard();

    return this._item;
  }

  //Проверка пользователя для возможности удаления карточки
  _checkDeleteCard() {
    if (this._userId != this._idCardCreator) {
      this._item.querySelector(".element__delete").style.display = "none";
    }
  }

  //Проверка пользователя для лайка карточки
  _checkLikeCard() {
    if (this._likes.some((res) => res._id === this._userId)) {
      this._item
        .querySelector(".element__like")
        .classList.add("element__like_active");
    }
  }

  //Слушатели
  _setEventListeners() {
    //Лайк карточки
    this._item.querySelector(".element__like").addEventListener("click", () => {
      this._handleLikeCard();
    });

    // Открыть увеличение картинки
    this._item
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });

    //Удаление карточки
    this._item
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
  }

  //Функция лайк карточки
  _handleLikeCard() {
    const likeBtn = this._item.querySelector(".element__like");
    const likeNumder = this._item.querySelector(".element__like-number");

    if (!likeBtn.classList.contains("element__like_active")) {
      this._api
        .likeCard(this._idCard)
        .then((res) => {
          likeBtn.classList.add("element__like_active");
          likeNumder.textContent = res.likes.length;
        })
        .catch((err) => console.log(err));
    } else {
      this._api
        .disLikeCard(this._idCard)
        .then((res) => {
          likeBtn.classList.remove("element__like_active");
          likeNumder.textContent = res.likes.length;
        })
        .catch((err) => console.log(err));
    }
  }

  //функция удаления карточки
  handleRemoveCard() {
    this._item.closest(".element").remove();
    this._item = null;
  }
}
