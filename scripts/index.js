let OpenPopupContainer = document.querySelector('#popup_show');
OpenPopupContainer.addEventListener("click", OpenPopup);
function OpenPopup() {
    let popup = document.querySelector('#popup');
    popup.classList.add('popup_opened');
    nameInput.value = ProfileTitle.textContent;
    jobInput.value = ProfileSubtitle.textContent;
};

let ClosePopupContainer = document.querySelector('#popup_close');
ClosePopupContainer.addEventListener("click", ClosePopup);
function ClosePopup() {
    let popup = document.querySelector('#popup');
    popup.classList.remove('popup_opened');
};

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__about-me');
let PopupSumbit = document.querySelector('.popup__sumbit');
let ProfileTitle = document.querySelector('.profile__title');
let ProfileSubtitle = document.querySelector('.profile__subtitle');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    ProfileTitle.textContent = nameInput.value;
    ProfileSubtitle.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
PopupSumbit.addEventListener('click', ClosePopup);