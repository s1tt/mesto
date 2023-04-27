export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._element = document.querySelector(this._selector);
  }

  //Обработчик закрытия попапа кнопкой ESC
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  //Функция открытия попапа
  open() {
    this._element.classList.add('popup_opened');

    //Установка слушателя на закрытие попаов кнопкой ESC
    document.addEventListener('keydown', this._handleEscClose);
  }

  //Функция закрытия попапа
  close() {
    this._element.classList.remove('popup_opened');

    //Удаление слушателя на закрытие попаов кнопкой ESC
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    //Установка слушателя на закрытие попапа на кнопку
    this._element.querySelector('.popup__close-btn').addEventListener('click', this.close.bind(this));

    //Установка слушателя на закрытие попапа кликом на оверлей
    this._element.addEventListener('click', evt => {
      if (!evt.target.classList.contains('popup')) {
        return;
      }
      this.close();
    });
  }
}
