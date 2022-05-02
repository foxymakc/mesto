export default class UserInfo {
  constructor({ selectorProfilePopupName, selectorProfilePopupJob }) {
    this._profilePopupName = document.querySelector(selectorProfilePopupName);
    this._profilePopupJob = document.querySelector(selectorProfilePopupJob);
  }

  getUserInfo() {
    return {
      userName: this._profilePopupName.textContent,
      job: this._profilePopupJob.textContent,
    };
  }

  setUserInfo({ userName, job }) {
    this._profilePopupName.textContent = userName;
    this._profilePopupJob.textContent = job;
  }
}