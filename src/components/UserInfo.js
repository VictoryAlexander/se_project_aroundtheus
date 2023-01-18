class UserInfo {
  constructor({ userNameSelector, userJobSelector, userImageSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._job = document.querySelector(userJobSelector);
    this._image = document.querySelector(userImageSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._job.textContent
    }
  }

  getAvatar() {
    return {
      image: this._image.src
    }
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._job.textContent = about
  }

  setImage(image) {
    this._image.src = image;
    this._image.alt = this._name.textContent;
  }
}

export default UserInfo;