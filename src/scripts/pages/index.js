import '../../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { initialCards, settings, cardListSection, cardTemplate, btnEditProfile, btnAddImage, popupContainers, popupEditProfileName, popupEditProfileJob, profileNameSelector, profileJobSelector, popupWithImageSelector, popupEditProfileSelector, popupAddCardSelector } from '../utils/constants.js';
import UserInfo from '../components/UserInfo';

const user = new UserInfo({
  userNameSelector: profileNameSelector,
  userJobSelector: profileJobSelector
});

//Функция создания карточки
function createNewCard(cardInfo) {
  const card = new Card(cardInfo, handleOpenPopup, cardTemplate);
  const cardElement = card.generate();
  return cardElement;
}

//Добавление всех карточек из массива на сайт
const cardList = new Section(
  {
    items: initialCards,
    renderer: cardInfo => {
      cardList.addItem(createNewCard(cardInfo));
    }
  },
  cardListSection
);
cardList.renderItems();

//Обработчик открытия попапа картинки карточки
function handleOpenPopup(name, link) {
  const popup = new PopupWithImage(popupWithImageSelector, name, link);
  popup.open();
  popup.setEventListeners();
}

//Обработчик открытия попапа редактирования профиля
function handleEditProfileClick() {
  const { name, job } = user.getUserInfo();
  popupEditProfileName.value = name;
  popupEditProfileJob.value = job;
  const popup = new PopupWithForm({
    selector: popupEditProfileSelector,
    //Отправка формы редактирования профиля
    handleFormSubmit: formData => {
      user.setUserInfo(formData.name, formData.job);
    }
  });
  popup.open();
  popup.setEventListeners();
}

//Обработчик открытия попапа добавления картинки
function handleAddImageClick() {
  const popup = new PopupWithForm({
    selector: popupAddCardSelector,
    //Отправка формы добавления новой карточки
    handleFormSubmit: formData => {
      //Отристовка новой карточки
      const card = new Section(
        {
          items: [{ name: formData['img-title'], link: formData['img-link'] }],
          renderer: cardInfo => {
            card.addItem(createNewCard(cardInfo));
          }
        },
        cardListSection
      );
      card.renderItems();
    }
  });
  popup.open();
  popup.setEventListeners();
}

//Обработчики на открытие попапов
btnEditProfile.addEventListener('click', handleEditProfileClick);
btnAddImage.addEventListener('click', handleAddImageClick);

const validation = () => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach(formElement => {
    const validator = new FormValidator(settings, formElement);
    validator.enableValidation();
  });
};

//запуск валидации после полной загрузки страницы
window.addEventListener('load', validation);

//Устранение бага в хроме, когда transition срабатывает при загрузке стрaницы
window.addEventListener('load', () => {
  popupContainers.forEach(popup => {
    popup.classList.remove('preload');
  });
});
