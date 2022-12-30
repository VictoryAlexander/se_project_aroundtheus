class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._job = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._job.textContent
    }
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._job.textContent = about
  }
}

export default UserInfo;