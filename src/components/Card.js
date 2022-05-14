export default class Card {
  constructor({ handleCardClick, handleRetentionDelete, data }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleRetentionDelete = handleRetentionDelete;
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

    return this._item;
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
        this._handleRetentionDelete();
      });
  }

  //Функция лайк карточки
  _handleLikeCard() {
    const likeBtn = this._item.querySelector(".element__like");
    const numderLike = this._item.querySelector(".element__like-number");
    let counter = 0;
    const renderCounter = (counter, numderLike) => numderLike.innerText = counter;

    if (!likeBtn.classList.contains('element__like_active')) {
      likeBtn.classList.add('element__like_active');
      renderCounter(++counter, numderLike);
    } else {
      likeBtn.classList.remove('element__like_active');
      renderCounter(counter = '', numderLike);
    }
    
    }

  //функция удаления карточки
  handleRemoveCard() {
    this._item.closest(".element").remove();
    this._item = null;
  }
}