let editBtn = document.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let form = popup.querySelector('.popup__form');
let closeBtn = popup.querySelector('.popup__close-ico');

let popupName = popup.querySelector('.popup__input-name');
let popupJob = popup.querySelector('.popup__input-job');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function closePopup() {
  popup.classList.remove('popup_opened');
}

editBtn.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
});

closeBtn.addEventListener('click', closePopup);

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  closePopup();
});
