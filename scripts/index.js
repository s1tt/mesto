const pageElements = {
  page: document.querySelector('.page'),
  elements: document.querySelector('.elements'),
  btnEditProfile: document.querySelector('.profile__edit-button'),
  btnAddImage: document.querySelector('.profile__add-button')
};

const popups = {
  editProfile: document.querySelector('.popup_type_edit-profile'),
  addCard: document.querySelector('.popup_type_add-card')
};

const popupForms = {
  editProfileForm: popups.editProfile.querySelector('.popup__form-edit'),
  addCardForm: popups.addCard.querySelector('.popup__form-add')
};

const closePopupBtns = {
  buttonsNode: document.querySelectorAll('.popup__close-btn'),
  buttonsArray: Array.from(document.querySelectorAll('.popup__close-btn'))
};

const popupFormValues = {
  inputNameValue: popups.editProfile.querySelector('.popup__input_value_name'),
  inputJobValue: popups.editProfile.querySelector('.popup__input_value_job'),
  inputImgTitleValue: popups.addCard.querySelector('.popup__input_value_img-title'),
  inputImgLinkValue: popups.addCard.querySelector('.popup__input_value_img-link')
};

const profile = {
  name: document.querySelector('.profile__name'),
  job: document.querySelector('.profile__job')
};

const templates = {
  cardTemplate: document.querySelector('#card').content,
  popupViewImageTemplate: document.querySelector('#popup-view-image')
};

const popupViewImage = {
  popup: templates.popupViewImageTemplate.content.querySelector('.popup_type_view-image'),
  img: templates.popupViewImageTemplate.content.querySelector('.popup__view-image-item'),
  figcaption: templates.popupViewImageTemplate.content.querySelector('.popup__view-image-figcaption')
};

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
function openPopupAddCard() {
  popups.addCard.classList.add('popup_opened');
  popups.addCard.classList.remove('popup_closed');
}

function openPopupEditProfile() {
  popups.editProfile.classList.add('popup_opened');
  popups.editProfile.classList.remove('popup_closed');
  popupFormValues.inputNameValue.value = profile.name.textContent;
  popupFormValues.inputJobValue.value = profile.job.textContent;
}
//Закрыть попап
function closePopupEditProfile() {
  console.log('click!');
  popups.editProfile.classList.remove('popup_opened');
  popups.editProfile.classList.add('popup_closed');
}

function closePopupAddCard() {
  console.log('click!!');
  popups.addCard.classList.remove('popup_opened');
  popups.addCard.classList.add('popup_closed');
}

//Отправка формы редактирования профиля
function submitPopupFormEditProfile(evt) {
  evt.preventDefault();
  profile.name.textContent = popupFormValues.inputNameValue.value;
  profile.job.textContent = popupFormValues.inputJobValue.value;
  closePopupEditProfile();
}

//Отправка формы добавления новой картинки
function submitPopupFormAddImage(evt) {
  evt.preventDefault();
  const cardElement = templates.cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__img').src = popupFormValues.inputImgLinkValue.value;
  cardElement.querySelector('.element__img').alt = popupFormValues.inputImgTitleValue.value;
  cardElement.querySelector('.element__title').textContent = popupFormValues.inputImgTitleValue.value;
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

//Открытие попапа с картинками
function openPopupViewImage(e) {
  if (e.target.classList.contains('element__img')) {
    popupViewImage.img.src = e.target.src;
    popupViewImage.img.alt = e.target.alt;
    popupViewImage.figcaption.textContent = e.target.alt;

    const popupCloned = popupViewImage.popup.cloneNode(true);
    pageElements.page.appendChild(popupCloned);

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
pageElements.btnEditProfile.addEventListener('click', openPopupEditProfile);
pageElements.btnAddImage.addEventListener('click', openPopupAddCard);

//обработчики на закрытие попапов
closePopupBtns.buttonsArray[0].addEventListener('click', closePopupEditProfile);
closePopupBtns.buttonsArray[1].addEventListener('click', closePopupAddCard);

//обработчики на формы
popupForms.editProfileForm.addEventListener('submit', submitPopupFormEditProfile);
popupForms.addCardForm.addEventListener('submit', submitPopupFormAddImage);

//обработчик на лайк
pageElements.elements.addEventListener('click', likeTheCard);
//обработчик на удаление карточки
pageElements.elements.addEventListener('click', deleteCard);

//Обработчик на открытие попапа с картинками
pageElements.elements.addEventListener('click', openPopupViewImage);
