import { initialCards as arrayWithCards } from './cards.js';

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
const cardElementTemplate = cardTemplate.querySelector('.element');

//Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');

  //Установка обработчика на закрытие попаов кнопкой ESC
  document.addEventListener('keydown', handleClosePopupOnEscape);
}

//Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');

  //Удаление обработчика на закрытие попаов кнопкой ESC
  document.removeEventListener('keydown', handleClosePopupOnEscape);
}

//Функция закрытия попапа кликом на оверлей
function handleClosePopupByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

// Функция закрытия попапа кнопкой ESC
function handleClosePopupOnEscape(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    if (popup) {
      closePopup(popup);
    }
  }
}

//Отправка формы редактирования профиля
function handleSubmitPopupFormEditProfile(evt) {
  evt.preventDefault();
  profile.name.textContent = formElements.popupEditProfile.name.value;
  profile.job.textContent = formElements.popupEditProfile.job.value;
  closePopup(popups.popupEditProfile);
}

//Отображение имени и должности в попапе редактирования профиля
function copyNameAndJobFromHTMLtoPopup() {
  formElements.popupEditProfile.name.value = profile.name.textContent;
  formElements.popupEditProfile.job.value = profile.job.textContent;
}
copyNameAndJobFromHTMLtoPopup();

//Функция создания карточки
function createCardElement(item) {
  const cardElement = cardElementTemplate.cloneNode(true);
  const imgForCardElement = cardElement.querySelector('.element__img');
  const titleForCardElement = cardElement.querySelector('.element__title');

  imgForCardElement.src = item.link;
  imgForCardElement.alt = item.name;
  titleForCardElement.textContent = item.name;

  //Функция обработчика для открытия попапа просмотра картинок
  function handleOpenPopupViewImage() {
    openPopup(popups.popupViewImage);
    popupViewImageInfo.img.src = imgForCardElement.src;
    popupViewImageInfo.img.alt = imgForCardElement.alt;
    popupViewImageInfo.figcaption.textContent = imgForCardElement.alt;
  }

  //Обработчик на кнопку лайка
  cardElement.querySelector('.element__like-btn').addEventListener('click', handleLikeCard);

  //Обработчик на удаление карточки
  cardElement.querySelector('.element__trash-btn').addEventListener('click', handleDeleteCard);

  //Обработчик на открытие попапа для отображения картинок
  imgForCardElement.addEventListener('click', handleOpenPopupViewImage);

  return cardElement;
}

//Добавление картинок из массива
function addPicturesFromArray(arr) {
  const cardElements = arr.map(item => createCardElement(item));
  pageElements.sectionWithCards.append(...cardElements);
}
addPicturesFromArray(arrayWithCards);

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
function handleShowCardFromForm(evt) {
  evt.preventDefault();
  pageElements.sectionWithCards.prepend(submitPopupFormAddImage());
}

//Добавление/удаление лайка
function handleLikeCard(evt) {
  evt.target.classList.toggle('element__like-btn_active');
}

//Удаление карточки
function handleDeleteCard(evt) {
  const cardItem = evt.target.closest('.element');
  cardItem.remove();
}

//Функции обработчиков открытия попапов
function handleEditProfileClick() {
  openPopup(popups.popupEditProfile);
  copyNameAndJobFromHTMLtoPopup();
}

function handleAddImageClick() {
  openPopup(popups.popupAddCard);
}

//Обработчики на открытие попапов
pageElements.btnEditProfile.addEventListener('click', handleEditProfileClick);
pageElements.btnAddImage.addEventListener('click', handleAddImageClick);

//Обработчик на закрытие попапов
btnsForClosingPopups.buttonsArray.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => {
    closePopup(popup);
  });
});

//Обработчики на формы
popupForms.formEditProfile.addEventListener('submit', handleSubmitPopupFormEditProfile);
popupForms.formAddCard.addEventListener('submit', handleShowCardFromForm);

//Установка обработчика клика по оверлею
popups.popupContainers.forEach(popup => {
  popup.addEventListener('click', handleClosePopupByOverlay);
});

//Устранение бага в хроме, когда transition срабатывает при загрузке стрaницы
window.addEventListener('load', () => {
  popups.popupContainers.forEach(popup => {
    popup.classList.remove('preload');
  });
});
