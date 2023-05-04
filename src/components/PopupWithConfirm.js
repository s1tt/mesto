import Popup from './Popup';

export default class PopupWithConfirm extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._btnElement = this._popupElement.querySelector('.popup__btn');
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
      const initialBtnText = this._btnElement.textContent;
      this._btnElement.textContent = 'Сохранение...';

      this._handleFormSubmit()
        .then(() => this.close())
        .finally(() => {
          this._btnElement.textContent = initialBtnText;
        });
    });
  }
}
