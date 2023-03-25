import { Card } from './Card.js';

const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddImage = document.querySelector('.profile__add-button');

const popupContainers = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');

const formEditProfile = popupEditProfile.querySelector('.popup__form-edit');
const formAddCard = popupAddCard.querySelector('.popup__form-add');

const buttonsArray = Array.from(document.querySelectorAll('.popup__close-btn'));

const popupEditProfileName = document.querySelector('.popup__input_value_name');
const popupEditProfileJob = document.querySelector('.popup__input_value_job');
const popupAddCardTitle = document.querySelector('.popup__input_value_img-title');
const popupAddCardLink = document.querySelector('.popup__input_value_img-link');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//Функция открытия попапа
export function openPopup(popup) {
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
  if (!evt.target.classList.contains('popup')) {
    return;
  }
  closePopup(evt.target);
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
  if (!popupEditProfileName || !popupEditProfileJob) {
    return;
  }
  profileName.textContent = popupEditProfileName.value;
  profileJob.textContent = popupEditProfileJob.value;
  closePopup(popupEditProfile);
}

//Отображение имени и должности в попапе редактирования профиля
function copyNameAndJobFromHTMLtoPopup() {
  popupEditProfileName.value = profileName.textContent;
  popupEditProfileJob.value = profileJob.textContent;
}
copyNameAndJobFromHTMLtoPopup();

//Отправка формы добавления новой картинки
function submitPopupFormAddImage() {
  addNewCard({ name: popupAddCardTitle.value, link: popupAddCardLink.value });

  popupAddCardLink.value = '';
  popupAddCardTitle.value = '';
  closePopup(popupAddCard);
}

//Добавление карточки на сайт
export function addNewCard(cardInfo) {
  const card = new Card(cardInfo, '#card').generate();
  document.querySelector('.elements').prepend(card);
}

//Функции обработчиков открытия попапов
function handleEditProfileClick() {
  openPopup(popupEditProfile);
  copyNameAndJobFromHTMLtoPopup();
}

function handleAddImageClick() {
  openPopup(popupAddCard);
}

//Обработчики на открытие попапов
btnEditProfile.addEventListener('click', handleEditProfileClick);
btnAddImage.addEventListener('click', handleAddImageClick);

//Обработчик на закрытие попапов
buttonsArray.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => {
    closePopup(popup);
  });
});

//Обработчики на формы
formEditProfile.addEventListener('submit', handleSubmitPopupFormEditProfile);
formAddCard.addEventListener('submit', submitPopupFormAddImage);

//Установка обработчика клика по оверлею
popupContainers.forEach(popup => {
  popup.addEventListener('click', handleClosePopupByOverlay);
});

//Устранение бага в хроме, когда transition срабатывает при загрузке стрaницы
window.addEventListener('load', () => {
  popupContainers.forEach(popup => {
    popup.classList.remove('preload');
  });
});
