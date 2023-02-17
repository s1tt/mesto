//Проверка наличия невалидного поля
const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

//Активация/деактивация кнопки сабмита форм
const toggleButtonState = ({ inputList, buttonElement, inactiveButtonClass }) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

//Проверка инпута(1) на валидность
const isValid = ({ formElement, inputElement, inputErrorClass, errorClass }) => {
  if (!inputElement.validity.valid) {
    showInputError({ formElement, inputElement, errorMessage: inputElement.validationMessage, inputErrorClass, errorClass });
  } else {
    hideInputError({ formElement, inputElement, inputErrorClass, errorClass });
  }
};

//Показать ошибки инпута
const showInputError = ({ formElement, inputElement, errorMessage, inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

//Скрыть надписи ошибок инпута
const hideInputError = ({ formElement, inputElement, inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//Добавление обработчиков всем полям формы
const setEventListeners = ({ formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach(inputElement => {
    if (inputElement.value === '') {
      toggleButtonState({ inputList, buttonElement, inactiveButtonClass });
    }
    inputElement.addEventListener('input', () => {
      isValid({ formElement, inputElement, inputErrorClass, errorClass });
      toggleButtonState({ inputList, buttonElement, inactiveButtonClass });
    });
  });
};

//Добавление обработчиков всем формам
const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', event => {
      event.preventDefault();
      event.target.querySelector(submitButtonSelector).classList.add(inactiveButtonClass);
    });
    setEventListeners({ formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass });
  });
};

// Вызов функции для добавления обработчиков всем формам
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error-message_active'
});
