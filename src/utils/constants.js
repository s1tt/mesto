//Массив со стандартными картинками
export const initialCards = [
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

export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error-message_active'
};

export const cardListSectionSelector = '.elements';
export const cardTemplateSelector = '#card';

export const popupWithImageSelector = '.popup_type_view-image';
export const popupEditProfileSelector = '.popup_type_edit-profile';
export const popupAddCardSelector = '.popup_type_add-card';
export const profileNameSelector = '.profile__name';
export const profileJobSelector = '.profile__job';

export const btnEditProfile = document.querySelector('.profile__edit-button');
export const btnAddImage = document.querySelector('.profile__add-button');

export const popupContainers = document.querySelectorAll('.popup');

export const popupEditProfileName = document.querySelector('.popup__input_value_name');
export const popupEditProfileJob = document.querySelector('.popup__input_value_job');
