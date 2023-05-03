export default class Card {
  constructor(card, handleCardClick, hendleConfirmDeleteCard, handleLikeClick, selector, api, currentUserId) {
    this._isLiked = card.likes?.some(like => like._id === currentUserId) || false;
    console.log(this._isLiked);

    this._title = card.name;
    this._link = card.link;
    this._likes = card.likes?.length || 0;
    this._cardId = card.popupCardId || card._id;
    this._cardOwnerId = card.popupCardOwner || card.owner._id;
    this._currentUserId = currentUserId;
    this._selector = selector;
    this._api = api;

    this._handleCardClick = handleCardClick;
    this._hendleConfirmDeleteCard = hendleConfirmDeleteCard;
    this._handleLikeClick = handleLikeClick;

    // Найдем кнопку лайка и изображение один раз в конструкторе
    this._likeButton = null;
    this._cardImage = null;
    this._countOfLikes = null;
    this._trashBtn = null;
  }

  getId() {
    return this._cardId;
  }

  _getElement() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);

    // Сохраняем найденные элементы в классе
    this._likeButton = cardElement.querySelector('.element__like-btn');
    this._cardImage = cardElement.querySelector('.element__img');
    this._countOfLikes = cardElement.querySelector('.element__like-count');
    this._trashBtn = cardElement.querySelector('.element__trash-btn');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    this._countOfLikes.textContent = this._likes;
    cardElement.querySelector('.element__title').textContent = this._title;

    //Удаление элемента удаления карточки, если ИД владельца карты и ИД текущего юзера не совпадают
    if (this._currentUserId !== this._cardOwnerId) {
      this._trashBtn.remove();
    }
    //если лайкнута когда-то, то закрашиваем сердце при добавлении на страницу
    if (this._isLiked) {
      this._likeButton.classList.add('element__like-btn_active');
    }
    return cardElement;
  }

  //Установка слушателей
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleLikeClick(this._cardId, this._isLiked, this._handleLike.bind(this)));
    this._trashBtn.addEventListener('click', () => this._hendleConfirmDeleteCard(this._cardId, this._handleDeleteCard.bind(this)));
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._link);
    });
  }

  //Обработчик лайка
  _handleLike(countOfLikes) {
    console.log(countOfLikes);
    console.log(`До ${this._isLiked}`);
    this._isLiked = !this._isLiked;
    //обновление количества лайков на странице
    this._countOfLikes.textContent = countOfLikes;
    this._likeButton.classList.toggle('element__like-btn_active');
    console.log(`После ${this._isLiked}`);
  }

  //Обработчик удаления карточкики
  _handleDeleteCard() {
    this._element.remove();
  }

  //Генерируем элемент карточки
  generate() {
    this._element = this._getElement();
    this._setEventListeners();
    return this._element;
  }
}
