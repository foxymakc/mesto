import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._element.querySelector(".popup__container");
    this._handleCallbackSabmitForm = null;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleCallbackSabmitForm();
    });
  }

  setSubmitAction(action) {
    this._handleCallbackSabmitForm = action;
  }
}