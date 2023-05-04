export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popupElement = document.querySelector(this._selector);
  }

  //Обработчик закрытия попапа кнопкой ESC
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  //Функция открытия попапа
  open() {
    this._popupElement.classList.add('popup_opened');

    //Установка слушателя на закрытие попаов кнопкой ESC
    document.addEventListener('keydown', this._handleEscClose);
  }

  //Функция закрытия попапа
  close() {
    this._popupElement.classList.remove('popup_opened');

    //Удаление слушателя на закрытие попаов кнопкой ESC
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    //Установка слушателя на закрытие попапа кликом на оверлей и на закрытие попапа на кнопку
    this._popupElement.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup__close-btn') || evt.target.classList.contains('popup')) {
        this.close();
      }
      return;
    });
  }
}
