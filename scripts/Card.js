import { initialCards } from './cards.js';
import { openPopup, addNewCard } from './index.js';

export class Card {
  //Конструктор карточки
  constructor(card, selector) {
    this._name = card.name;
    this._link = card.link;
    this._selector = selector;
  }

  //достаем темплейт, заполняем его и возвращаем
  _getElement() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__img').src = this._link;
    cardElement.querySelector('.element__img').alt = this._name;
    cardElement.querySelector('.element__title').textContent = this._name;

    return cardElement;
  }

  //Устанавливаем все лисенеры
  _setEventListeners() {
    this._element.querySelector('.element__like-btn').addEventListener('click', () => this._handleLike());

    this._element.querySelector('.element__trash-btn').addEventListener('click', () => this._handleDeleteCard());

    this._element.querySelector('.element__img').addEventListener('click', () => this._handleOpenPopupViewImage());
  }

  //обработчик лайков
  _handleLike() {
    this._element.querySelector('.element__like-btn').classList.toggle('element__like-btn_active');
  }

  //обработчик удаления карточки
  _handleDeleteCard() {
    const cardItem = this._element.closest('.element');
    cardItem.remove();
  }

  //обработчик открытия попапа картинки карточки
  _handleOpenPopupViewImage() {
    openPopup(document.querySelector('.popup_type_view-image'));
    document.querySelector('.popup__view-image-item').src = this._link;
    document.querySelector('.popup__view-image-item').alt = this._name;
    document.querySelector('.popup__view-image-figcaption').textContent = this._name;
  }

  //генерируем данные карточки и возвращаем
  generate() {
    this._element = this._getElement();
    this._setEventListeners();
    return this._element;
  }
}

//берем данные для карточек из массива и добавляем их на сайт
initialCards.forEach(item => {
  addNewCard(item);
});
