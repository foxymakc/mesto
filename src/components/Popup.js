export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //Функция открытия любоого попап
  open() {
    this._element.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  //Функция закрытия любоого попап
  close() {
    this._element.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  //Функция закрытия любоого попап нажав на Escape
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //Слушатели клика закрыть
  setEventListeners() {
    this._element.addEventListener("click", (e) => {
      if (
        !(
          e.target === this._element ||
          e.target.classList.contains("popup__close")
        )
      ) {
        return;
      }
      this.close();
    });
  }
}