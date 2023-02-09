const page = document.querySelector('.page');

const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddImage = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup__edit');
const popupAdd = document.querySelector('.popup__add');
const popupImg = document.querySelector('.popup-img');

const popupForm = popupEdit.querySelector('.popup__form-edit');
const popupAddForm = popupAdd.querySelector('.popup__form-add');

const btnClosePopup = popupEdit.querySelector('.popup__close-btn');
const btnclosePopupAdd = popupAdd.querySelector('.popup__close-btn');

const popupNameValue = popupEdit.querySelector('.popup__input_value_name');
const popupJobValue = popupEdit.querySelector('.popup__input_value_job');

const popupImgTitleValue = popupAdd.querySelector('.popup__input_value_img-title');
const popupImgLinkValue = popupAdd.querySelector('.popup__input_value_img-link');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const cardTemplate = document.querySelector('#element').content;
const elements = document.querySelector('.elements');

const popupTemplate = document.querySelector('#popup-img');
const popup = popupTemplate.content.querySelector('.popup');
const closeBtn = popupTemplate.content.querySelector('.popup__close-btn');
const img = popupTemplate.content.querySelector('.popup-img__img');
const figcaption = popupTemplate.content.querySelector('.popup-img__figcaption-img');

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
function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
  popupAdd.classList.remove('popup_closed');
}

function openPopupEdit() {
  popupEdit.classList.add('popup_opened');
  popupEdit.classList.remove('popup_closed');
  popupNameValue.value = profileName.textContent;
  popupJobValue.value = profileJob.textContent;
}
//Закрыть попап
function closePopupEdit() {
  popupEdit.classList.remove('popup_opened');
  popupEdit.classList.add('popup_closed');
}

function closePopupAdd() {
  popupAdd.classList.remove('popup_opened');
  popupAdd.classList.add('popup_closed');
}

//Отправка формы/сохранение новых имени и работы
function submitPopupForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupNameValue.value;
  profileJob.textContent = popupJobValue.value;
  closePopupEdit();
}

//Функция добавления новой картинки
function addPopupForm(evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__img').src = popupImgLinkValue.value;
  cardElement.querySelector('.element__img').alt = popupImgTitleValue.value;
  cardElement.querySelector('.element__title').textContent = popupImgTitleValue.value;
  elements.prepend(cardElement);
  closePopupAdd();
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
btnEditProfile.addEventListener('click', openPopupEdit);
btnAddImage.addEventListener('click', openPopupAdd);

//обработчики на закрытие попапов
btnClosePopup.addEventListener('click', closePopupEdit);
btnclosePopupAdd.addEventListener('click', closePopupAdd);

//обработчики на формы
popupForm.addEventListener('submit', submitPopupForm);
popupAddForm.addEventListener('submit', addPopupForm);

//обработчик на лайк
elements.addEventListener('click', likeOnCard);
//обработчик на удаление
elements.addEventListener('click', deleteCard);

//Обработчик на открытие попапа с картинками
elements.addEventListener('click', e => {
  openPopup(e);
});
