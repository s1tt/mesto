import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector, name, link) {
    super(selector);
    this._name = name;
    this._link = link;
  }

  //Функция открытия попапа
  open() {
    this._element.querySelector('.popup__view-image-item').src = this._link;
    this._element.querySelector('.popup__view-image-item').alt = this._name;
    this._element.querySelector('.popup__view-image-figcaption').textContent = this._name;
    this._element.classList.add('popup_opened');

    //Установка слушателя на закрытие попаов кнопкой ESC
    document.addEventListener('keydown', this._handleEscClose);
  }
}
