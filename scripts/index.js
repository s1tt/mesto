const pageElements = {
  page: document.querySelector('.page'),
  sectionWithCards: document.querySelector('.elements'),
  btnEditProfile: document.querySelector('.profile__edit-button'),
  btnAddImage: document.querySelector('.profile__add-button')
};

const popups = {
  popupContainers: document.querySelectorAll('.popup'),
  popupEditProfile: document.querySelector('.popup_type_edit-profile'),
  popupAddCard: document.querySelector('.popup_type_add-card'),
  popupViewImage: document.querySelector('.popup_type_view-image')
};

const popupViewImageInfo = {
  img: popups.popupViewImage.querySelector('.popup__view-image-item'),
  figcaption: popups.popupViewImage.querySelector('.popup__view-image-figcaption')
};

const popupForms = {
  formEditProfile: popups.popupEditProfile.querySelector('.popup__form-edit'),
  formAddCard: popups.popupAddCard.querySelector('.popup__form-add')
};

const btnsForClosingPopups = {
  buttonsNode: document.querySelectorAll('.popup__close-btn'),
  buttonsArray: Array.from(document.querySelectorAll('.popup__close-btn'))
};

const formElements = {
  popupEditProfile: {
    name: document.querySelector('.popup__input_value_name'),
    job: document.querySelector('.popup__input_value_job')
  },
  popupAddCard: {
    title: document.querySelector('.popup__input_value_img-title'),
    link: document.querySelector('.popup__input_value_img-link')
  }
};

const profile = {
  name: document.querySelector('.profile__name'),
  job: document.querySelector('.profile__job')
};

const cardTemplate = document.querySelector('#card').content;

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

//Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Отправка формы редактирования профиля
function submitPopupFormEditProfile(evt) {
  evt.preventDefault();
  profile.name.textContent = formElements.popupEditProfile.name.value;
  profile.job.textContent = formElements.popupEditProfile.job.value;
  closePopup(popups.popupEditProfile);
}

//Функция создания карточки
function createCardElement(item) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const imgForCardElement = cardElement.querySelector('.element__img');
  const titleForCardElement = cardElement.querySelector('.element__title');

  imgForCardElement.src = item.link;
  imgForCardElement.alt = item.name;
  titleForCardElement.textContent = item.name;

  //Обработчик на кнопку лайка
  cardElement.querySelector('.element__like-btn').addEventListener('click', likeCard);

  //Обработчик на удаление карточки
  cardElement.querySelector('.element__trash-btn').addEventListener('click', deleteCard);

  //Обработчик на открытие попапа для отображения картинок
  imgForCardElement.addEventListener('click', () => {
    openPopup(popups.popupViewImage);
    popupViewImageInfo.img.src = imgForCardElement.src;
    popupViewImageInfo.img.alt = imgForCardElement.alt;
    popupViewImageInfo.figcaption.textContent = imgForCardElement.alt;
  });

  return cardElement;
}

//Добавление картинок из массива
function addPicturesFromArray(arr) {
  const cardElements = arr.map(item => createCardElement(item));
  pageElements.sectionWithCards.append(...cardElements);
}
addPicturesFromArray(initialCards);

//Отправка формы добавления новой картинки
function submitPopupFormAddImage() {
  const cardElement = createCardElement({
    link: formElements.popupAddCard.link.value,
    name: formElements.popupAddCard.title.value
  });
  formElements.popupAddCard.link.value = '';
  formElements.popupAddCard.title.value = '';
  closePopup(popups.popupAddCard);
  return cardElement;
}

//Отображдение картинки, отправленную в форму
function showCardFromForm(evt) {
  evt.preventDefault();
  pageElements.sectionWithCards.prepend(submitPopupFormAddImage());
}

//Добавление/удаление лайка
function likeCard(evt) {
  evt.target.classList.toggle('element__like-btn_active');
}

//Удаление карточки
function deleteCard(evt) {
  if (evt.target.classList.contains('element__trash-btn')) {
    const cardItem = evt.target.closest('.element');
    cardItem.remove();
  }
}

//Обработчики на открытие попапов
pageElements.btnEditProfile.addEventListener('click', () => {
  openPopup(popups.popupEditProfile);
  formElements.popupEditProfile.name.value = profile.name.textContent;
  formElements.popupEditProfile.job.value = profile.job.textContent;
});

pageElements.btnAddImage.addEventListener('click', () => {
  openPopup(popups.popupAddCard);
});

//Обработчик на закрытие попапов
btnsForClosingPopups.buttonsArray.forEach(btn => {
  console.log(btn.closest('.popup'));
  btn.addEventListener('click', () => {
    closePopup(btn.closest('.popup'));
  });
});

//Обработчики на формы
popupForms.formEditProfile.addEventListener('submit', submitPopupFormEditProfile);
popupForms.formAddCard.addEventListener('submit', showCardFromForm);

//Устранение бага в хроме, когда transition срабатывает при загрузке страницы
window.addEventListener('load', () => {
  popups.popupContainers.forEach(popup => {
    popup.classList.remove('preload');
  });
});
