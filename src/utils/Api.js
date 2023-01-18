class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _processResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers
    })
      .then(this._processResponse)
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers
    })
      .then(this._processResponse)
  }

  editProfile(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
    })
      .then(this._processResponse)
  }

  addCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._processResponse)
  }

  deleteCard(data) {
    return fetch(`${this.baseUrl}/cards/${data}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(this._processResponse)
  }

  addLike(data) {
    return fetch(`${this.baseUrl}/cards/likes/${data}`, {
      method: "PUT",
      headers: this.headers
    })
      .then(this._processResponse)
  }

  removeLike(data) {
    return fetch(`${this.baseUrl}/cards/likes/${data}`, {
      method: "DELETE",
      headers: this.headers
    })
      .then(this._processResponse)
  }

  updateImage(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data
      }),
    })
    .then(this._processResponse)
  } 

  getAppInfo = () => {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}

export default Api;