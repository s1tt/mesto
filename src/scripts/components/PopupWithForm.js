import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.popup__input');

    this._formValues = {};
    this._inputList.forEach(input => (this._formValues[input.name] = input.value));

    return this._formValues;
  }

  close() {
    this._element.querySelector('.popup__form').reset();
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._element.removeEventListener('submit', this._submitHandler);
    this._element.removeEventListener('click', this._closePopupHandler);
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this.close();
  }

  setEventListeners() {
    this._element.querySelector('.popup__close-btn').addEventListener('click', this.close.bind(this));

    this._closePopupHandler = evt => {
      if (!evt.target.classList.contains('popup')) {
        return;
      }
      this.close();
    };

    this._submitHandler = this._handleSubmit.bind(this);

    this._element.addEventListener('click', this._closePopupHandler);
    this._element.addEventListener('submit', this._submitHandler);
  }
}
