export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _errorProcessing(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  handleAvatar(data) {
    return fetch(this._url + `/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._errorProcessing);
  }

  getUserInfo() {
    return fetch(this._url + "/users/me", {
      method: "GET",
      headers: this._headers,
    }).then(this._errorProcessing);
  }

  handleUserInfoApi(data) {
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.userName,
        about: data.job,
      }),
    }).then(this._errorProcessing);
  }

  getInitialCards() {
    return fetch(this._url + "/cards", {
      method: "GET",
      headers: this._headers,
    }).then(this._errorProcessing);
  }

  handleAddCard(data) {
    return fetch(this._url + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._errorProcessing);
  }

  getInformation() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  deleteCard(id) {
    return fetch(this._url + `/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._errorProcessing);
  }

  likeCard(id) {
    return fetch(this._url + `/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._errorProcessing);
  }

  disLikeCard(id) {
    return fetch(this._url + `/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._errorProcessing);
  }
}