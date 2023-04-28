import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { initialCards, settings, cardListSectionSelector, cardTemplateSelector, btnEditProfile, btnAddImage, popupContainers, popupEditProfileName, popupEditProfileJob, profileNameSelector, profileJobSelector, popupWithImageSelector, popupEditProfileSelector, popupAddCardSelector } from '../utils/constants.js';
import UserInfo from '../components/UserInfo';

const user = new UserInfo({
  userNameSelector: profileNameSelector,
  userJobSelector: profileJobSelector
});

const popupWithImage = new PopupWithImage(popupWithImageSelector);

const popupEditUserInfo = new PopupWithForm({
  selector: popupEditProfileSelector,
  handleFormSubmit: formData => {
    user.setUserInfo(formData.name, formData.job);
  }
});

const popupAddNewCard = new PopupWithForm({
  selector: popupAddCardSelector,
  handleFormSubmit: formData => {
    cardList.addItem(
      createNewCard({
        name: formData['img-title'],
        link: formData['img-link']
      })
    );
  }
});

//Функция создания карточки
function createNewCard(cardInfo) {
  const card = new Card(cardInfo, handleCardClick, cardTemplateSelector);
  return card.generate();
}

//Добавление всех карточек из массива на сайт
const cardList = new Section(
  {
    items: initialCards,
    renderer: cardInfo => {
      cardList.addItem(createNewCard(cardInfo));
    }
  },
  cardListSectionSelector
);
cardList.renderItems();

//Обработчик открытия попапа картинки карточки
function handleCardClick(title, link) {
  popupWithImage.open(title, link);
}

//Обработчик открытия попапа редактирования профиля
function handleEditProfileClick() {
  const { name, job } = user.getUserInfo();
  popupEditProfileName.value = name;
  popupEditProfileJob.value = job;
  popupEditUserInfo.open();
}

//Обработчик открытия попапа добавления картинки
function handleAddImageClick() {
  popupAddNewCard.open();
}

//Установка слушателей
btnEditProfile.addEventListener('click', handleEditProfileClick);
btnAddImage.addEventListener('click', handleAddImageClick);

popupWithImage.setEventListeners();
popupEditUserInfo.setEventListeners();
popupAddNewCard.setEventListeners();

const validation = () => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach(formElement => {
    const validator = new FormValidator(settings, formElement);
    validator.enableValidation();
  });
};

//запуск валидации
validation();

//Устранение бага в хроме, когда transition срабатывает при загрузке стрaницы
window.addEventListener('load', () => {
  popupContainers.forEach(popup => {
    popup.classList.remove('preload');
  });
});
