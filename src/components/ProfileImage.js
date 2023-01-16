class ProfileImage {
  constructor(imageSelector) {
    this._profileImage = document.querySelector(imageSelector);
  }

  getImage() {
    return this._profileImage.src;
  }

  setImage(image) {
    this._profileImage.src = image;
  }
}

export default ProfileImage;