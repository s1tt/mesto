export default class Api {
  constructor(options) {
    this._cohort = options.cohort;
    this._baseUrl = options.baseUrl;
    this._token = options.headers.authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Запросить стартовые карточки с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/cards`, {
      headers: {
        authorization: this._token
      }
    }).then(this._checkResponse);
  }

  //Запросить инфо о текущем пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/users/me`, {
      headers: {
        authorization: this._token
      }
    }).then(this._checkResponse);
  }

  //Запрос на обновление инфо о текущем пользователе
  setUserInfo(name, about) {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    }).then(this._checkResponse);
  }

  //Запрос на добавление карточки
  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    }).then(this._checkResponse);
  }

  //Запрос на удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse);
  }

  //Запрос на установку лайка
  like(cardId) {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse);
  }

  //Запрос на снятие лайка
  dislike(cardId) {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse);
  }

  //Запрос на изменение аватара
  changeUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar
      })
    }).then(this._checkResponse);
  }
}
