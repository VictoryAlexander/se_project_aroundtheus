class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._name = document.querySelector(`.${userNameSelector}`);
    this._job = document.querySelector(`.${userJobSelector}`);
  }

  getUserInfo() {
    this._userInfo = {
      userName: this._name.textContent,
      userJob: this.job.textContent
    }
    return this._userInfo;
  }

  setUserInfo() {
    const profileNameInput = document.querySelector(".modal__container-input_name");
    const profileDescriptionInput = document.querySelector(".modal__container-input_description");

    profileNameInput.value = this._userInfo.userName;
    profileDescriptionInput.value = this._userInfo.userJob;
  }
}

export default UserInfo;