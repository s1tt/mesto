import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popupElement.querySelector('.popup__view-image-item');
    this._description = this._popupElement.querySelector('.popup__view-image-figcaption');
  }

  //Функция открытия попапа
  open(title, link) {
    this._image.src = link;
    this._image.alt = title;
    this._description.textContent = title;
    super.open();
  }
}
