export default class UserInfo {
  constructor({ selectorProfilePopupName, selectorProfilePopupJob }) {
    this._profilePopupName = document.querySelector(selectorProfilePopupName);
    this._profilePopupJob = document.querySelector(selectorProfilePopupJob);
  }

  getUserInfo() {
    return {
      name: this._profilePopupName.textContent,
      job: this._profilePopupJob.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._profilePopupName.textContent = name.value;
    this._profilePopupJob.textContent = job.value;
  }
}