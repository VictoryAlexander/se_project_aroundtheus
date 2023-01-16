class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      header: this.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  editProfile(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        description: data.description
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      header: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  deleteCard(data) {
    return fetch(`${this.baseUrl}/cards/${data}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  addLike(data) {
    return fetch(`${this.baseUrl}/cards/likes/${data}`, {
      method: "PUT",
      headers: this.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  removeLike(data) {
    return fetch(`${this.baseUrl}/cards/likes/${data}`, {
      method: "DELETE",
      headers: this.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

export default Api;