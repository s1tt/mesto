export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._userJob.textContent
    };
  }

  setUserInfo(name, job) {
    this._name.textContent = name;
    this._userJob.textContent = job;
  }
}
