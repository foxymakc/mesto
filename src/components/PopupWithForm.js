import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSabmitForm) {
    super(popupSelector);
    this._callbackSabmitForm = callbackSabmitForm;
    this._formElement = this._element.querySelector(".popup__container");
    this._inputList = this._formElement.querySelectorAll(".popup__input");
    this._popupBtn = this._formElement.querySelector('.popup__submit')
    this._popupBtnText = this._popupBtn.textContent
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  _getInputValues() {
    this._values = {};
    this._inputList.forEach((inputElement) => {
      this._values[inputElement.name] = inputElement.value;
    });
    return this._values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();

      this._callbackSabmitForm(this._getInputValues());
      this.close();
    });
  }

  renderRetention(isLoading) {
    if(isLoading) {
      this._popupBtn.textContent = 'Сохранение...';
    } else {
      this._popupBtn.textContent = this._popupBtnText;
    }
  }
}