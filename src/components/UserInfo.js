export default class UserInfo {
  constructor({ selectorProfilePopupName, selectorProfilePopupJob, selectorAvatarPopup }) {
    this._profilePopupName = document.querySelector(selectorProfilePopupName);
    this._profilePopupJob = document.querySelector(selectorProfilePopupJob);
    this._profilePopupAvatar = document.querySelector(selectorAvatarPopup);
  }

  getUserInfo() {
    return {
      userName: this._profilePopupName.textContent,
      job: this._profilePopupJob.textContent,
    };
  }

  setUserInfo({ userName, job, linkAvatar }) {
    this._profilePopupName.textContent = userName;
    this._profilePopupJob.textContent = job;
    this.setUserAvatar(linkAvatar);
  }

  setUserAvatar({linkAvatar}) {
    this._profilePopupAvatar.src = linkAvatar;
  }
}