import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';
import { settings, cardListSectionSelector, cardTemplateSelector, btnEditProfile, btnAddImage, popupContainers, profileNameSelector, profileJobSelector, popupWithImageSelector, popupEditProfileSelector, popupAddCardSelector, cohort, authorization, baseUrl, avatarBtn, avatarSelector, popupChangeAvatarSelector, popupDeleteCardSelector } from '../utils/constants.js';
import UserInfo from '../components/UserInfo';
import PopupWithConfirm from '../components/PopupWithConfirm';

//Создаем объекты
//Создаем пользователя
const user = new UserInfo({
  userNameSelector: profileNameSelector,
  userJobSelector: profileJobSelector,
  avatarSelector: avatarSelector
});

//Создаем попап просмотра картинок
const popupWithImage = new PopupWithImage(popupWithImageSelector);

//Создаем попап редактирования имени и описания пользователя
const popupEditUserInfo = new PopupWithForm({
  selector: popupEditProfileSelector,
  handleFormSubmit: formData => {
    return api
      .setUserInfo(formData.name, formData.job)
      .then(userInfo => user.setUserInfo(user.getUserId(), userInfo.name, userInfo.about))
      .catch(err => console.log('Error: ' + err));
  }
});

//Создаем попап изменения аватара пользователя
const popupChangeUserAvatar = new PopupWithForm({
  selector: popupChangeAvatarSelector,
  handleFormSubmit: formData => {
    return api
      .changeUserAvatar(formData['img-link'])
      .then(res => user.setUserAvatar(res.avatar))
      .catch(err => console.log('Error: ' + err));
  }
});

//Создаем попап добавления новой картинки
const popupAddNewCard = new PopupWithForm({
  selector: popupAddCardSelector,
  //Добавление новой карточки
  handleFormSubmit: formData => {
    return api
      .addNewCard(formData['img-title'], formData['img-link'])
      .then(res => {
        cardList.addItem(
          createNewCard({
            name: res.name,
            link: res.link,
            popupCardId: res._id,
            popupCardOwner: res.owner._id
          })
        );
      })
      .catch(err => console.log('Error: ' + err));
  }
});

//Создаем попап подтверждения удаления карточки
const popupDeleteCard = new PopupWithConfirm({
  selector: popupDeleteCardSelector,
  handleFormSubmit: () => {}
});

//Создаем инстанс класса для отрисовки карточек
const cardList = new Section(
  {
    renderer: cardInfo => {
      cardList.addItem(createNewCard(cardInfo));
    }
  },
  cardListSectionSelector
);

//Создаем инстанс класса, для обращения к серверу
const api = new Api({
  cohort,
  baseUrl,
  headers: {
    authorization
  }
});

//Инициализации юзера, добавление карточек из бэка на сайт
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, cards]) => {
    //Инициализация юзера
    user.setUserInfo(userInfo._id, userInfo.name, userInfo.about);
    user.setUserAvatar(userInfo.avatar);
    //Добавление карточек
    cardList.renderItems(cards);
  })
  .catch(err => console.log('Error: ' + err));

//Функция создания карточки
function createNewCard(cardInfo) {
  const card = new Card(cardInfo, handleCardClick, handleConfirmDeleteCard, handleLikeClick, cardTemplateSelector, api, user.getUserId());
  return card.generate();
}

//Обработчик клика на лайк
function handleLikeClick(cardId, isLiked, likeToggle) {
  if (isLiked) {
    api
      .dislike(cardId)
      .then(res => {
        console.log(`Лайков на карте ${res.likes.length}`);
        likeToggle(res.likes.length);
      })
      .catch(err => console.log('Error: ' + err));
  } else {
    api
      .like(cardId)
      .then(res => {
        console.log(`Лайков на карте ${res.likes.length}`);
        likeToggle(res.likes.length);
      })
      .catch(err => console.log('Error: ' + err));
  }
}

////Обработчик подтверждения удаления
function handleConfirmDeleteCard(cardId, deleteCardFromFront) {
  popupDeleteCard.open();
  popupDeleteCard.submit(() => {
    return api
      .deleteCard(cardId)
      .then(() => deleteCardFromFront())
      .catch(err => console.log('Error: ' + err));
  });
}

//Обработчик клика на картинки
function handleCardClick(title, link) {
  popupWithImage.open(title, link);
}

//Обработчик открытия попапа редактирования профиля
function handleEditProfileClick() {
  validation();
  const { name, job } = user.getUserInfo();
  popupEditUserInfo.open();
  popupEditUserInfo.setInputValues({ name, job });
}

//Обработчик открытия попапа добавления картинки
function handleAddImageClick() {
  popupAddNewCard.open();
  validation();
}

//Обработчик открытия попапа редактирования аватара
function handleChangeAvatar() {
  popupChangeUserAvatar.open();
  validation();
}

//Установка слушателей
btnEditProfile.addEventListener('click', handleEditProfileClick);
btnAddImage.addEventListener('click', handleAddImageClick);
avatarBtn.addEventListener('click', handleChangeAvatar);

popupWithImage.setEventListeners();
popupEditUserInfo.setEventListeners();
popupAddNewCard.setEventListeners();
popupDeleteCard.setEventListeners();
popupChangeUserAvatar.setEventListeners();

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
