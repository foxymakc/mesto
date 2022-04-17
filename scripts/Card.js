import {fullscreenImagePopup, fullscreenImagePopupCloseBtn, cardPopupImage, cardPopupImageTitle, openPopup, closePopup} from './index.js';
export default

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
  
  //Поиск карточки
  _getTemplateCard() {
    this._item = document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
  }

  //Отрисовка карточки
  generateCard() {
    this._getTemplateCard();
    this._setEventListeners();

    this._cardImage = this._item.querySelector(".element__image")
    this._item.querySelector(".element__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._item; 
  }

  //Слушатели
  _setEventListeners() {

    //Лайк карточки
    this._item.querySelector(".element__like").addEventListener('click', () => {
      this._handleLikeCard()
    });

    // Открыть увеличение картинки
    this._item.querySelector(".element__image").addEventListener('click', () => {
      this._handleOpenPopupFullImage()
    });

    // Закрыть увеличение картинки
    fullscreenImagePopupCloseBtn.addEventListener('click', () => {
      this._handleClosePopupFullImage()
    });

    //Удаление карточки
    this._item.querySelector(".element__delete").addEventListener('click', () => {
      this._handleRemoveCard()
    });
  
  }
  
  //Функция лайк карточки
  _handleLikeCard() {
    this._item.querySelector(".element__like").classList.toggle("element__like_active")
  }

  //функция открытия увеличения картинки
  _handleOpenPopupFullImage() {
    openPopup(fullscreenImagePopup);
      cardPopupImageTitle.textContent = this._name;
      cardPopupImage.src = this._link;
      cardPopupImage.alt = this._name;
  }

  //функция закрытия увеличения картинки
  _handleClosePopupFullImage() {
    closePopup(fullscreenImagePopup);
  }


  //функция удаления карточки
  _handleRemoveCard() {
    this._item.closest(".element").remove()
  }

}