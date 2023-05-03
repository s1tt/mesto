export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popupElement = document.querySelector(this._selector);

    this._btnEl = this._popupElement.querySelector('.popup__btn');
    this._startBtnText = this._btnEl?.textContent;
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

  setLoadingBtnText() {
    this._btnEl.classList.add('popup__btn_disabled2');
    this._btnEl.textContent = 'Сохранение...';
  }

  setStartBtnText() {
    this._btnEl.classList.remove('popup__btn_disabled2');
    this._btnEl.textContent = this._startBtnText;
    this.close();
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
