//Проверка наличия невалидного поля
const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

//Активация/деактивация кнопки сабмита форм после проверки на валидность
const toggleButtonState = ({ inputList, buttonElement, inactiveButtonClass }) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton({ buttonElement, inactiveButtonClass });
  } else {
    enableSubmitButton({ buttonElement, inactiveButtonClass });
  }
};

const enableSubmitButton = ({ buttonElement, inactiveButtonClass }) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled', true);
};

const disableSubmitButton = ({ buttonElement, inactiveButtonClass }) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
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
const setEventListeners = ({ formElement, inputList, buttonElement, inactiveButtonClass, inputErrorClass, errorClass }) => {
  inputList.forEach(inputElement => {
    //Проверяем заполнены ли поля изначально и отключаем кнопку если нет
    toggleButtonState({ inputList, buttonElement, inactiveButtonClass });
    inputElement.addEventListener('input', () => {
      //Проверка на валидность после ввода каждого символа
      isValid({ formElement, inputElement, inputErrorClass, errorClass });
      toggleButtonState({ inputList, buttonElement, inactiveButtonClass });
    });
  });
};

//Добавление обработчиков всем формам
const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach(formElement => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    formElement.addEventListener('submit', event => {
      event.preventDefault();
      //Проверяем, если обнулили инпуты после отправки формы, отключаем кнопку
      toggleButtonState({ inputList, buttonElement, inactiveButtonClass });
    });
    setEventListeners({ formElement, inputList, buttonElement, inactiveButtonClass, inputErrorClass, errorClass });
  });
};

const validation = () => {
  enableValidation({
    // Вызов функции для добавления обработчиков всем формам
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error-message_active'
  });
};

//Запускаем скрипт после полной загрузки страницы для корректного определения
//заполнены ли изначально поля формы
window.addEventListener('load', validation);
