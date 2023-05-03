import Popup from './Popup';

export default class PopupWithConfirm extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.popup__form');
  }

  //Действие при сабмите
  submit(newHandleFormSubmit) {
    this._handleFormSubmit = newHandleFormSubmit;
  }

  //Установка слушателей
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}
