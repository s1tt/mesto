// Константы для элементов страницы
const page = document.querySelector('.page');
const elements = document.querySelector('.elements');

const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddImage = document.querySelector('.profile__add-button');

// Константы для попапов
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');

// Константы для форм
const popupFormEditProfile = popupEditProfile.querySelector('.popup__form-edit');
const popupFormAddImage = popupAddCard.querySelector('.popup__form-add');

// Константы для кнопок закрытия попапов
const btnClosePopupEditProfile = popupEditProfile.querySelector('.popup__close-btn');
const btnClosePopupAddImage = popupAddCard.querySelector('.popup__close-btn');

// Константы для значений полей формы редактирования профиля
const popupNameValue = popupEditProfile.querySelector('.popup__input_value_name');
const popupJobValue = popupEditProfile.querySelector('.popup__input_value_job');

// Константы для значений полей формы добавления карточки
const popupImgTitleValue = popupAddCard.querySelector('.popup__input_value_img-title');
const popupImgLinkValue = popupAddCard.querySelector('.popup__input_value_img-link');

// Константы для отображения имени и рода деятельности на странице
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Константа для шаблона карты
const cardTemplate = document.querySelector('#card').content;

// Константа для шаблона попапа просмотра картинок
const popupViewImageTemplate = document.querySelector('#popup-view-image');

// Константы для отображения попапа просмотра картинок
const popup = popupViewImageTemplate.content.querySelector('.popup');
const closeBtn = popupViewImageTemplate.content.querySelector('.popup__close-btn');
const img = popupViewImageTemplate.content.querySelector('.popup__view-image-item');
const figcaption = popupViewImageTemplate.content.querySelector('.popup__view-image-figcaption');

//Массив со стандартными картинками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Открыть попап
function openpopupAddCard() {
  popupAddCard.classList.add('popup_opened');
  popupAddCard.classList.remove('popup_closed');
}

function openPopupEditProfile() {
  popupEditProfile.classList.add('popup_opened');
  popupEditProfile.classList.remove('popup_closed');
  popupNameValue.value = profileName.textContent;
  popupJobValue.value = profileJob.textContent;
}
//Закрыть попап
function closePopupEditProfile() {
  popupEditProfile.classList.remove('popup_opened');
  popupEditProfile.classList.add('popup_closed');
}

function closepopupAddCard() {
  popupAddCard.classList.remove('popup_opened');
  popupAddCard.classList.add('popup_closed');
}

//Отправка формы редактирования профиля
function submitPopupFormEditProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupNameValue.value;
  profileJob.textContent = popupJobValue.value;
  closePopupEditProfile();
}

//Отправка формы добавления новой картинки
function submitPopupFormAddImage(evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__img').src = popupImgLinkValue.value;
  cardElement.querySelector('.element__img').alt = popupImgTitleValue.value;
  cardElement.querySelector('.element__title').textContent = popupImgTitleValue.value;
  elements.prepend(cardElement);
  closepopupAddCard();
}

//Кнопка лайка
function likeOnCard(evt) {
  if (evt.target.classList.contains('element__like-btn')) {
    evt.target.classList.toggle('element__like-btn_active');
  }
}

//Удаление карточки
function deleteCard(evt) {
  if (evt.target.classList.contains('element__trash-btn')) {
    const cardItem = evt.target.closest('.element');
    cardItem.remove();
  }
}

//Добавление картинок из массива
function addPicturesFromArray(arr) {
  const cardElements = arr.map(item => {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__img').src = item.link;
    cardElement.querySelector('.element__img').alt = item.name;
    cardElement.querySelector('.element__title').textContent = item.name;
    return cardElement;
  });
  elements.append(...cardElements);
}
addPicturesFromArray(initialCards);

//Открытие попапа с картинками
function openPopup(e) {
  if (e.target.classList.contains('element__img')) {
    img.src = e.target.src;
    img.alt = e.target.alt;
    figcaption.textContent = e.target.alt;

    const popupCloned = popup.cloneNode(true);
    page.appendChild(popupCloned);

    setTimeout(() => {
      popupCloned.classList.add('popup_opened');
      popupCloned.classList.remove('popup_closed');
    }, 1);

    const closeBtnCloned = popupCloned.querySelector('.popup__close-btn');
    closeBtnCloned.addEventListener('click', function () {
      closePopup(popupCloned);
    });
  }
}

//Закрытие попапа с картинками
function closePopup(popupCloned) {
  popupCloned.classList.remove('popup_opened');
  popupCloned.classList.add('popup_closed');

  setTimeout(() => {
    popupCloned.remove();
  }, 1000);
}

//обработчики на открытие попапов
btnEditProfile.addEventListener('click', openPopupEditProfile);
btnAddImage.addEventListener('click', openpopupAddCard);

//обработчики на закрытие попапов
btnClosePopupEditProfile.addEventListener('click', closePopupEditProfile);
btnClosePopupAddImage.addEventListener('click', closepopupAddCard);

//обработчики на формы
popupFormEditProfile.addEventListener('submit', submitPopupFormEditProfile);
popupFormAddImage.addEventListener('submit', submitPopupFormAddImage);

//обработчик на лайк
elements.addEventListener('click', likeOnCard);
//обработчик на удаление
elements.addEventListener('click', deleteCard);

//Обработчик на открытие попапа с картинками
elements.addEventListener('click', e => {
  openPopup(e);
});
