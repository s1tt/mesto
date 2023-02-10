const pageElements = {
  page: document.querySelector('.page'),
  elements: document.querySelector('.elements'),
  btnEditProfile: document.querySelector('.profile__edit-button'),
  btnAddImage: document.querySelector('.profile__add-button')
};

const popups = {
  editProfile: document.querySelector('.popup_type_edit-profile'),
  addCard: document.querySelector('.popup_type_add-card'),
  viewImage: document.querySelector('.popup_type_view-image')
};

const popupForms = {
  editProfileForm: popups.editProfile.querySelector('.popup__form-edit'),
  addCardForm: popups.addCard.querySelector('.popup__form-add')
};

const closePopupBtns = {
  buttonsNode: document.querySelectorAll('.popup__close-btn'),
  buttonsArray: Array.from(document.querySelectorAll('.popup__close-btn'))
};

const formElements = {
  editProfile: {
    name: document.querySelector('.popup__input_value_name'),
    job: document.querySelector('.popup__input_value_job')
  },
  addCard: {
    title: document.querySelector('.popup__input_value_img-title'),
    link: document.querySelector('.popup__input_value_img-link')
  }
};

const profile = {
  name: document.querySelector('.profile__name'),
  job: document.querySelector('.profile__job')
};

const templates = {
  cardTemplate: document.querySelector('#card').content
  // popupViewImageTemplate: document.querySelector('#popup-view-image')
};

const imgForpopup = popups.viewImage.querySelector('.popup__view-image-item');

// const popupViewImage = {
//   popup: templates.popupViewImageTemplate.content.querySelector('.popup_type_view-image'),
//   img: templates.popupViewImageTemplate.content.querySelector('.popup__view-image-item'),
//   figcaption: templates.popupViewImageTemplate.content.querySelector('.popup__view-image-figcaption')
// };

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

// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   popup.classList.remove('popup_closed');
// }

// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   popup.classList.add('popup_closed');
// }

function togglePopup(popup, state) {
  popup.classList.toggle('popup_opened', state);
  popup.classList.toggle('popup_closed', !state);
}

//Закрыть попап
function closePopupEditProfile() {
  popups.editProfile.classList.remove('popup_opened');
  popups.editProfile.classList.add('popup_closed');
}

function closePopupAddCard() {
  popups.addCard.classList.remove('popup_opened');
  popups.addCard.classList.add('popup_closed');
}

function closePopupViewImage() {
  popups.viewImage.classList.remove('popup_opened');
  popups.viewImage.classList.add('popup_closed');
}

//Отправка формы редактирования профиля
function submitPopupFormEditProfile(evt) {
  evt.preventDefault();
  profile.name.textContent = formElements.editProfile.name.value;
  profile.job.textContent = formElements.editProfile.job.value;
  closePopupEditProfile();
}

//Отправка формы добавления новой картинки
function submitPopupFormAddImage(evt) {
  evt.preventDefault();
  const cardElement = templates.cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__img').src = formElements.addCard.link.value;
  cardElement.querySelector('.element__img').alt = formElements.addCard.title.value;
  cardElement.querySelector('.element__title').textContent = formElements.addCard.title.value;
  pageElements.elements.prepend(cardElement);
  closePopupAddCard();
}

//Кнопка лайка
function likeTheCard(evt) {
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
    const cardElement = templates.cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__img').src = item.link;
    cardElement.querySelector('.element__img').alt = item.name;
    cardElement.querySelector('.element__title').textContent = item.name;
    return cardElement;
  });
  pageElements.elements.append(...cardElements);
}
addPicturesFromArray(initialCards);

//обработчики на открытие попапов
// pageElements.btnEditProfile.addEventListener('click', () => {
//   openPopup(popups.editProfile);
//   formElements.editProfile.name.value = profile.name.textContent;
//   formElements.editProfile.job.value = profile.job.textContent;
// });

// pageElements.btnAddImage.addEventListener('click', () => {
//   openPopup(popups.addCard);
// });

// pageElements.elements.addEventListener('click', e => {
//   openPopup(popups.viewImage);
//   imgForpopup.src = e.target.src;
// });

pageElements.btnEditProfile.addEventListener('click', () => {
  togglePopup(popups.editProfile, true);
  formElements.editProfile.name.value = profile.name.textContent;
  formElements.editProfile.job.value = profile.job.textContent;
});

pageElements.btnAddImage.addEventListener('click', () => {
  togglePopup(popups.addCard, true);
});

pageElements.elements.addEventListener('click', e => {
  togglePopup(popups.viewImage, true);
  imgForpopup.src = e.target.src;
});

//обработчики на закрытие попапов
// closePopupBtns.buttonsArray[0].addEventListener('click', closePopupEditProfile);
// closePopupBtns.buttonsArray[1].addEventListener('click', closePopupAddCard);
// closePopupBtns.buttonsArray[2].addEventListener('click', closePopupViewImage);

closePopupBtns.buttonsArray.forEach(btn => {
  btn.addEventListener('click', () => {
    console.log(btn.dataset);
    togglePopup(popups[btn.dataset.popup], false);
  });
});

//обработчики на формы
popupForms.editProfileForm.addEventListener('submit', submitPopupFormEditProfile);
popupForms.addCardForm.addEventListener('submit', submitPopupFormAddImage);

//обработчик на лайк
pageElements.elements.addEventListener('click', likeTheCard);
//обработчик на удаление карточки
pageElements.elements.addEventListener('click', deleteCard);

//Обработчик на открытие попапа с картинками
pageElements.elements.addEventListener('click', openPopupViewImage);
