export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._id = null;
  }

  //Получить ИД пользователя
  getUserId() {
    return this._id;
  }

  //Получить имя и описание пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._userJob.textContent
    };
  }

  //Установить данные пользователя
  setUserInfo(id, name, job) {
    this._id = id;
    this._name.textContent = name;
    this._userJob.textContent = job;
  }
}
