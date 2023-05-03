import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';
import { settings, cardListSectionSelector, cardTemplateSelector, btnEditProfile, btnAddImage, popupContainers, popupEditProfileName, popupEditProfileJob, profileNameSelector, profileJobSelector, popupWithImageSelector, popupEditProfileSelector, popupAddCardSelector, cohort, authorization, baseUrl, userAvatarEl, avatarBtn, popupChangeAvatarSelector, popupDeleteCardSelector } from '../utils/constants.js';
import UserInfo from '../components/UserInfo';
import PopupWithConfirm from '../components/PopupWithConfirm';

//Создаем объекты
//Создаем пользователя
const user = new UserInfo({
  userNameSelector: profileNameSelector,
  userJobSelector: profileJobSelector
});

//Создаем попап просмотра картинок
const popupWithImage = new PopupWithImage(popupWithImageSelector);

//Создаем попап редактирования имени и описания пользователя
const popupEditUserInfo = new PopupWithForm({
  selector: popupEditProfileSelector,
  handleFormSubmit: formData => {
    popupEditUserInfo.setLoadingBtnText();
    api
      .setUserInfo(formData.name, formData.job)
      .then(userInfo => user.setUserInfo(user.getUserId(), userInfo.name, userInfo.about))
      .finally(() => popupEditUserInfo.setStartBtnText());
  }
});

//Создаем попап изменения аватара пользователя
const popupChangeUserAvatar = new PopupWithForm({
  selector: popupChangeAvatarSelector,
  handleFormSubmit: formData => {
    popupChangeUserAvatar.setLoadingBtnText();
    api
      .changeUserAvatar(formData['img-link'])
      .then(res => (userAvatarEl.src = res.avatar))
      .finally(() => popupChangeUserAvatar.setStartBtnText());
  }
});

//Создаем попап добавления новой картинки
const popupAddNewCard = new PopupWithForm({
  selector: popupAddCardSelector,
  //Добавление новой карточки
  handleFormSubmit: formData => {
    popupAddNewCard.setLoadingBtnText();
    api
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
      .catch(res => console.log('Error: ' + res))
      .finally(() => popupAddNewCard.setStartBtnText());
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
api
  .getUserInfo()
  //Инициализация юзера
  .then(userInfo => {
    user.setUserInfo(userInfo._id, userInfo.name, userInfo.about);
    userAvatarEl.src = userInfo.avatar;
  })
  .then(() => {
    //Добавление карточек только после инициализации юзера
    api.getInitialCards().then(data => cardList.renderItems(data));
  });

//Функция создания карточки
function createNewCard(cardInfo) {
  const card = new Card(cardInfo, handleCardClick, handleConfirmDeleteCard, handleLikeClick, cardTemplateSelector, api, user.getUserId());
  return card.generate();
}

//Обработчик клика на лайк
function handleLikeClick(cardId, isLiked, likeToggle) {
  if (isLiked) {
    api.dislike(cardId).then(res => {
      console.log(`Лайков на карте ${res.likes.length}`);
      likeToggle(res.likes.length);
    });
  } else {
    api.like(cardId).then(res => {
      console.log(`Лайков на карте ${res.likes.length}`);
      likeToggle(res.likes.length);
    });
  }
}

////Обработчик подтверждения удаления
function handleConfirmDeleteCard(cardId, deleteCardFromFront) {
  popupDeleteCard.open();
  popupDeleteCard.submit(() => {
    popupDeleteCard.setLoadingBtnText();
    api
      .deleteCard(cardId)
      .then(() => deleteCardFromFront())
      .catch(res => console.log('Error' + res))
      .finally(() => popupDeleteCard.setStartBtnText());
  });
}

//Обработчик клика на картинки
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

//Обработчик открытия попапа редактирования аватара
function handleChangeAvatar() {
  popupChangeUserAvatar.open();
}

//Установка слушателей
btnEditProfile.addEventListener('click', handleEditProfileClick);
btnAddImage.addEventListener('click', handleAddImageClick);
avatarBtn.addEventListener('click', handleChangeAvatar);

popupWithImage.setEventListeners();
popupEditUserInfo.setEventListeners();
// popupEditUserInfo.setLoadingBtnText();
popupAddNewCard.setEventListeners();
// popupAddNewCard.setLoadingBtnText();
popupDeleteCard.setEventListeners();
// popupDeleteCard.setLoadingBtnText();
popupChangeUserAvatar.setEventListeners();
// changeUserAvatar.setLoadingBtnText();

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
