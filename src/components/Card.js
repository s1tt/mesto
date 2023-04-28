export default class Card {
  constructor(card, handleCardClick, selector) {
    this._title = card.name;
    this._link = card.link;
    this._selector = selector;

    this._handleCardClick = handleCardClick;

    // Найдем кнопку лайка и изображение один раз в конструкторе
    this._likeButton = null;
    this._cardImage = null;
  }

  _getElement() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);

    // Сохраняем найденные элементы в классе
    this._likeButton = cardElement.querySelector('.element__like-btn');
    this._cardImage = cardElement.querySelector('.element__img');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    cardElement.querySelector('.element__title').textContent = this._title;

    return cardElement;
  }

  _setEventListeners() {
    // Используем сохраненные переменные для лайка и изображения
    this._likeButton.addEventListener('click', () => this._handleLike());
    this._element.querySelector('.element__trash-btn').addEventListener('click', () => this._handleDeleteCard());
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._link);
    });
  }

  _handleLike() {
    // Используем сохраненную переменную для кнопки лайка
    this._likeButton.classList.toggle('element__like-btn_active');
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  generate() {
    this._element = this._getElement();
    this._setEventListeners();
    return this._element;
  }
}
