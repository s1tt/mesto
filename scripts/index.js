const pageElements = {
  page: document.querySelector('.page'),
  elements: document.querySelector('.elements'),
  btnEditProfile: document.querySelector('.profile__edit-button'),
  btnAddImage: document.querySelector('.profile__add-button')
};

const popups = {
  container: document.querySelector('.popup'),
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
};

const imgForpopup = popups.viewImage.querySelector('.popup__view-image-item');

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
  // popup.classList.toggle('popup_closed', !state);
}

// function togglePopup(popup) {
//   if (popup.classList.contains('popup_opened')) {
//     // popup.style.visibility = 'hidden';
//     popup.style.opacity = 0;
//     window.requestAnimationFrame(() => {
//       console.log('click');
//       popup.classList.remove('popup_opened');
//       console.log('click1');
//       popup.removeEventListener('transitionstart', handleTransitionEnd);
//       console.log('click2');
//     });
//   } else {
//     console.log('click3');
//     popup.classList.add('popup_opened');
//     console.log('click4');
//     window.requestAnimationFrame(() => {
//       console.log('click5');
//       popup.style.opacity = 1;
//       console.log('click6');
//     });
//     console.log('click7');
//     popup.addEventListener('transitionstart', handleTransitionEnd);
//     console.log('click8');
//   }
// }

function handleTransitionEnd(event) {
  console.log('click9');
  const popup = event.target;
  console.log('click10');
  if (!popup.classList.contains('popup_opened')) {
    console.log('click11');
    popup.style.opacity = '';
    console.log('click12');
  }
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
pageElements.btnEditProfile.addEventListener('click', () => {
  togglePopup(popups.editProfile);
  formElements.editProfile.name.value = profile.name.textContent;
  formElements.editProfile.job.value = profile.job.textContent;
});

pageElements.btnAddImage.addEventListener('click', () => {
  togglePopup(popups.addCard);
});

pageElements.elements.addEventListener('click', e => {
  togglePopup(popups.viewImage);
  imgForpopup.src = e.target.src;
});

//обработчики на закрытие попапов
closePopupBtns.buttonsArray.forEach(btn => {
  btn.addEventListener('click', () => {
    // popups[btn.dataset.popup].style.opacity = 0;
    // console.log(popups.container);
    // popups.container.setAttribute('visibility', 'hidden');
    const popup = popups[btn.dataset.popup];
    const popupOpened = document.querySelector('.popup_opened');

    togglePopup(popup);

    console.log(popupOpened);
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
// pageElements.elements.addEventListener('click', openPopupViewImage);
