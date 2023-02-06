let btnEditProfile = document.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let btnClosePopup = popup.querySelector('.popup__close-btn');

let popupNameValue = popup.querySelector('.popup__input_value_name');
let popupJobValue = popup.querySelector('.popup__input_value_job');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

//Закрыть попап
function closePopup() {
  popup.classList.remove('popup_opened');
}

//Открыть попап и считать данные в value
function popupOpen() {
  popup.classList.add('popup_opened');
  popupNameValue.value = profileName.textContent;
  popupJobValue.value = profileJob.textContent;
}

//Отправка формы/сохранение новых имени и работы || закрытие окна
function popupFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupNameValue.value;
  profileJob.textContent = popupJobValue.value;
  closePopup();
}

btnEditProfile.addEventListener('click', popupOpen);
btnClosePopup.addEventListener('click', closePopup);
popupForm.addEventListener('submit', popupFormSubmit);
