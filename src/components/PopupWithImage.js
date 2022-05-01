import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardPopupImage = this._element.querySelector(".popup__image");
    this._cardPopupImageTitle = this._element.querySelector(
      ".popup__image-title"
    );
  }

  open(name, link) {
    super.open();
    this._cardPopupImageTitle.textContent = name;
    this._cardPopupImage.src = link;
    this._cardPopupImage.alt = name;
  }
}