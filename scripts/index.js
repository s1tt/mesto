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

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

//Отправка формы редактирования профиля
function submitPopupFormEditProfile(evt) {
  evt.preventDefault();
  profile.name.textContent = formElements.popupEditProfile.name.value;
  profile.job.textContent = formElements.popupEditProfile.job.value;
  togglePopup(popups.popupEditProfile);
}

//Функция создания карточки
function createCardElement(item) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__img').src = item.link;
  cardElement.querySelector('.element__img').alt = item.name;
  cardElement.querySelector('.element__title').textContent = item.name;
  cardElement.querySelector('.element__like-btn').addEventListener('click', likeCard);
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
  togglePopup(popups.popupAddCard);
  return cardElement;
}

//Отображдение картинки, отправленную в форму
function showCardFromForm(evt) {
  evt.preventDefault();
  pageElements.sectionWithCards.prepend(submitPopupFormAddImage());
}

//Кнопка лайка
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

//обработчики на открытие попапов
pageElements.btnEditProfile.addEventListener('click', () => {
  togglePopup(popups.popupEditProfile);
  formElements.popupEditProfile.name.value = profile.name.textContent;
  formElements.popupEditProfile.job.value = profile.job.textContent;
});

pageElements.btnAddImage.addEventListener('click', () => {
  togglePopup(popups.popupAddCard);
});

pageElements.sectionWithCards.addEventListener('click', e => {
  if (e.target.classList.contains('element__img')) {
    togglePopup(popups.popupViewImage);
    popupViewImageInfo.img.src = e.target.src;
    popupViewImageInfo.img.alt = e.target.alt;
    popupViewImageInfo.figcaption.textContent = e.target.alt;
  }
});

//обработчики на закрытие попапов
btnsForClosingPopups.buttonsArray.forEach(btn => {
  btn.addEventListener('click', () => {
    const popup = popups[btn.dataset.popup];
    togglePopup(popup);
  });
});

//обработчики на формы
popupForms.formEditProfile.addEventListener('submit', submitPopupFormEditProfile);
popupForms.formAddCard.addEventListener('submit', showCardFromForm);

//обработчик на удаление карточки
pageElements.sectionWithCards.addEventListener('click', deleteCard);

//Устранение бага в хроме, когда transition срабатывает при загрузке страницы
window.addEventListener('load', () => {
  popups.popupContainers.forEach(popup => {
    popup.classList.remove('preload');
  });
});
