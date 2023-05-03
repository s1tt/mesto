import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(this._popupElement.querySelectorAll('.popup__input'));
    this._formElement = this._popupElement.querySelector('.popup__form');
  }

  //Получить данные из формы
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => (this._formValues[input.name] = input.value));

    return this._formValues;
  }

  //Закрыть попап
  close() {
    super.close();
    this._formElement.reset();
  }

  //Установка слушателей
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      console.log('click');
      this._handleFormSubmit(this._getInputValues());
      // this.close();
    });
  }
}
