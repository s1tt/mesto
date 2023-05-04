import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(this._popupElement.querySelectorAll('.popup__input'));
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._btnElement = this._popupElement.querySelector('.popup__btn');
  }

  //Получить данные из формы
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => (this._formValues[input.name] = input.value));

    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      // вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
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
      const initialBtnText = this._btnElement.textContent;
      this._btnElement.textContent = 'Сохранение...';

      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close())
        .finally(() => {
          this._btnElement.textContent = initialBtnText;
        });
    });
  }
}
